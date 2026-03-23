import { type Settings } from "./settings";

// ── Ingredient catalog by category ──────────────────────────────────────────

export const MEAL_INGREDIENT_CATALOG = {
  proteins: [
    "lean-pork", "eggs", "goose-eggs", "sea-bass", "yellow-catfish",
    "flounder", "silver-carp", "beef", "chicken-breast", "local-chicken",
    "shrimp", "tofu",
  ],
  vegetables: [
    "potatoes", "tomatoes", "broccoli", "leafy-greens", "cabbage",
    "eggplant", "cucumber", "celery", "carrots", "mushrooms", "wood-ear",
    "bean-sprouts", "corn",
  ],
  staples: ["rice", "noodles", "flour"],
  seasonings: [
    "ginger", "scallions", "green-onions", "sichuan-pepper", "salt",
    "soy-sauce", "vinegar", "starch",
  ],
};

// ── Cooking methods by equipment ────────────────────────────────────────────

interface CookingMethod {
  id: string;
  equipment: string;
  name: { en: string; zh: string };
}

const COOKING_METHODS: CookingMethod[] = [
  { id: "stir-fry",      equipment: "wok",              name: { en: "Stir-fry",       zh: "炒" } },
  { id: "braise",        equipment: "wok",              name: { en: "Braise",         zh: "炖/烧" } },
  { id: "deep-fry",      equipment: "wok",              name: { en: "Deep-fry",       zh: "炸" } },
  { id: "boil-soup",     equipment: "wok",              name: { en: "Soup",           zh: "煮汤" } },
  { id: "steam",         equipment: "steamer",          name: { en: "Steam",          zh: "蒸" } },
  { id: "griddle-sear",  equipment: "electric-griddle", name: { en: "Pan-sear",       zh: "煎" } },
  { id: "griddle-pancake",equipment: "electric-griddle", name: { en: "Griddle cake",  zh: "烙饼" } },
];

// ── Dish templates ──────────────────────────────────────────────────────────

interface DishTemplate {
  nameEn: string;
  nameZh: string;
  protein: string | null;
  vegetables: string[];
  seasonings: string[];
  staple: string | null;
  method: string; // cooking method id
  calories: number; // per serving estimate
  proteinG: number;
  carbsG: number;
  fatG: number;
  tags: string[];
}

