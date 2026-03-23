"use client";

import { useState, useMemo } from "react";
import { recipes, Recipe } from "@/data/recipes";
import { I18nProvider, useI18n, LanguageSwitcher } from "@/lib/i18n-react";
import IngredientSelector from "@/components/IngredientSelector";
import Filters, { FilterState } from "@/components/Filters";
import RecipeCard from "@/components/RecipeCard";
import RecipeDetail from "@/components/RecipeDetail";
import CookingMode from "@/components/CookingMode";

type View = "home" | "detail" | "cooking";

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    maxTime: 0,
    servings: 0,
    difficulty: "",
    dietaryGoal: "",
    bloodSugarFriendly: false,
  });
  const [view, setView] = useState<View>("home");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const { t } = useI18n();

  const scoredRecipes = useMemo(() => {
    return recipes
      .map((recipe) => {
        const requiredIngredients = recipe.ingredients
          .filter((i) => !i.optional)
          .map((i) => i.name);
        const matchedCount = requiredIngredients.filter((i) =>
          selectedIngredients.includes(i)
        ).length;
        const matchScore =
          selectedIngredients.length > 0
            ? (matchedCount / requiredIngredients.length) * 100
            : 0;

        return { recipe, matchScore };
      })
      .filter(({ recipe, matchScore }) => {
        if (selectedIngredients.length > 0 && matchScore === 0) return false;
        if (filters.maxTime > 0 && recipe.time > filters.maxTime) return false;
        if (filters.servings > 0 && recipe.servings < filters.servings) return false;
        if (filters.difficulty && recipe.difficulty !== filters.difficulty) return false;
        if (filters.dietaryGoal && !recipe.tags.includes(filters.dietaryGoal)) return false;
        if (filters.bloodSugarFriendly && !recipe.bloodSugarFriendly) return false;
        return true;
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [selectedIngredients, filters]);

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setView("detail");
    window.scrollTo(0, 0);
  };

  if (view === "cooking" && selectedRecipe) {
    return (
      <CookingMode
        recipe={selectedRecipe}
        onExit={() => setView("detail")}
      />
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-stone-200">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => {
              setView("home");
              setSelectedRecipe(null);
            }}
            className="cursor-pointer"
          >
            <h1 className="text-xl font-bold text-stone-900">
              <span className="text-amber-500">{t("app.brandAccent")}</span>
              {t("app.brandRest")}
            </h1>
          </button>
          <div className="flex items-center gap-4">
            {view === "home" && (
              <span className="text-sm text-stone-500">
                {t("recipes.found", { count: scoredRecipes.length })}
              </span>
            )}
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {view === "detail" && selectedRecipe ? (
        <main className="mx-auto max-w-4xl px-4 py-8">
          <RecipeDetail
            recipe={selectedRecipe}
            onBack={() => {
              setView("home");
              setSelectedRecipe(null);
            }}
            onStartCooking={() => setView("cooking")}
          />
        </main>
      ) : (
        <main className="mx-auto max-w-4xl px-4 py-8">
          {/* Hero CTA */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-stone-900">
              {t("app.tagline")}
            </h2>
            <p className="mt-2 text-stone-500">
              {t("app.subtitle")}
            </p>
          </div>

          {/* Input Section */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">
              {t("ingredients.title")}
            </h3>
            <IngredientSelector
              selected={selectedIngredients}
              onChange={setSelectedIngredients}
            />

            <div className="mt-4 pt-4 border-t border-stone-100">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-sm font-semibold text-amber-600 hover:text-amber-700 transition cursor-pointer"
              >
                {showFilters ? t("filters.hide") : t("filters.show")}
              </button>
              {showFilters && (
                <div className="mt-3">
                  <Filters filters={filters} onChange={setFilters} />
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="mt-8">
            {scoredRecipes.length === 0 ? (
              <div className="text-center py-12 text-stone-400">
                <p className="text-5xl mb-4">🍽</p>
                <p className="text-lg font-medium">{t("recipes.noResults")}</p>
                <p className="mt-1 text-sm">{t("recipes.noResultsHint")}</p>
              </div>
            ) : (
              <>
                {selectedIngredients.length > 0 && scoredRecipes.length > 0 && (
                  <div className="mb-4 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
                    <strong>{t("recipes.topRecommendation")}</strong>{" "}
                    {t("recipes.topRecommendationText", {
                      name: t(`recipe.name.${scoredRecipes[0].recipe.id}`),
                      score: Math.round(scoredRecipes[0].matchScore),
                    })}
                  </div>
                )}
                <div className="space-y-4">
                  {scoredRecipes.map(({ recipe, matchScore }, i) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      matchScore={matchScore}
                      isBestChoice={i === 0 && selectedIngredients.length > 0}
                      onSelect={() => handleSelectRecipe(recipe)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="mt-16 border-t border-stone-200 py-8 text-center text-sm text-stone-400">
        {t("app.footer")}
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <I18nProvider>
      <App />
    </I18nProvider>
  );
}
