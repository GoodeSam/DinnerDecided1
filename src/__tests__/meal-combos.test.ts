import { describe, it, expect, beforeEach } from "vitest";
import {
  type MealCombo,
  type MealSlot,
  generateMealCombos,
  MEAL_INGREDIENT_CATALOG,
  DISH_TEMPLATES,
  COOKING_METHODS,
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

describe("Dish template database", () => {
  it("has at least 150 dish templates", () => {
    expect(DISH_TEMPLATES.length).toBeGreaterThanOrEqual(150);
  });

  it("every template has valid bilingual names", () => {
    for (const tpl of DISH_TEMPLATES) {
      expect(tpl.nameEn.length).toBeGreaterThan(0);
      expect(tpl.nameZh.length).toBeGreaterThan(0);
    }
  });

  it("every template references a valid cooking method", () => {
    const methodIds = new Set(COOKING_METHODS.map((m) => m.id));
    for (const tpl of DISH_TEMPLATES) {
      expect(methodIds.has(tpl.method)).toBe(true);
    }
  });

  it("every template has realistic nutrition values", () => {
    for (const tpl of DISH_TEMPLATES) {
      expect(tpl.calories).toBeGreaterThan(0);
      expect(tpl.calories).toBeLessThanOrEqual(800);
      expect(tpl.proteinG).toBeGreaterThanOrEqual(0);
      expect(tpl.carbsG).toBeGreaterThanOrEqual(0);
      expect(tpl.fatG).toBeGreaterThanOrEqual(0);
    }
  });

  it("every template ingredient exists in the catalog", () => {
    const allCatalog = new Set([
      ...MEAL_INGREDIENT_CATALOG.proteins,
      ...MEAL_INGREDIENT_CATALOG.vegetables,
      ...MEAL_INGREDIENT_CATALOG.staples,
      ...MEAL_INGREDIENT_CATALOG.seasonings,
    ]);
    for (const tpl of DISH_TEMPLATES) {
      if (tpl.protein) expect(allCatalog.has(tpl.protein)).toBe(true);
      for (const v of tpl.vegetables) expect(allCatalog.has(v)).toBe(true);
      for (const s of tpl.seasonings) expect(allCatalog.has(s)).toBe(true);
      if (tpl.staple) expect(allCatalog.has(tpl.staple)).toBe(true);
    }
  });

  it("has no duplicate dish names (English)", () => {
    const names = DISH_TEMPLATES.map((t) => t.nameEn);
    expect(new Set(names).size).toBe(names.length);
  });

  it("covers at least 8 distinct cuisine categories", () => {
    const categories = new Set(DISH_TEMPLATES.map((t) => t.cuisine));
    expect(categories.size).toBeGreaterThanOrEqual(8);
  });

  it("covers all cooking methods", () => {
    const usedMethods = new Set(DISH_TEMPLATES.map((t) => t.method));
    for (const m of COOKING_METHODS) {
      expect(usedMethods.has(m.id)).toBe(true);
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

  it("generates at least 1000 meal combos with full ingredient set", () => {
    const allIngredients = [
      ...MEAL_INGREDIENT_CATALOG.proteins,
      ...MEAL_INGREDIENT_CATALOG.vegetables,
      ...MEAL_INGREDIENT_CATALOG.staples,
      ...MEAL_INGREDIENT_CATALOG.seasonings,
    ];
    const fullSettings: Settings = {
      ...settings,
      ingredients: allIngredients,
      equipment: ["wok", "steamer", "electric-griddle", "oven", "rice-cooker", "air-fryer"],
      healthGoals: [],
    };
    const combos = generateMealCombos(fullSettings);
    expect(combos.length).toBeGreaterThanOrEqual(1000);
  });

  it("each combo has a name, slots, tags, and nutrition estimate", () => {
    const combos = generateMealCombos(settings);
    for (const combo of combos) {
      expect(combo.id).toBeDefined();
      expect(typeof combo.name.en).toBe("string");
      expect(typeof combo.name.zh).toBe("string");
      expect(combo.slots.length).toBeGreaterThanOrEqual(2);
      expect(combo.tags.length).toBeGreaterThan(0);
      expect(combo.nutrition).toBeDefined();
      expect(combo.nutrition.estimatedCalories).toBeGreaterThan(0);
    }
  });

  it("each slot describes a dish with ingredients and method", () => {
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

  it("tags combos as health-conscious when health goals require it", () => {
    const combos = generateMealCombos(settings);
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
    expect(limited.length).toBeLessThanOrEqual(full.length);
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

  it("generates combos across multiple cuisines", () => {
    const allIngredients = [
      ...MEAL_INGREDIENT_CATALOG.proteins,
      ...MEAL_INGREDIENT_CATALOG.vegetables,
      ...MEAL_INGREDIENT_CATALOG.staples,
      ...MEAL_INGREDIENT_CATALOG.seasonings,
    ];
    const fullSettings: Settings = {
      ...settings,
      ingredients: allIngredients,
      equipment: ["wok", "steamer", "electric-griddle", "oven", "rice-cooker", "air-fryer"],
      healthGoals: [],
    };
    const combos = generateMealCombos(fullSettings);
    // Collect all unique dish names
    const dishNames = new Set(combos.flatMap((c) => c.slots.map((s) => s.dishName.en)));
    expect(dishNames.size).toBeGreaterThanOrEqual(50);
  });
});
