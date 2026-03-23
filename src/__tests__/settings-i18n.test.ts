import { describe, it, expect } from "vitest";
import { t, setLocale } from "@/lib/i18n";

describe("Settings i18n keys", () => {
  const requiredKeys = [
    "settings.title",
    "settings.equipment",
    "settings.family",
    "settings.familyAdd",
    "settings.familyRemove",
    "settings.age",
    "settings.gender",
    "settings.male",
    "settings.female",
    "settings.healthGoals",
    "settings.ingredients",
    "settings.foodPreferences",
    "settings.save",
    "settings.reset",
    "equipment.electric-griddle",
    "equipment.wok",
    "equipment.steamer",
    "equipment.oven",
    "equipment.rice-cooker",
    "equipment.air-fryer",
    "health.blood-sugar-control",
    "health.blood-lipid-control",
    "health.low-sodium",
    "health.high-protein",
    "health.weight-loss",
    "settingsIngredient.lean-pork",
    "settingsIngredient.eggs",
    "settingsIngredient.goose-eggs",
    "settingsIngredient.sea-bass",
    "settingsIngredient.yellow-catfish",
    "settingsIngredient.flounder",
    "settingsIngredient.silver-carp",
    "settingsIngredient.beef",
    "settingsIngredient.chicken-breast",
    "settingsIngredient.local-chicken",
    "settingsIngredient.shrimp",
    "settingsIngredient.potatoes",
    "settingsIngredient.tomatoes",
    "settingsIngredient.broccoli",
    "settingsIngredient.ginger",
    "settingsIngredient.scallions",
    "settingsIngredient.green-onions",
    "settingsIngredient.sichuan-pepper",
    "settingsIngredient.salt",
    "settingsIngredient.soy-sauce",
    "settingsIngredient.vinegar",
    "settingsIngredient.flour",
    "settingsIngredient.starch",
    "settingsIngredient.noodles",
    "settingsIngredient.rice",
    "settingsIngredient.leafy-greens",
    "settingsIngredient.tofu",
    "settingsIngredient.corn",
    "settingsIngredient.cabbage",
    "settingsIngredient.eggplant",
    "settingsIngredient.cucumber",
    "settingsIngredient.celery",
    "settingsIngredient.carrots",
    "settingsIngredient.mushrooms",
    "settingsIngredient.wood-ear",
    "settingsIngredient.bean-sprouts",
    "mealCombo.title",
    "mealCombo.generate",
    "mealCombo.refresh",
    "mealCombo.servingsFor",
    "mealCombo.dishCount",
    "mealCombo.method",
    "mealCombo.ingredients",
    "mealCombo.noResults",
    "mealCombo.healthConscious",
    "mealCombo.quick",
    "mealCombo.balanced",
  ];

  for (const key of requiredKeys) {
    it(`has "${key}" in English`, () => {
      setLocale("en");
      const val = t(key);
      expect(val).not.toBe(key);
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
