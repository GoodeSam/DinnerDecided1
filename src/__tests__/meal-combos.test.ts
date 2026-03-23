import { describe, it, expect, beforeEach } from "vitest";
import {
  type MealCombo,
  type MealSlot,
  generateMealCombos,
  MEAL_INGREDIENT_CATALOG,
} from "@/lib/meal-combos";
import { type Settings, defaultSettings } from "@/lib/settings";

describe("Meal ingredient catalog", () => {
  it("categorizes ingredients into proteins, vegetables, staples, seasonings", () => {
    expect(MEAL_INGREDIENT_CATALOG.proteins.length).toBeGreaterThan(0);
    expect(MEAL_INGREDIENT_CATALOG.vegetables.length).toBeGreaterThan(0);
    expect(MEAL_INGREDIENT_CATALOG.staples.length).toBeGreaterThan(0);
    expect(MEAL_INGREDIENT_CATALOG.seasonings.length).toBeGreaterThan(0);
  });

  it("includes all default ingredients in some category", () => {
    const allCatalog = [
      ...MEAL_INGREDIENT_CATALOG.proteins,
      ...MEAL_INGREDIENT_CATALOG.vegetables,
      ...MEAL_INGREDIENT_CATALOG.staples,
      ...MEAL_INGREDIENT_CATALOG.seasonings,
    ];
    for (const ing of defaultSettings.ingredients) {
      expect(allCatalog).toContain(ing);
    }
  });
});

describe("generateMealCombos", () => {
  let settings: Settings;

  beforeEach(() => {
    settings = { ...defaultSettings };
  });

  it("returns an array of MealCombo objects", () => {
    const combos = generateMealCombos(settings);
    expect(Array.isArray(combos)).toBe(true);
    expect(combos.length).toBeGreaterThan(0);
  });

  it("each combo has a name, slots, tags, and nutrition estimate", () => {
    const combos = generateMealCombos(settings);
    for (const combo of combos) {
      expect(combo.id).toBeDefined();
      expect(typeof combo.name.en).toBe("string");
      expect(typeof combo.name.zh).toBe("string");
      expect(combo.slots.length).toBeGreaterThanOrEqual(2); // at least 2 dishes per meal
      expect(combo.tags.length).toBeGreaterThan(0);
      expect(combo.nutrition).toBeDefined();
      expect(combo.nutrition.estimatedCalories).toBeGreaterThan(0);
    }
  });

  it("each slot describes a dish with protein, vegetable, method, and staple", () => {
    const combos = generateMealCombos(settings);
    for (const combo of combos) {
      for (const slot of combo.slots) {
        expect(slot.dishName.en.length).toBeGreaterThan(0);
        expect(slot.dishName.zh.length).toBeGreaterThan(0);
        expect(slot.ingredients.length).toBeGreaterThan(0);
        expect(slot.cookingMethod).toBeDefined();
      }
    }
  });

  it("only uses ingredients that are in settings", () => {
    const combos = generateMealCombos(settings);
    const allAvailable = new Set(settings.ingredients);
    for (const combo of combos) {
      for (const slot of combo.slots) {
        for (const ing of slot.ingredients) {
          expect(allAvailable.has(ing)).toBe(true);
        }
      }
    }
  });

  it("only uses cooking methods matching available equipment", () => {
    const combos = generateMealCombos(settings);
    for (const combo of combos) {
      for (const slot of combo.slots) {
        expect(slot.equipment).toBeDefined();
        expect(settings.equipment).toContain(slot.equipment);
      }
    }
  });

  it("tags combos as blood-sugar-friendly when health goals require it", () => {
    const combos = generateMealCombos(settings);
    // With default settings (blood sugar + lipid control), every combo should be tagged
    for (const combo of combos) {
      expect(combo.tags).toContain("health-conscious");
    }
  });

  it("respects family size for serving estimation", () => {
    const combos = generateMealCombos(settings);
    for (const combo of combos) {
      expect(combo.servings).toBe(settings.familyMembers.length);
    }
  });

  it("generates different combos when ingredients change", () => {
    const full = generateMealCombos(settings);
    const limited = generateMealCombos({
      ...settings,
      ingredients: ["eggs", "tomatoes", "rice", "salt", "soy-sauce", "green-onions"],
    });
    // Limited should have fewer combos
    expect(limited.length).toBeLessThanOrEqual(full.length);
    // And all combos should only use the limited ingredients
    for (const combo of limited) {
      for (const slot of combo.slots) {
        for (const ing of slot.ingredients) {
          expect(["eggs", "tomatoes", "rice", "salt", "soy-sauce", "green-onions"]).toContain(ing);
        }
      }
    }
  });

  it("does not duplicate the same protein across slots in one combo", () => {
    const combos = generateMealCombos(settings);
    for (const combo of combos) {
      const proteins = combo.slots
        .map((s) => s.ingredients.find((i) => MEAL_INGREDIENT_CATALOG.proteins.includes(i)))
        .filter(Boolean);
      const unique = new Set(proteins);
      expect(unique.size).toBe(proteins.length);
    }
  });

  it("includes a staple (rice or noodles) in the combo", () => {
    const combos = generateMealCombos(settings);
    for (const combo of combos) {
      const hasStaple = combo.slots.some((s) =>
        s.ingredients.some((i) => MEAL_INGREDIENT_CATALOG.staples.includes(i))
      );
      expect(hasStaple).toBe(true);
    }
  });

  it("handles no protein available gracefully", () => {
    const noProtein = generateMealCombos({
      ...settings,
      ingredients: ["rice", "tomatoes", "salt", "soy-sauce", "leafy-greens"],
    });
    expect(noProtein.length).toBeGreaterThan(0);
  });
});
