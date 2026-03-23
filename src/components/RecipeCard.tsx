"use client";

import { Recipe } from "@/data/recipes";

interface Props {
  recipe: Recipe;
  matchScore: number;
  onSelect: () => void;
  isBestChoice?: boolean;
}

export default function RecipeCard({ recipe, matchScore, onSelect, isBestChoice }: Props) {
  return (
    <button
      onClick={onSelect}
      className={`group relative w-full text-left rounded-2xl border p-5 transition hover:shadow-lg cursor-pointer ${
        isBestChoice
          ? "border-amber-400 bg-amber-50 shadow-md ring-2 ring-amber-200"
          : "border-stone-200 bg-white hover:border-amber-300"
      }`}
    >
      {isBestChoice && (
        <span className="absolute -top-3 left-4 rounded-full bg-amber-500 px-3 py-0.5 text-xs font-bold text-white shadow">
          Best Choice
        </span>
      )}

      <div className="flex items-start gap-4">
        <span className="text-4xl">{recipe.image}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-stone-900 group-hover:text-amber-700 transition">
            {recipe.name}
          </h3>
          <p className="mt-1 text-sm text-stone-500 line-clamp-2">
            {recipe.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2 py-0.5 text-xs text-stone-600">
              ⏱ {recipe.time} min
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2 py-0.5 text-xs text-stone-600">
              👤 {recipe.servings} servings
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2 py-0.5 text-xs text-stone-600">
              🔥 {recipe.calories} cal
            </span>
            <span
              className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs ${
                recipe.difficulty === "Easy"
                  ? "bg-green-100 text-green-700"
                  : recipe.difficulty === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {recipe.difficulty}
            </span>
            {recipe.bloodSugarFriendly && (
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
                Blood Sugar Friendly
              </span>
            )}
          </div>

          {matchScore > 0 && (
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 rounded-full bg-stone-200">
                  <div
                    className="h-1.5 rounded-full bg-amber-500 transition-all"
                    style={{ width: `${Math.min(matchScore, 100)}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-stone-500">
                  {Math.round(matchScore)}% match
                </span>
              </div>
            </div>
          )}

          <div className="mt-2 flex flex-wrap gap-1">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