const DISH_TEMPLATES: DishTemplate[] = [
  // Stir-fries (wok)
  { nameEn: "Tomato Egg Stir-fry", nameZh: "番茄炒蛋", protein: "eggs", vegetables: ["tomatoes"], seasonings: ["salt", "green-onions"], staple: null, method: "stir-fry", calories: 180, proteinG: 12, carbsG: 8, fatG: 10, tags: ["quick"] },
  { nameEn: "Stir-fried Broccoli with Beef", nameZh: "西兰花炒牛肉", protein: "beef", vegetables: ["broccoli"], seasonings: ["soy-sauce", "ginger", "starch"], staple: null, method: "stir-fry", calories: 250, proteinG: 28, carbsG: 8, fatG: 12, tags: ["high-protein"] },
  { nameEn: "Pork & Potato Stir-fry", nameZh: "土豆炒肉丝", protein: "lean-pork", vegetables: ["potatoes"], seasonings: ["soy-sauce", "green-onions", "ginger"], staple: null, method: "stir-fry", calories: 220, proteinG: 18, carbsG: 20, fatG: 10, tags: [] },
  { nameEn: "Stir-fried Leafy Greens", nameZh: "清炒时蔬", protein: null, vegetables: ["leafy-greens"], seasonings: ["salt", "ginger"], staple: null, method: "stir-fry", calories: 60, proteinG: 3, carbsG: 5, fatG: 3, tags: ["quick", "light"] },
  { nameEn: "Shrimp & Broccoli", nameZh: "虾仁西兰花", protein: "shrimp", vegetables: ["broccoli"], seasonings: ["salt", "ginger", "starch"], staple: null, method: "stir-fry", calories: 200, proteinG: 24, carbsG: 6, fatG: 8, tags: ["high-protein", "quick"] },
  { nameEn: "Chicken Breast & Mushrooms", nameZh: "鸡胸肉炒蘑菇", protein: "chicken-breast", vegetables: ["mushrooms"], seasonings: ["soy-sauce", "ginger", "starch"], staple: null, method: "stir-fry", calories: 210, proteinG: 30, carbsG: 5, fatG: 8, tags: ["high-protein"] },
  { nameEn: "Egg & Wood Ear Stir-fry", nameZh: "木耳炒蛋", protein: "eggs", vegetables: ["wood-ear"], seasonings: ["salt", "green-onions"], staple: null, method: "stir-fry", calories: 170, proteinG: 11, carbsG: 6, fatG: 10, tags: ["quick"] },
  { nameEn: "Shredded Pork & Cabbage", nameZh: "手撕包菜炒肉", protein: "lean-pork", vegetables: ["cabbage"], seasonings: ["soy-sauce", "sichuan-pepper", "vinegar"], staple: null, method: "stir-fry", calories: 200, proteinG: 16, carbsG: 8, fatG: 11, tags: [] },
  { nameEn: "Stir-fried Bean Sprouts", nameZh: "醋溜豆芽", protein: null, vegetables: ["bean-sprouts"], seasonings: ["vinegar", "salt", "sichuan-pepper"], staple: null, method: "stir-fry", calories: 50, proteinG: 3, carbsG: 6, fatG: 1, tags: ["quick", "light"] },
  { nameEn: "Celery with Local Chicken", nameZh: "芹菜炒土鸡", protein: "local-chicken", vegetables: ["celery"], seasonings: ["soy-sauce", "ginger", "sichuan-pepper"], staple: null, method: "stir-fry", calories: 230, proteinG: 22, carbsG: 4, fatG: 12, tags: [] },
  { nameEn: "Cucumber & Egg Stir-fry", nameZh: "黄瓜炒蛋", protein: "eggs", vegetables: ["cucumber"], seasonings: ["salt", "green-onions"], staple: null, method: "stir-fry", calories: 150, proteinG: 10, carbsG: 5, fatG: 9, tags: ["quick", "light"] },
  { nameEn: "Eggplant Stir-fry", nameZh: "炒茄子", protein: null, vegetables: ["eggplant"], seasonings: ["soy-sauce", "ginger", "vinegar"], staple: null, method: "stir-fry", calories: 100, proteinG: 2, carbsG: 12, fatG: 5, tags: ["light"] },
  { nameEn: "Corn & Carrot Stir-fry", nameZh: "玉米胡萝卜炒", protein: null, vegetables: ["corn", "carrots"], seasonings: ["salt"], staple: null, method: "stir-fry", calories: 90, proteinG: 3, carbsG: 18, fatG: 2, tags: ["quick", "light"] },
  { nameEn: "Tofu & Tomato", nameZh: "番茄烧豆腐", protein: "tofu", vegetables: ["tomatoes"], seasonings: ["soy-sauce", "salt", "green-onions"], staple: null, method: "braise", calories: 160, proteinG: 12, carbsG: 10, fatG: 8, tags: [] },

  // Braised / soup (wok)
  { nameEn: "Braised Sea Bass", nameZh: "红烧鲈鱼", protein: "sea-bass", vegetables: [], seasonings: ["soy-sauce", "ginger", "scallions", "vinegar"], staple: null, method: "braise", calories: 230, proteinG: 32, carbsG: 4, fatG: 8, tags: ["high-protein"] },
  { nameEn: "Braised Yellow Catfish", nameZh: "红烧黄骨鱼", protein: "yellow-catfish", vegetables: [], seasonings: ["soy-sauce", "ginger", "green-onions"], staple: null, method: "braise", calories: 200, proteinG: 28, carbsG: 3, fatG: 7, tags: ["high-protein"] },
  { nameEn: "Tomato Egg Drop Soup", nameZh: "番茄蛋花汤", protein: "eggs", vegetables: ["tomatoes"], seasonings: ["salt", "green-onions"], staple: null, method: "boil-soup", calories: 80, proteinG: 6, carbsG: 8, fatG: 3, tags: ["light", "quick"] },
  { nameEn: "Silver Carp Tofu Soup", nameZh: "鲢鱼豆腐汤", protein: "silver-carp", vegetables: [], seasonings: ["ginger", "scallions", "salt"], staple: null, method: "boil-soup", calories: 180, proteinG: 24, carbsG: 3, fatG: 7, tags: [] },
  { nameEn: "Braised Flounder", nameZh: "红烧多宝鱼", protein: "flounder", vegetables: [], seasonings: ["soy-sauce", "ginger", "scallions"], staple: null, method: "braise", calories: 190, proteinG: 30, carbsG: 3, fatG: 5, tags: ["high-protein"] },

  // Steamed (steamer)
  { nameEn: "Steamed Sea Bass", nameZh: "清蒸鲈鱼", protein: "sea-bass", vegetables: [], seasonings: ["ginger", "scallions", "soy-sauce"], staple: null, method: "steam", calories: 200, proteinG: 32, carbsG: 2, fatG: 6, tags: ["high-protein", "light"] },
  { nameEn: "Steamed Eggs", nameZh: "蒸蛋羹", protein: "eggs", vegetables: [], seasonings: ["salt", "green-onions"], staple: null, method: "steam", calories: 100, proteinG: 8, carbsG: 1, fatG: 7, tags: ["quick", "light"] },
  { nameEn: "Steamed Chicken", nameZh: "清蒸土鸡", protein: "local-chicken", vegetables: [], seasonings: ["ginger", "scallions", "salt"], staple: null, method: "steam", calories: 240, proteinG: 28, carbsG: 0, fatG: 14, tags: ["high-protein"] },
  { nameEn: "Steamed Flounder", nameZh: "清蒸多宝鱼", protein: "flounder", vegetables: [], seasonings: ["ginger", "scallions", "soy-sauce"], staple: null, method: "steam", calories: 170, proteinG: 28, carbsG: 2, fatG: 4, tags: ["high-protein", "light"] },
  { nameEn: "Steamed Goose Eggs", nameZh: "蒸鹅蛋", protein: "goose-eggs", vegetables: [], seasonings: ["salt"], staple: null, method: "steam", calories: 140, proteinG: 10, carbsG: 1, fatG: 10, tags: [] },

  // Griddle (electric-griddle)
  { nameEn: "Pan-seared Shrimp", nameZh: "煎虾", protein: "shrimp", vegetables: [], seasonings: ["salt", "ginger"], staple: null, method: "griddle-sear", calories: 180, proteinG: 22, carbsG: 1, fatG: 8, tags: ["quick", "high-protein"] },
  { nameEn: "Pan-seared Beef Patties", nameZh: "牛肉煎饼", protein: "beef", vegetables: [], seasonings: ["salt", "green-onions", "sichuan-pepper"], staple: "flour", method: "griddle-sear", calories: 280, proteinG: 20, carbsG: 22, fatG: 14, tags: [] },
  { nameEn: "Scallion Pancakes", nameZh: "葱油饼", protein: null, vegetables: [], seasonings: ["scallions", "salt"], staple: "flour", method: "griddle-pancake", calories: 220, proteinG: 5, carbsG: 32, fatG: 8, tags: [] },
  { nameEn: "Egg Pancake Wrap", nameZh: "鸡蛋饼", protein: "eggs", vegetables: [], seasonings: ["salt", "green-onions"], staple: "flour", method: "griddle-pancake", calories: 200, proteinG: 10, carbsG: 28, fatG: 7, tags: ["quick"] },

  // Staple dishes
  { nameEn: "Steamed Rice", nameZh: "米饭", protein: null, vegetables: [], seasonings: [], staple: "rice", method: "steam", calories: 200, proteinG: 4, carbsG: 44, fatG: 0, tags: [] },
  { nameEn: "Plain Noodles in Broth", nameZh: "汤面", protein: null, vegetables: ["leafy-greens"], seasonings: ["salt", "soy-sauce", "green-onions"], staple: "noodles", method: "boil-soup", calories: 250, proteinG: 8, carbsG: 46, fatG: 3, tags: [] },
];

