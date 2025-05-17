
import { Recipe } from '@/types';

export const chineseRecipes: Recipe[] = [
  {
    id: "11",
    name: "Kung Pao Chicken",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cuisine: "Chinese",
    cookingTime: 30,
    servings: 4,
    difficulty: "Medium",
    rating: 4.6,
    deviceSupport: "MoMe",
    featured: true,
    ingredients: [
      "1.5 lbs boneless chicken, cubed",
      "1/2 cup roasted peanuts",
      "1 red bell pepper, diced",
      "1 green bell pepper, diced",
      "3 green onions, sliced",
      "6 dried red chilies",
      "3 cloves garlic, minced",
      "1 inch ginger, minced",
      "2 tbsp soy sauce",
      "1 tbsp rice vinegar",
      "1 tbsp hoisin sauce",
      "1 tsp sugar",
      "1 tsp cornstarch"
    ],
    instructions: [
      "Marinate chicken in soy sauce, rice vinegar, and cornstarch for 15 minutes",
      "Heat oil in a wok over high heat",
      "Add dried chilies, garlic, and ginger, stir-fry for 30 seconds",
      "Add chicken and stir-fry until no longer pink",
      "Add bell peppers and cook for 2 minutes",
      "Stir in hoisin sauce, sugar, and peanuts",
      "Garnish with green onions and serve with rice"
    ],
    calories: 380,
    protein: 32,
    fat: 20,
    carbs: 18
  },
  {
    id: "12",
    name: "Vegetable Fried Rice",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cuisine: "Chinese",
    cookingTime: 20,
    servings: 4,
    difficulty: "Easy",
    rating: 4.5,
    deviceSupport: "Both",
    ingredients: [
      "3 cups cooked rice, cooled",
      "1 cup mixed vegetables (peas, carrots, corn)",
      "2 eggs, beaten",
      "3 green onions, sliced",
      "2 cloves garlic, minced",
      "2 tbsp soy sauce",
      "1 tbsp oyster sauce",
      "1 tsp sesame oil",
      "2 tbsp vegetable oil"
    ],
    instructions: [
      "Heat oil in a wok over high heat",
      "Add beaten eggs and scramble until set",
      "Add garlic and stir-fry for 30 seconds",
      "Add mixed vegetables and cook for 2 minutes",
      "Add rice, breaking up any clumps",
      "Stir in soy sauce, oyster sauce, and sesame oil",
      "Toss until well combined and heated through",
      "Garnish with green onions and serve"
    ],
    calories: 320,
    protein: 10,
    fat: 12,
    carbs: 45
  }
];
