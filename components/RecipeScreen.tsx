import React from "react";
import Recipe from "./Recipe";

const mockRecipe = {
  name: "Hearty Vegetable Stew",
  ingredients: [
    "Carrots",
    "Potatoes",
    "Onions",
    "Celery",
    "Tomato Paste",
    "Vegetable Broth",
    "Garlic",
    "Bay Leaf",
    "Salt",
    "Pepper"
  ],
  steps: `
1. Chop all vegetables into bite-sized pieces.
2. In a large pot, sauté onions, garlic, and celery until fragrant.
3. Add carrots and potatoes, cook for 5 minutes.
4. Stir in tomato paste, then pour in vegetable broth.
5. Add bay leaf, salt, and pepper.
6. Bring to a boil, then reduce heat and simmer for 30–40 minutes.
7. Remove bay leaf and serve hot.`
};

export default function RecipeScreen() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available Recipes</h1>
      <Recipe
        name={mockRecipe.name}
        ingredients={mockRecipe.ingredients}
        steps={mockRecipe.steps}
      />
    </div>
  );
}
