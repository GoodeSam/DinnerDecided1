"use client";

import { useState, useMemo } from "react";
import { recipes, Recipe } from "@/data/recipes";
import IngredientSelector from "@/components/IngredientSelector";
import Filters, { FilterState } from "@/components/Filters";
import RecipeCard from "@/components/RecipeCard";
import RecipeDetail from "@/components/RecipeDetail";
import CookingMode from "@/components/CookingMode";

type View = "home" | "detail" | "cooking";

export default function Home() {
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

  const scoredRecipes = useMemo(() => {
    return recipes
      .map((recipe) => {
        // Calculate ingredient match score
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
        // If ingredients are selected, require at least 1 match
        if (selectedIngredients.length > 0 && matchScore === 0) return false;

        if (filters.maxTime > 0 && recipe.time > filters.maxTime) return false;
        if (filters.servings > 0 && recipe.servings < filters.servings) return false;
        if (filters.difficulty && recipe.difficulty !== filters.difficulty) return false;
        if (filters.dietaryGoal && !recipe.tags.includes(filters.dietaryGoal))
          return false;
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
              <span className="text-amber-500">Dinner</span>Decided
            </h1>
          </button>
          {view === "home" && (
            <span className="text-sm text-stone-500">
              {scoredRecipes.length} recipe{scoredRecipes.length !== 1 ? "s" : ""} found
            </span>
          )}
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
              What should I cook<span className="text-amber-500">?</span>
            </h2>
            <p className="mt-2 text-stone-500">
              Select your ingredients and preferences. We&apos;ll find the perfect meal.
            </p>
          </div>

          {/* Input Section */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">
              What ingredients do you have?
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
                {showFilters ? "Hide" : "Show"} Filters & Preferences
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
                <p className="text-lg font-medium">No recipes match your criteria</p>
                <p className="mt-1 text-sm">Try adjusting your ingredients or filters</p>
              </div>
            ) : (
              <>
                {selectedIngredients.length > 0 && scoredRecipes.length > 0 && (
                  <div className="mb-4 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
                    <strong>Top recommendation:</strong> Based on your ingredients, we suggest{" "}
                    <strong>{scoredRecipes[0].recipe.name}</strong> with a{" "}
                    {Math.round(scoredRecipes[0].matchScore)}% ingredient match.
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
        DinnerDecided &mdash; Your meal decision engine
      </footer>
    </div>
  );
}
