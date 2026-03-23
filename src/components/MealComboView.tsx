"use client";

import { useState, useMemo } from "react";
import { useI18n } from "@/lib/i18n-react";
import { type Settings } from "@/lib/settings";
import { generateMealCombos, type MealCombo } from "@/lib/meal-combos";

interface Props {
  settings: Settings;
}

const PAGE_SIZE = 6;

export default function MealComboView({ settings }: Props) {
  const { t, locale } = useI18n();
  const [page, setPage] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const allCombos = useMemo(() => generateMealCombos(settings), [settings]);

  // Shuffle deterministically from page
  const shuffled = useMemo(() => {
    const arr = [...allCombos];
    // Simple shuffle seed from page number
    for (let i = arr.length - 1; i > 0; i--) {
      const j = (i * (page + 1) * 7) % (i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, PAGE_SIZE);
  }, [allCombos, page]);

  const tagLabel = (tag: string) => {
    const map: Record<string, string> = {
      "health-conscious": t("mealCombo.healthConscious"),
      quick: t("mealCombo.quick"),
      balanced: t("mealCombo.balanced"),
    };
    return map[tag] || tag;
  };

  const tagColor = (tag: string) => {
    switch (tag) {
      case "health-conscious": return "bg-green-100 text-green-700";
      case "quick": return "bg-amber-100 text-amber-700";
      case "balanced": return "bg-blue-100 text-blue-700";
      default: return "bg-stone-100 text-stone-600";
    }
  };

  if (allCombos.length === 0) {
    return (
      <div className="text-center py-12 text-stone-400">
        <p className="text-5xl mb-4">🍳</p>
        <p className="text-lg font-medium">{t("mealCombo.noResults")}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">{t("mealCombo.title")}</h2>
          <p className="text-sm text-stone-500 mt-1">
            {t("mealCombo.servingsFor", { count: settings.familyMembers.length })}
            {" · "}
            {allCombos.length} {locale === "zh" ? "种组合" : "combinations"}
          </p>
        </div>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 transition cursor-pointer"
        >
          {t("mealCombo.refresh")}
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {shuffled.map((combo) => (
          <MealComboCard
            key={combo.id + page}
            combo={combo}
            locale={locale}
            expanded={expandedId === combo.id}
            onToggle={() => setExpandedId(expandedId === combo.id ? null : combo.id)}
            tagLabel={tagLabel}
            tagColor={tagColor}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}

function MealComboCard({
  combo,
  locale,
  expanded,
  onToggle,
  tagLabel,
  tagColor,
  t,
}: {
  combo: MealCombo;
  locale: string;
  expanded: boolean;
  onToggle: () => void;
  tagLabel: (tag: string) => string;
  tagColor: (tag: string) => string;
  t: (key: string, params?: Record<string, string | number>) => string;
}) {
  const name = locale === "zh" ? combo.name.zh : combo.name.en;

  return (
    <div
      className={`rounded-2xl border p-5 transition cursor-pointer ${
        expanded
          ? "border-amber-400 bg-amber-50 shadow-md"
          : "border-stone-200 bg-white hover:border-amber-300 hover:shadow-sm"
      }`}
      onClick={onToggle}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-bold text-stone-900 leading-snug">{name}</h3>
        <span className="flex-shrink-0 text-xs text-stone-400">
          {t("mealCombo.dishCount", { count: combo.slots.length })}
        </span>
      </div>

      {/* Tags */}
      <div className="mt-2 flex flex-wrap gap-1.5">
        {combo.tags.map((tag) => (
          <span key={tag} className={`rounded-full px-2 py-0.5 text-xs font-medium ${tagColor(tag)}`}>
            {tagLabel(tag)}
          </span>
        ))}
      </div>

      {/* Nutrition summary */}
      <div className="mt-3 grid grid-cols-4 gap-2 text-center">
        <div className="rounded-lg bg-stone-50 p-1.5">
          <div className="text-sm font-bold text-stone-800">{combo.nutrition.estimatedCalories}</div>
          <div className="text-[10px] text-stone-400">{locale === "zh" ? "卡路里" : "cal"}</div>
        </div>
        <div className="rounded-lg bg-stone-50 p-1.5">
          <div className="text-sm font-bold text-blue-600">{combo.nutrition.protein}g</div>
          <div className="text-[10px] text-stone-400">{t("recipe.protein")}</div>
        </div>
        <div className="rounded-lg bg-stone-50 p-1.5">
          <div className="text-sm font-bold text-amber-600">{combo.nutrition.carbs}g</div>
          <div className="text-[10px] text-stone-400">{t("recipe.carbs")}</div>
        </div>
        <div className="rounded-lg bg-stone-50 p-1.5">
          <div className="text-sm font-bold text-rose-600">{combo.nutrition.fat}g</div>
          <div className="text-[10px] text-stone-400">{t("recipe.fat")}</div>
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="mt-4 space-y-3 border-t border-amber-200 pt-4">
          {combo.slots.map((slot, i) => {
            const dishName = locale === "zh" ? slot.dishName.zh : slot.dishName.en;
            const method = locale === "zh" ? slot.cookingMethod.zh : slot.cookingMethod.en;
            return (
              <div key={i} className="rounded-lg bg-white border border-stone-100 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-stone-800">{dishName}</span>
                  <span className="text-xs rounded bg-stone-100 px-2 py-0.5 text-stone-500">
                    {method}
                  </span>
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {slot.ingredients.map((ing) => (
                    <span key={ing} className="text-xs text-stone-500 bg-stone-50 rounded px-1.5 py-0.5">
                      {t(`settingsIngredient.${ing}`)}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
