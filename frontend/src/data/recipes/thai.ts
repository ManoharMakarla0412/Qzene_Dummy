
import { Recipe } from '@/types';

export const thaiRecipes: Recipe[] = [
  {
    id: "13",
    name: "Pad Thai",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cuisine: "Thai",
    cookingTime: 25,
    servings: 4,
    difficulty: "Medium",
    rating: 4.8,
    deviceSupport: "Simmr",
    chefCreated: true,
    ingredients: [
      "8 oz rice noodles",
      "1 lb shrimp, peeled and deveined",
      "2 eggs, beaten",
      "1 cup bean sprouts",
      "4 green onions, sliced",
      "1/4 cup chopped peanuts",
      "2 tbsp vegetable oil",
      "2 cloves garlic, minced",
      "2 tbsp fish sauce",
      "2 tbsp tamarind paste",
      "1 tbsp sugar",
      "1 lime, cut into wedges",
      "Fresh cilantro for garnish"
    ],
    instructions: [
      "Soak rice noodles in hot water until soft, about 8 minutes, drain",
      "In a wok, heat oil and add garlic, stir-fry for 30 seconds",
      "Add shrimp and cook until pink",
      "Push shrimp to the side, add eggs and scramble",
      "Add noodles, fish sauce, tamarind paste, and sugar",
      "Toss until well combined and noodles are heated through",
      "Add bean sprouts and green onions, toss briefly",
      "Garnish with peanuts, cilantro, and lime wedges"
    ],
    calories: 420,
    protein: 24,
    fat: 14,
    carbs: 52
  },
  {
    id: "14",
    name: "Green Curry",
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cuisine: "Thai",
    cookingTime: 35,
    servings: 4,
    difficulty: "Medium",
    rating: 4.7,
    deviceSupport: "MoMe",
    ingredients: [
      "1.5 lbs chicken thighs, sliced",
      "1 can (14 oz) coconut milk",
      "3 tbsp green curry paste",
      "1 eggplant, cubed",
      "1 red bell pepper, sliced",
      "1 cup bamboo shoots",
      "1 tbsp fish sauce",
      "1 tbsp palm sugar",
      "Thai basil leaves",
      "2 kaffir lime leaves",
      "1 Thai chili, sliced (optional)"
    ],
    instructions: [
      "In a large pot, heat 2 tbsp coconut milk until oil separates",
      "Add green curry paste and stir-fry for 1 minute",
      "Add chicken and stir until no longer pink",
      "Pour in remaining coconut milk and bring to a simmer",
      "Add eggplant, bell pepper, and bamboo shoots",
      "Simmer until vegetables are tender and chicken is cooked",
      "Stir in fish sauce, palm sugar, and lime leaves",
      "Garnish with Thai basil and chili if using",
      "Serve with jasmine rice"
    ],
    calories: 450,
    protein: 28,
    fat: 32,
    carbs: 14
  }
];
