export type Gender = "male" | "female";

export interface FamilyMember {
  id: string;
  age: number;
  gender: Gender;
  label: string;
}

export type Equipment =
  | "electric-griddle"
  | "wok"
  | "steamer"
  | "oven"
  | "rice-cooker"
  | "air-fryer";

export type HealthGoal =
  | "blood-sugar-control"
  | "blood-lipid-control"
  | "low-sodium"
  | "high-protein"
  | "weight-loss";

export type SettingsIngredient =
  | "lean-pork" | "eggs" | "goose-eggs" | "sea-bass" | "yellow-catfish"
  | "flounder" | "silver-carp" | "beef" | "chicken-breast" | "local-chicken"
  | "shrimp" | "potatoes" | "tomatoes" | "broccoli" | "ginger"
  | "scallions" | "green-onions" | "sichuan-pepper" | "salt" | "soy-sauce"
  | "vinegar" | "flour" | "starch" | "noodles" | "rice" | "leafy-greens"
  | "tofu" | "corn" | "cabbage" | "eggplant" | "cucumber" | "celery"
  | "carrots" | "mushrooms" | "wood-ear" | "bean-sprouts";

export interface Settings {
  equipment: string[];
  familyMembers: FamilyMember[];
  healthGoals: HealthGoal[];
  ingredients: string[];
  foodPreferences: string[];
}

let _id = 0;
function uid(): string {
  return `fm-${++_id}-${Date.now()}`;
}

export const defaultSettings: Settings = {
  equipment: ["electric-griddle", "wok", "steamer"],
  familyMembers: [
    { id: uid(), age: 40, gender: "male", label: "" },
    { id: uid(), age: 36, gender: "female", label: "" },
    { id: uid(), age: 10, gender: "male", label: "" },
    { id: uid(), age: 2.5, gender: "male", label: "" },
  ],
  healthGoals: ["blood-sugar-control", "blood-lipid-control"],
  ingredients: [
    "lean-pork", "eggs", "goose-eggs", "sea-bass", "yellow-catfish",
    "flounder", "silver-carp", "beef", "chicken-breast", "local-chicken",
    "shrimp", "potatoes", "tomatoes", "broccoli", "ginger",
    "scallions", "green-onions", "sichuan-pepper", "salt", "soy-sauce",
    "vinegar", "flour", "starch", "noodles", "rice", "leafy-greens",
  ],
  foodPreferences: [],
};

export const ALL_SETTINGS_INGREDIENTS: string[] = [
  // Proteins
  "lean-pork", "eggs", "goose-eggs", "sea-bass", "yellow-catfish",
  "flounder", "silver-carp", "beef", "chicken-breast", "local-chicken",
  "shrimp", "tofu",
  // Vegetables
  "potatoes", "tomatoes", "broccoli", "leafy-greens", "cabbage",
  "eggplant", "cucumber", "celery", "carrots", "mushrooms", "wood-ear",
  "bean-sprouts", "corn",
  // Seasonings & aromatics
  "ginger", "scallions", "green-onions", "sichuan-pepper", "salt",
  "soy-sauce", "vinegar",
  // Staples & starches
  "flour", "starch", "noodles", "rice",
];

export const ALL_EQUIPMENT: Equipment[] = [
  "electric-griddle", "wok", "steamer", "oven", "rice-cooker", "air-fryer",
];

export const ALL_HEALTH_GOALS: HealthGoal[] = [
  "blood-sugar-control", "blood-lipid-control", "low-sodium", "high-protein", "weight-loss",
];

// ── Pure operations ─────────────────────────────────────────────────────────

export function addFamilyMember(settings: Settings, member: FamilyMember): Settings {
  return { ...settings, familyMembers: [...settings.familyMembers, member] };
}

export function removeFamilyMember(settings: Settings, id: string): Settings {
  return {
    ...settings,
    familyMembers: settings.familyMembers.filter((m) => m.id !== id),
  };
}

export function updateFamilyMember(
  settings: Settings,
  id: string,
  patch: Partial<Omit<FamilyMember, "id">>
): Settings {
  return {
    ...settings,
    familyMembers: settings.familyMembers.map((m) =>
      m.id === id ? { ...m, ...patch } : m
    ),
  };
}

export function toggleEquipment(settings: Settings, eq: string): Settings {
  const has = settings.equipment.includes(eq);
  return {
    ...settings,
    equipment: has
      ? settings.equipment.filter((e) => e !== eq)
      : [...settings.equipment, eq],
  };
}

export function toggleIngredient(settings: Settings, ingredient: string): Settings {
  const has = settings.ingredients.includes(ingredient);
  return {
    ...settings,
    ingredients: has
      ? settings.ingredients.filter((i) => i !== ingredient)
      : [...settings.ingredients, ingredient],
  };
}

export function setIngredients(settings: Settings, ingredients: string[]): Settings {
  return { ...settings, ingredients };
}

export function toggleHealthGoal(settings: Settings, goal: HealthGoal): Settings {
  const has = settings.healthGoals.includes(goal);
  return {
    ...settings,
    healthGoals: has
      ? settings.healthGoals.filter((g) => g !== goal)
      : [...settings.healthGoals, goal],
  };
}
