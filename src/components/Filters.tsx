"use client";

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
  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    onChange({ ...filters, [key]: value });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <div>
        <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
          Max Time
        </label>
        <select
          value={filters.maxTime}
          onChange={(e) => set("maxTime", Number(e.target.value))}
          className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500"
        >
          <option value={0}>Any</option>
          <option value={15}>15 min</option>
          <option value={20}>20 min</option>
          <option value={30}>30 min</option>
          <option value={45}>45 min</option>
          <option value={60}>60 min</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
          Servings
        </label>
        <select
          value={filters.servings}
          onChange={(e) => set("servings", Number(e.target.value))}
          className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500"
        >
          <option value={0}>Any</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4+</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
          Difficulty
        </label>
        <select
          value={filters.difficulty}
          onChange={(e) => set("difficulty", e.target.value)}
          className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500"
        >
          <option value="">Any</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
          Dietary Goal
        </label>
        <select
          value={filters.dietaryGoal}
          onChange={(e) => set("dietaryGoal", e.target.value)}
          className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500"
        >
          <option value="">Any</option>
          <option value="High Protein">High Protein</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <option value="Low Carb">Low Carb</option>
          <option value="Quick">Quick (&lt;20 min)</option>
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
          <span className="text-sm text-stone-700">Blood Sugar Friendly</span>
        </label>
      </div>
    </div>
  );
}
