import { describe, it, expect } from "vitest";
import { t, setLocale } from "@/lib/i18n";
import { MEAL_INGREDIENT_CATALOG } from "@/lib/meal-combos";

describe("Global ingredient i18n coverage", () => {
  const allIngredients = [
    ...MEAL_INGREDIENT_CATALOG.proteins,
    ...MEAL_INGREDIENT_CATALOG.vegetables,
    ...MEAL_INGREDIENT_CATALOG.staples,
    ...MEAL_INGREDIENT_CATALOG.seasonings,
  ];

  for (const ing of allIngredients) {
    it(`has settingsIngredient.${ing} in English`, () => {
      setLocale("en");
      const val = t(`settingsIngredient.${ing}`);
      expect(val).not.toBe(`settingsIngredient.${ing}`);
    });

    it(`has settingsIngredient.${ing} in Chinese`, () => {
      setLocale("zh");
      const val = t(`settingsIngredient.${ing}`);
      expect(val).not.toBe(`settingsIngredient.${ing}`);
      setLocale("en");
    });
  }
});
