"use client";

import { Recipe } from "@/data/recipes";

interface Props {
  recipe: Recipe;
  onBack: () => void;
  onStartCooking: () => void;
}

export default function RecipeDetail({ recipe, onBack, onStartCooking }: Props) {
  return (
    <div className="mx-auto max-w-2xl">
      <button
        onClick={onBack}
        className="mb-4 text-sm text-stone-500 hover:text-stone-700 transition cursor-pointer"
      >
        &larr; Back to recipes
      </button>

      {/* Hero */}
      <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-8 text-center">
          <span className="text-7xl">{recipe.image}</span>
          <h1 className="mt-4 text-3xl font-bold text-stone-900">{recipe.name}</h1>
          <p className="mt-2 text-stone-600 max-w-md mx-auto">{recipe.description}</p>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <span className="rounded-full bg-white/80 px-3 py-1 text-sm text-stone-700 shadow-sm">
              ⏱ {recipe.time} min
            </span>
            <span className="rounded-full bg-white/80 px-3 py-1 text-sm text-stone-700 shadow-sm">
              👤 {recipe.servings} servings
            </span>
            <span className="rounded-full bg-white/80 px-3 py-1 text-sm text-stone-700 shadow-sm">
              🔥 {recipe.calories} cal
            </span>
            <span
              className={`rounded-full px-3 py-1 text-sm shadow-sm ${
                recipe.difficulty === "Easy"
                  ? "bg-green-100 text-green-700"
                  : recipe.difficulty === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {recipe.difficulty}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Nutrition */}
          <div>
            <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">
              Nutrition per serving
            </h2>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Protein", value: recipe.nutrition.protein, color: "bg-blue-100 text-blue-700" },
                { label: "Carbs", value: recipe.nutrition.carbs, color: "bg-amber-100 text-amber-700" },
                { label: "Fat", value: recipe.nutrition.fat, color: "bg-rose-100 text-rose-700" },
                { label: "Fiber", value: recipe.nutrition.fiber, color: "bg-green-100 text-green-700" },
              ].map((n) => (
                <div key={n.label} className={`rounded-xl p-3 text-center ${n.color}`}>
                  <div className="text-lg font-bold">{n.value}g</div>
                  <div className="text-xs">{n.label}</div>
                </div>
              ))}
            </div>
            {recipe.bloodSugarFriendly && (
              <div className="mt-3 rounded-lg bg-blue-50 border border-blue-200 px-4 py-2 text-sm text-blue-700">
                This recipe is blood sugar friendly — low glycemic impact.
              </div>
            )}
          </div>

          {/* Ingredients */}
          <div>
            <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">
              Ingredients
            </h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing) => (
                <li key={ing.name} className="flex items-start gap-3">
                  <span className="mt-0.5 h-5 w-5 rounded border border-stone-300 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-stone-900">{ing.name}</span>
                    <span className="text-stone-500"> — {ing.amount}</span>
                    {ing.optional && (
                      <span className="ml-2 text-xs text-stone-400 italic">(optional)</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps preview */}
          <div>
            <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">
              Instructions ({recipe.steps.length} steps)
            </h2>
            <ol className="space-y-3">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
                    {i + 1}
                  </span>
                  <div className="text-sm text-stone-700">
                    {step.instruction}
                    {step.timer && (
                      <span className="ml-2 inline-flex items-center gap-1 rounded bg-stone-100 px-1.5 py-0.5 text-xs text-stone-500">
                        ⏱ {Math.floor(step.timer / 60)}:{(step.timer % 60).toString().padStart(2, "0")}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Start Cooking CTA */}
          <button
            onClick={onStartCooking}
            className="w-full rounded-xl bg-amber-500 py-4 text-lg font-bold text-white shadow-lg hover:bg-amber-600 transition cursor-pointer"
          >
            Start Cooking Mode
          </button>
        </div>
      </div>
    </div>
  );
}