// ── Types ───────────────────────────────────────────────────────────────────

export interface MealSlot {
  dishName: { en: string; zh: string };
  ingredients: string[];
  cookingMethod: { en: string; zh: string };
  equipment: string;
}

export interface MealCombo {
  id: string;
  name: { en: string; zh: string };
  slots: MealSlot[];
  tags: string[];
  servings: number;
  nutrition: {
    estimatedCalories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

// ── Generation logic ────────────────────────────────────────────────────────

function available(settings: Settings, needed: string[]): boolean {
  return needed.every((n) => settings.ingredients.includes(n));
}

function methodAvailable(settings: Settings, methodId: string): boolean {
  const method = COOKING_METHODS.find((m) => m.id === methodId);
  return !!method && settings.equipment.includes(method.equipment);
}

function getMethod(methodId: string): CookingMethod {
  return COOKING_METHODS.find((m) => m.id === methodId)!;
}

function templateIngredients(tpl: DishTemplate): string[] {
  const result: string[] = [];
  if (tpl.protein) result.push(tpl.protein);
  result.push(...tpl.vegetables);
  result.push(...tpl.seasonings);
  if (tpl.staple) result.push(tpl.staple);
  return result;
}

function canMake(settings: Settings, tpl: DishTemplate): boolean {
  return (
    available(settings, templateIngredients(tpl)) &&
    methodAvailable(settings, tpl.method)
  );
}

function isHealthConscious(tpl: DishTemplate): boolean {
  // Avoid deep-fried, keep calories reasonable, prefer high-protein or light tags
  return tpl.method !== "deep-fry" && tpl.calories <= 280;
}

export function generateMealCombos(settings: Settings): MealCombo[] {
  const feasible = DISH_TEMPLATES.filter((tpl) => canMake(settings, tpl));
  const healthMode =
    settings.healthGoals.includes("blood-sugar-control") ||
    settings.healthGoals.includes("blood-lipid-control");

  const pool = healthMode ? feasible.filter(isHealthConscious) : feasible;

  // Separate by role
  const proteinDishes = pool.filter((d) => d.protein !== null);
  const vegDishes = pool.filter((d) => d.protein === null && d.staple === null);
  const stapleDishes = pool.filter((d) => d.staple !== null && d.protein === null);
  const soupDishes = pool.filter((d) => d.method === "boil-soup");

  // We need at least a staple or something cookable
  const hasStaple = stapleDishes.length > 0 ||
    pool.some((d) => d.staple !== null);

  if (pool.length < 2) {
    // Fallback: generate whatever is possible
    if (pool.length === 0) return [];
    return makeFallbackCombos(pool, settings, healthMode);
  }

  const combos: MealCombo[] = [];
  let comboId = 0;

  // Strategy: pick 1 protein + 1 veggie + 1 staple (+ optional soup)
  for (const protein of proteinDishes) {
    for (const veg of vegDishes) {
      // Skip if same combo already has this protein
      if (protein.protein === veg.protein) continue;

      // Find a staple
      const staple = stapleDishes.find((s) =>
        s.staple === "rice" || s.staple === "noodles"
      ) || stapleDishes[0];

      if (!staple && !hasStaple) continue;

      // Optionally add soup if we have one that uses a different protein
      const soup = soupDishes.find(
        (s) => s.protein !== protein.protein && canMake(settings, s)
      );

      const slots: MealSlot[] = [];

      // Protein dish
      const proteinMethod = getMethod(protein.method);
      slots.push({
        dishName: { en: protein.nameEn, zh: protein.nameZh },
        ingredients: templateIngredients(protein),
        cookingMethod: proteinMethod.name,
        equipment: proteinMethod.equipment,
      });

      // Veggie dish
      const vegMethod = getMethod(veg.method);
      slots.push({
        dishName: { en: veg.nameEn, zh: veg.nameZh },
        ingredients: templateIngredients(veg),
        cookingMethod: vegMethod.name,
        equipment: vegMethod.equipment,
      });

      // Staple
      if (staple) {
        const stapleMethod = getMethod(staple.method);
        slots.push({
          dishName: { en: staple.nameEn, zh: staple.nameZh },
          ingredients: templateIngredients(staple),
          cookingMethod: stapleMethod.name,
          equipment: stapleMethod.equipment,
        });
      }

      // Soup (optional 4th dish)
      if (soup) {
        const soupMethod = getMethod(soup.method);
        slots.push({
          dishName: { en: soup.nameEn, zh: soup.nameZh },
          ingredients: templateIngredients(soup),
          cookingMethod: soupMethod.name,
          equipment: soupMethod.equipment,
        });
      }

      const totalCal = [protein, veg, staple, soup]
        .filter(Boolean)
        .reduce((s, d) => s + (d?.calories ?? 0), 0);
      const totalProt = [protein, veg, staple, soup]
        .filter(Boolean)
        .reduce((s, d) => s + (d?.proteinG ?? 0), 0);
      const totalCarbs = [protein, veg, staple, soup]
        .filter(Boolean)
        .reduce((s, d) => s + (d?.carbsG ?? 0), 0);
      const totalFat = [protein, veg, staple, soup]
        .filter(Boolean)
        .reduce((s, d) => s + (d?.fatG ?? 0), 0);

      const tags: string[] = [];
      if (healthMode) tags.push("health-conscious");
      if ([protein, veg].every((d) => d.tags.includes("quick"))) tags.push("quick");
      if (totalProt > 30) tags.push("balanced");
      if (tags.length === 0) tags.push("balanced");

      const nameEn = slots.map((s) => s.dishName.en).join(" + ");
      const nameZh = slots.map((s) => s.dishName.zh).join(" + ");

      combos.push({
        id: `combo-${++comboId}`,
        name: { en: nameEn, zh: nameZh },
        slots,
        tags,
        servings: settings.familyMembers.length,
        nutrition: {
          estimatedCalories: totalCal,
          protein: totalProt,
          carbs: totalCarbs,
          fat: totalFat,
        },
      });
    }
  }

  // Also generate protein-only combos with a different protein + staple for variety
  // (2-protein meals: e.g., a fish + a meat + staple)
  for (let i = 0; i < proteinDishes.length; i++) {
    for (let j = i + 1; j < proteinDishes.length; j++) {
      const a = proteinDishes[i];
      const b = proteinDishes[j];
      if (a.protein === b.protein) continue;
      if (a.method === b.method && a.method === "stir-fry") continue; // Avoid 2 stir-fries

      const staple = stapleDishes.find((s) =>
        s.staple === "rice" || s.staple === "noodles"
      ) || stapleDishes[0];

      if (!staple) continue;

      const slots: MealSlot[] = [];
      for (const dish of [a, b, staple]) {
        const m = getMethod(dish.method);
        slots.push({
          dishName: { en: dish.nameEn, zh: dish.nameZh },
          ingredients: templateIngredients(dish),
          cookingMethod: m.name,
          equipment: m.equipment,
        });
      }

      const dishes = [a, b, staple];
      const totalCal = dishes.reduce((s, d) => s + d.calories, 0);
      const totalProt = dishes.reduce((s, d) => s + d.proteinG, 0);
      const totalCarbs = dishes.reduce((s, d) => s + d.carbsG, 0);
      const totalFat = dishes.reduce((s, d) => s + d.fatG, 0);

      const tags: string[] = [];
      if (healthMode) tags.push("health-conscious");
      tags.push("balanced");

      combos.push({
        id: `combo-${++comboId}`,
        name: {
          en: slots.map((s) => s.dishName.en).join(" + "),
          zh: slots.map((s) => s.dishName.zh).join(" + "),
        },
        slots,
        tags,
        servings: settings.familyMembers.length,
        nutrition: {
          estimatedCalories: totalCal,
          protein: totalProt,
          carbs: totalCarbs,
          fat: totalFat,
        },
      });
    }
  }

  return combos;
}

function makeFallbackCombos(
  pool: DishTemplate[],
  settings: Settings,
  healthMode: boolean
): MealCombo[] {
  // Just wrap whatever we can make into simple combos
  const slots: MealSlot[] = pool.map((d) => {
    const m = getMethod(d.method);
    return {
      dishName: { en: d.nameEn, zh: d.nameZh },
      ingredients: templateIngredients(d),
      cookingMethod: m.name,
      equipment: m.equipment,
    };
  });

  const totalCal = pool.reduce((s, d) => s + d.calories, 0);
  const tags: string[] = [];
  if (healthMode) tags.push("health-conscious");
  tags.push("balanced");

  return [{
    id: "combo-fallback",
    name: {
      en: slots.map((s) => s.dishName.en).join(" + "),
      zh: slots.map((s) => s.dishName.zh).join(" + "),
    },
    slots,
    tags,
    servings: settings.familyMembers.length,
    nutrition: {
      estimatedCalories: totalCal,
      protein: pool.reduce((s, d) => s + d.proteinG, 0),
      carbs: pool.reduce((s, d) => s + d.carbsG, 0),
      fat: pool.reduce((s, d) => s + d.fatG, 0),
    },
  }];
}
