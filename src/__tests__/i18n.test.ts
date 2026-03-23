import { describe, it, expect } from "vitest";

// These imports will fail until we implement the i18n module
import {
  t,
  setLocale,
  getLocale,
  type Locale,
} from "@/lib/i18n";

describe("i18n core", () => {
  describe("getLocale / setLocale", () => {
    it("defaults to English", () => {
      expect(getLocale()).toBe("en");
    });

    it("can switch to Chinese", () => {
      setLocale("zh");
      expect(getLocale()).toBe("zh");
      setLocale("en"); // reset
    });

    it("can switch back to English", () => {
      setLocale("zh");
      setLocale("en");
      expect(getLocale()).toBe("en");
    });
  });

  describe("t() translation function", () => {
    it("returns English text when locale is en", () => {
      setLocale("en");
      expect(t("app.title")).toBe("DinnerDecided");
      expect(t("app.tagline")).toBe("What should I cook?");
    });

    it("returns Chinese text when locale is zh", () => {
      setLocale("zh");
      expect(t("app.title")).toBe("今晚吃什么");
      expect(t("app.tagline")).toBe("今天做什么菜？");
      setLocale("en");
    });

    it("returns the key itself for unknown keys", () => {
      setLocale("en");
      expect(t("nonexistent.key")).toBe("nonexistent.key");
    });

    it("supports interpolation", () => {
      setLocale("en");
      expect(t("recipes.found", { count: 5 })).toBe("5 recipes found");
      setLocale("zh");
      expect(t("recipes.found", { count: 5 })).toBe("找到 5 个食谱");
      setLocale("en");
    });
  });

  describe("UI text keys exist in both languages", () => {
    const requiredKeys = [
      "app.title",
      "app.tagline",
      "app.subtitle",
      "app.footer",
      "ingredients.title",
      "ingredients.search",
      "ingredients.selected",
      "filters.show",
      "filters.hide",
      "filters.maxTime",
      "filters.servings",
      "filters.difficulty",
      "filters.dietaryGoal",
      "filters.bloodSugar",
      "filters.any",
      "recipes.found",
      "recipes.noResults",
      "recipes.noResultsHint",
      "recipes.topRecommendation",
      "recipes.bestChoice",
      "recipes.match",
      "recipe.backToRecipes",
      "recipe.nutritionTitle",
      "recipe.protein",
      "recipe.carbs",
      "recipe.fat",
      "recipe.fiber",
      "recipe.bloodSugarNote",
      "recipe.ingredientsTitle",
      "recipe.optional",
      "recipe.instructionsTitle",
      "recipe.startCooking",
      "cooking.exit",
      "cooking.servings",
      "cooking.stepOf",
      "cooking.done",
      "cooking.pause",
      "cooking.resume",
      "cooking.reset",
      "cooking.startTimer",
      "cooking.previous",
      "cooking.nextStep",
      "cooking.doneCooking",
      "cooking.viewIngredients",
      "cooking.viewIngredientsAdjusted",
      "cooking.viewAllSteps",
      "difficulty.Easy",
      "difficulty.Medium",
      "difficulty.Hard",
      "time.min",
      "servings.label",
      "calories.label",
      "dietary.highProtein",
      "dietary.vegetarian",
      "dietary.vegan",
      "dietary.lowCarb",
      "dietary.quick",
    ];

    for (const key of requiredKeys) {
      it(`has "${key}" in English`, () => {
        setLocale("en");
        const val = t(key);
        expect(val).not.toBe(key); // should not fall back to key
        expect(val.length).toBeGreaterThan(0);
      });

      it(`has "${key}" in Chinese`, () => {
        setLocale("zh");
        const val = t(key);
        expect(val).not.toBe(key);
        expect(val.length).toBeGreaterThan(0);
        setLocale("en");
      });
    }
  });
});

describe("recipe translations", () => {
  it("translates recipe names to Chinese", () => {
    setLocale("zh");
    expect(t("recipe.name.garlic-butter-chicken")).toBe("蒜香黄油鸡");
    setLocale("en");
  });

  it("translates recipe descriptions to Chinese", () => {
    setLocale("zh");
    const desc = t("recipe.desc.garlic-butter-chicken");
    expect(desc).not.toBe("recipe.desc.garlic-butter-chicken");
    expect(desc.length).toBeGreaterThan(0);
    setLocale("en");
  });

  it("translates ingredient names to Chinese", () => {
    setLocale("zh");
    expect(t("ingredient.Chicken Breast")).toBe("鸡胸肉");
    expect(t("ingredient.Garlic")).toBe("大蒜");
    expect(t("ingredient.Rice")).toBe("米饭");
    setLocale("en");
  });

  it("translates recipe tags to Chinese", () => {
    setLocale("zh");
    expect(t("tag.High Protein")).toBe("高蛋白");
    expect(t("tag.Vegetarian")).toBe("素食");
    expect(t("tag.Quick")).toBe("快手菜");
    setLocale("en");
  });

  it("returns English recipe names when locale is en", () => {
    setLocale("en");
    expect(t("recipe.name.garlic-butter-chicken")).toBe("Garlic Butter Chicken");
  });

  it("translates cooking step instructions", () => {
    setLocale("zh");
    const step = t("step.garlic-butter-chicken.0");
    expect(step).not.toBe("step.garlic-butter-chicken.0");
    expect(step.length).toBeGreaterThan(0);
    setLocale("en");
  });
});
