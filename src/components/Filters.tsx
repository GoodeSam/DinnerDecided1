"use client";

import { useI18n } from "@/lib/i18n-react";

export interface FilterState {
  maxTime: number;
  servings: number;
  difficulty: string;
  dietaryGoal: string;
  bloodSugarFriendly: boolean;
}

interface Props {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export default function Filters({ filters, onChange }: Props) {
  const { t } = useI18n();

  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    onChange({ ...filters, [key]: value });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <div>
        <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
          {t("filters.maxTime")}
        </label>
        <select
          value={filters.maxTime}
          onChange={(e) => set("maxTime", Number(e.target.value))}
          className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500"
        >
          <option value={0}>{t("filters.any")}</option>
          <option value={15}>{t("time.15")}</option>
          <option value={20}>{t("time.20")}</option>
          <option value={30}>{t("time.30")}</option>
          <option value={45}>{t("time.45")}</option>
          <option value={60}>{t("time.60")}</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
          {t("filters.servings")}
        </label>
        <select
          value={filters.servings}
          onChange={(e) => set("servings", Number(e.target.value))}
          className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500"
        >
          <option value={0}>{t("filters.any")}</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>{t("servings.4plus")}</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
          {t("filters.difficulty")}
        </label>
        <select
          value={filters.difficulty}
          onChange={(e) => set("difficulty", e.target.value)}
          className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500"
        >
          <option value="">{t("filters.any")}</option>
          <option value="Easy">{t("difficulty.Easy")}</option>
          <option value="Medium">{t("difficulty.Medium")}</option>
          <option value="Hard">{t("difficulty.Hard")}</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
          {t("filters.dietaryGoal")}
        </label>
        <select
          value={filters.dietaryGoal}
          onChange={(e) => set("dietaryGoal", e.target.value)}
          className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500"
        >
          <option value="">{t("filters.any")}</option>
          <option value="High Protein">{t("dietary.highProtein")}</option>
          <option value="Vegetarian">{t("dietary.vegetarian")}</option>
          <option value="Vegan">{t("dietary.vegan")}</option>
          <option value="Low Carb">{t("dietary.lowCarb")}</option>
          <option value="Quick">{t("dietary.quick")}</option>
        </select>
      </div>

      <div className="col-span-2 sm:col-span-1 flex items-end">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.bloodSugarFriendly}
            onChange={(e) => set("bloodSugarFriendly", e.target.checked)}
            className="h-4 w-4 rounded border-stone-300 text-amber-500 accent-amber-500"
          />
          <span className="text-sm text-stone-700">{t("filters.bloodSugar")}</span>
        </label>
      </div>
    </div>
  );
}
