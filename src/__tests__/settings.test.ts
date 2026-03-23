import { describe, it, expect, beforeEach } from "vitest";
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
  setIngredients,
} from "@/lib/settings";

describe("Settings data model", () => {
  describe("defaultSettings", () => {
    it("has default cooking equipment", () => {
      expect(defaultSettings.equipment).toEqual(
        expect.arrayContaining(["electric-griddle", "wok", "steamer"])
      );
      expect(defaultSettings.equipment).toHaveLength(3);
    });

    it("has default family members", () => {
      const members = defaultSettings.familyMembers;
      expect(members).toHaveLength(4);
      expect(members[0]).toEqual({ id: expect.any(String), age: 40, gender: "male", label: "" });
      expect(members[1]).toEqual({ id: expect.any(String), age: 36, gender: "female", label: "" });
      expect(members[2]).toEqual({ id: expect.any(String), age: 10, gender: "male", label: "" });
      expect(members[3]).toEqual({ id: expect.any(String), age: 2.5, gender: "male", label: "" });
    });

    it("has blood sugar and blood lipid control as default health goals", () => {
      expect(defaultSettings.healthGoals).toContain("blood-sugar-control");
      expect(defaultSettings.healthGoals).toContain("blood-lipid-control");
    });

    it("has the specified default ingredients", () => {
      const ing = defaultSettings.ingredients;
      // Verify key ingredients
      expect(ing).toContain("lean-pork");
      expect(ing).toContain("eggs");
      expect(ing).toContain("goose-eggs");
      expect(ing).toContain("sea-bass");
      expect(ing).toContain("yellow-catfish");
      expect(ing).toContain("flounder");
      expect(ing).toContain("silver-carp");
      expect(ing).toContain("beef");
      expect(ing).toContain("chicken-breast");
      expect(ing).toContain("local-chicken");
      expect(ing).toContain("shrimp");
      expect(ing).toContain("potatoes");
      expect(ing).toContain("tomatoes");
      expect(ing).toContain("broccoli");
      expect(ing).toContain("ginger");
      expect(ing).toContain("scallions");
      expect(ing).toContain("green-onions");
      expect(ing).toContain("sichuan-pepper");
      expect(ing).toContain("salt");
      expect(ing).toContain("soy-sauce");
      expect(ing).toContain("vinegar");
      expect(ing).toContain("flour");
      expect(ing).toContain("starch");
      expect(ing).toContain("noodles");
      expect(ing).toContain("rice");
      expect(ing).toContain("leafy-greens");
      expect(ing).toHaveLength(26);
    });

    it("has empty food preferences by default", () => {
      expect(defaultSettings.foodPreferences).toEqual([]);
    });
  });

  describe("family member operations", () => {
    let settings: Settings;
    beforeEach(() => {
      settings = { ...defaultSettings, familyMembers: [...defaultSettings.familyMembers] };
    });

    it("adds a family member", () => {
      const newMember: FamilyMember = { id: "test-1", age: 65, gender: "female", label: "grandma" };
      const updated = addFamilyMember(settings, newMember);
      expect(updated.familyMembers).toHaveLength(5);
      expect(updated.familyMembers[4]).toEqual(newMember);
    });

    it("removes a family member by id", () => {
      const idToRemove = settings.familyMembers[2].id;
      const updated = removeFamilyMember(settings, idToRemove);
      expect(updated.familyMembers).toHaveLength(3);
      expect(updated.familyMembers.find((m) => m.id === idToRemove)).toBeUndefined();
    });

    it("updates a family member", () => {
      const id = settings.familyMembers[0].id;
      const updated = updateFamilyMember(settings, id, { age: 41 });
      expect(updated.familyMembers[0].age).toBe(41);
      expect(updated.familyMembers[0].gender).toBe("male");
    });
  });

  describe("equipment operations", () => {
    it("toggles equipment on", () => {
      const settings = { ...defaultSettings, equipment: ["wok"] };
      const updated = toggleEquipment(settings, "oven");
      expect(updated.equipment).toContain("oven");
      expect(updated.equipment).toContain("wok");
    });

    it("toggles equipment off", () => {
      const updated = toggleEquipment(defaultSettings, "wok");
      expect(updated.equipment).not.toContain("wok");
    });
  });

  describe("ingredient operations", () => {
    it("toggles ingredient on", () => {
      const settings = { ...defaultSettings, ingredients: ["rice"] };
      const updated = toggleIngredient(settings, "tofu");
      expect(updated.ingredients).toContain("tofu");
      expect(updated.ingredients).toContain("rice");
    });

    it("toggles ingredient off", () => {
      const updated = toggleIngredient(defaultSettings, "rice");
      expect(updated.ingredients).not.toContain("rice");
    });

    it("bulk sets ingredients", () => {
      const updated = setIngredients(defaultSettings, ["rice", "eggs"]);
      expect(updated.ingredients).toEqual(["rice", "eggs"]);
    });
  });

  describe("health goal operations", () => {
    it("toggles health goal on", () => {
      const settings = { ...defaultSettings, healthGoals: [] as HealthGoal[] };
      const updated = toggleHealthGoal(settings, "blood-sugar-control");
      expect(updated.healthGoals).toContain("blood-sugar-control");
    });

    it("toggles health goal off", () => {
      const updated = toggleHealthGoal(defaultSettings, "blood-sugar-control");
      expect(updated.healthGoals).not.toContain("blood-sugar-control");
    });
  });
});
