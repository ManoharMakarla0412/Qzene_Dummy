
import { Recipe } from '@/types';

export const japaneseRecipes: Recipe[] = [
  {
    id: "17",
    name: "Chicken Teriyaki",
    image: "https://images.unsplash.com/photo-1569058242567-93de6f36f8e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cuisine: "Japanese",
    cookingTime: 25,
    servings: 4,
    difficulty: "Easy",
    rating: 4.7,
    deviceSupport: "Simmr",
    ingredients: [
      "1.5 lbs boneless chicken thighs",
      "1/2 cup soy sauce",
      "1/4 cup mirin",
      "1/4 cup sake",
      "2 tbsp sugar",
      "1 tbsp grated ginger",
      "2 cloves garlic, minced",
      "1 tbsp vegetable oil",
      "2 green onions, sliced",
      "1 tbsp sesame seeds"
    ],
    instructions: [
      "In a bowl, combine soy sauce, mirin, sake, sugar, ginger, and garlic",
      "Marinate chicken for at least 30 minutes",
      "Heat oil in a skillet over medium-high heat",
      "Remove chicken from marinade, reserve marinade",
      "Cook chicken until browned and cooked through",
      "Pour in reserved marinade and simmer until sauce thickens",
      "Garnish with green onions and sesame seeds",
      "Serve with steamed rice"
    ],
    calories: 380,
    protein: 32,
    fat: 20,
    carbs: 10
  },
  {
    id: "18",
    name: "Miso Soup",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cuisine: "Japanese",
    cookingTime: 15,
    servings: 4,
    difficulty: "Easy",
    rating: 4.5,
    deviceSupport: "Simmr",
    ingredients: [
      "4 cups dashi stock",
      "3 tbsp miso paste",
      "1 block soft tofu, cubed",
      "2 green onions, sliced",
      "1 tbsp dried wakame seaweed",
      "1 tbsp bonito flakes (optional)"
    ],
    instructions: [
      "Soak wakame in water for 5 minutes, then drain",
      "Heat dashi stock in a pot until just before boiling",
      "In a small bowl, mix miso paste with a few tablespoons of warm dashi",
      "Turn off heat and add dissolved miso to the pot",
      "Add tofu and wakame",
      "Garnish with green onions and bonito flakes before serving"
    ],
    calories: 120,
    protein: 8,
    fat: 5,
    carbs: 10
  }
];
