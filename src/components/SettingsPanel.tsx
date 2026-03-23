"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n-react";
import {
  type Settings,
  type FamilyMember,
  type HealthGoal,
  defaultSettings,
  addFamilyMember,
  removeFamilyMember,
  updateFamilyMember,
  toggleEquipment,
  toggleIngredient,
  toggleHealthGoal,
  ALL_SETTINGS_INGREDIENTS,
  ALL_EQUIPMENT,
  ALL_HEALTH_GOALS,
} from "@/lib/settings";

interface Props {
  settings: Settings;
  onChange: (settings: Settings) => void;
  onClose: () => void;
}

export default function SettingsPanel({ settings, onChange, onClose }: Props) {
  const { t } = useI18n();
  const [search, setSearch] = useState("");

  const filteredIngredients = ALL_SETTINGS_INGREDIENTS.filter((i) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return i.toLowerCase().includes(q) || t(`settingsIngredient.${i}`).toLowerCase().includes(q);
  });

  const handleAddMember = () => {
    const member: FamilyMember = {
      id: `fm-${Date.now()}`,
      age: 30,
      gender: "male",
      label: "",
    };
    onChange(addFamilyMember(settings, member));
  };

  // Group ingredients by category
  const proteins = ALL_SETTINGS_INGREDIENTS.filter((i) =>
    ["lean-pork", "eggs", "goose-eggs", "sea-bass", "yellow-catfish", "flounder",
     "silver-carp", "beef", "chicken-breast", "local-chicken", "shrimp", "tofu"].includes(i)
  );
  const vegetables = ALL_SETTINGS_INGREDIENTS.filter((i) =>
    ["potatoes", "tomatoes", "broccoli", "leafy-greens", "cabbage", "eggplant",
     "cucumber", "celery", "carrots", "mushrooms", "wood-ear", "bean-sprouts", "corn"].includes(i)
  );
  const seasonings = ALL_SETTINGS_INGREDIENTS.filter((i) =>
    ["ginger", "scallions", "green-onions", "sichuan-pepper", "salt", "soy-sauce", "vinegar"].includes(i)
  );
  const staples = ALL_SETTINGS_INGREDIENTS.filter((i) =>
    ["flour", "starch", "noodles", "rice"].includes(i)
  );

  const renderIngredientGroup = (label: string, items: string[]) => {
    const visible = items.filter((i) => filteredIngredients.includes(i));
    if (visible.length === 0) return null;
    return (
      <div key={label} className="mb-3">
        <p className="text-xs font-semibold text-stone-400 uppercase mb-1.5">{label}</p>
        <div className="flex flex-wrap gap-1.5">
          {visible.map((ing) => {
            const selected = settings.ingredients.includes(ing);
            return (
              <button
                key={ing}
                onClick={() => onChange(toggleIngredient(settings, ing))}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition cursor-pointer ${
                  selected
                    ? "bg-amber-500 text-white"
                    : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                }`}
              >
                {selected ? "✓ " : ""}{t(`settingsIngredient.${ing}`)}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Panel */}
      <div className="relative ml-auto w-full max-w-lg bg-white shadow-2xl overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900">{t("settings.title")}</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 text-xl cursor-pointer">&times;</button>
        </div>

        <div className="p-6 space-y-8">
          {/* Equipment */}
          <section>
            <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">
              {t("settings.equipment")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {ALL_EQUIPMENT.map((eq) => {
                const active = settings.equipment.includes(eq);
                return (
                  <button
                    key={eq}
                    onClick={() => onChange(toggleEquipment(settings, eq))}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition cursor-pointer border ${
                      active
                        ? "bg-amber-50 border-amber-400 text-amber-700"
                        : "bg-white border-stone-200 text-stone-500 hover:border-stone-300"
                    }`}
                  >
                    {active ? "✓ " : ""}{t(`equipment.${eq}`)}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Family Members */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wide">
                {t("settings.family")}
              </h3>
              <button
                onClick={handleAddMember}
                className="text-xs font-semibold text-amber-600 hover:text-amber-700 cursor-pointer"
              >
                + {t("settings.familyAdd")}
              </button>
            </div>
            <div className="space-y-2">
              {settings.familyMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-3 rounded-lg border border-stone-200 p-3">
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-stone-400">{t("settings.age")}</label>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        value={member.age}
                        onChange={(e) =>
                          onChange(updateFamilyMember(settings, member.id, { age: parseFloat(e.target.value) || 0 }))
                        }
                        className="w-full rounded border border-stone-200 px-2 py-1 text-sm outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-stone-400">{t("settings.gender")}</label>
                      <select
                        value={member.gender}
                        onChange={(e) =>
                          onChange(updateFamilyMember(settings, member.id, { gender: e.target.value as "male" | "female" }))
                        }
                        className="w-full rounded border border-stone-200 px-2 py-1 text-sm outline-none focus:border-amber-400"
                      >
                        <option value="male">{t("settings.male")}</option>
                        <option value="female">{t("settings.female")}</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => onChange(removeFamilyMember(settings, member.id))}
                    className="text-xs text-red-400 hover:text-red-600 cursor-pointer"
                  >
                    {t("settings.familyRemove")}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Health Goals */}
          <section>
            <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">
              {t("settings.healthGoals")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {ALL_HEALTH_GOALS.map((goal) => {
                const active = settings.healthGoals.includes(goal);
                return (
                  <button
                    key={goal}
                    onClick={() => onChange(toggleHealthGoal(settings, goal))}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition cursor-pointer border ${
                      active
                        ? "bg-blue-50 border-blue-400 text-blue-700"
                        : "bg-white border-stone-200 text-stone-500 hover:border-stone-300"
                    }`}
                  >
                    {active ? "✓ " : ""}{t(`health.${goal}`)}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Ingredients */}
          <section>
            <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-3">
              {t("settings.ingredients")}
            </h3>
            <input
              type="text"
              placeholder={t("ingredients.search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm mb-3 outline-none focus:border-amber-400"
            />
            {renderIngredientGroup(t("recipe.protein"), proteins)}
            {renderIngredientGroup(t("dietary.vegetarian"), vegetables)}
            {renderIngredientGroup("Seasonings / 调料", seasonings)}
            {renderIngredientGroup("Staples / 主食", staples)}
          </section>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-stone-200">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl bg-amber-500 py-3 text-sm font-bold text-white hover:bg-amber-600 transition cursor-pointer"
            >
              {t("settings.save")}
            </button>
            <button
              onClick={() => onChange({ ...defaultSettings })}
              className="rounded-xl border border-stone-300 px-4 py-3 text-sm text-stone-500 hover:bg-stone-50 transition cursor-pointer"
            >
              {t("settings.reset")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
