"use client";

import { ALL_INGREDIENTS } from "@/data/recipes";
import { useState } from "react";

interface Props {
  selected: string[];
  onChange: (ingredients: string[]) => void;
}

export default function IngredientSelector({ selected, onChange }: Props) {
  const [search, setSearch] = useState("");

  const filtered = ALL_INGREDIENTS.filter((i) =>
    i.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (ingredient: string) => {
    onChange(
      selected.includes(ingredient)
        ? selected.filter((s) => s !== ingredient)
        : [...selected, ingredient]
    );
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search ingredients..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition"
      />
      <div className="mt-3 flex flex-wrap gap-2 max-h-48 overflow-y-auto">
        {filtered.map((ingredient) => {
          const isSelected = selected.includes(ingredient);
          return (
            <button
              key={ingredient}
              onClick={() => toggle(ingredient)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition cursor-pointer ${
                isSelected
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {isSelected ? "✓ " : ""}
              {ingredient}
            </button>
          );
        })}
      </div>
      {selected.length > 0 && (
        <p className="mt-2 text-xs text-stone-500">
          {selected.length} ingredient{selected.length !== 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}
