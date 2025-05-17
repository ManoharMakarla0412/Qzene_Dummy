
import { Recipe } from '@/types';

export const americanRecipes: Recipe[] = [
  {
    id: "29",
    name: "Classic Cheeseburger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cuisine: "American",
    cookingTime: 20,
    servings: 4,
    difficulty: "Easy",
    rating: 4.7,
    deviceSupport: "None",
    featured: true,
    ingredients: [
      "1.5 lbs ground beef (80/20)",
      "4 hamburger buns",
      "4 slices cheddar cheese",
      "1 tomato, sliced",
      "1 red onion, sliced",
      "4 lettuce leaves",
      "4 tbsp mayonnaise",
      "2 tbsp ketchup",
      "2 tbsp mustard",
      "4 dill pickle slices",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Divide ground beef into 4 equal portions and form into patties",
      "Season patties with salt and pepper on both sides",
      "Heat a skillet or grill to medium-high heat",
      "Cook patties for 4-5 minutes per side for medium doneness",
      "Place cheese slices on patties during the last minute of cooking",
      "Toast the buns lightly",
      "Spread mayo, ketchup, and mustard on buns",
      "Assemble burgers with lettuce, tomato, onion, and pickles",
      "Serve immediately with fries or a side salad"
    ],
    calories: 520,
    protein: 32,
    fat: 35,
    carbs: 25
  },
  {
    id: "30",
    name: "Mac and Cheese",
    image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cuisine: "American",
    cookingTime: 35,
    servings: 6,
    difficulty: "Easy",
    rating: 4.8,
    deviceSupport: "Both",
    ingredients: [
      "1 lb elbow macaroni",
      "4 tbsp butter",
      "1/4 cup all-purpose flour",
      "3 cups milk",
      "2 cups sharp cheddar cheese, shredded",
      "1 cup Gruyère cheese, shredded",
      "1/2 tsp mustard powder",
      "1/4 tsp cayenne pepper",
      "1/4 tsp nutmeg",
      "1/2 cup breadcrumbs",
      "2 tbsp butter, melted",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Preheat oven to 350°F",
      "Cook macaroni according to package directions, drain",
      "In a large saucepan, melt butter over medium heat",
      "Add flour and whisk for 1 minute to make a roux",
      "Gradually whisk in milk and bring to a simmer",
      "Cook until sauce thickens, about 5 minutes",
      "Remove from heat and stir in cheeses, mustard powder, cayenne, and nutmeg",
      "Season with salt and pepper",
      "Fold in cooked macaroni",
      "Transfer to a baking dish",
      "Mix breadcrumbs with melted butter and sprinkle over top",
      "Bake for 25 minutes until bubbly and golden"
    ],
    calories: 480,
    protein: 22,
    fat: 25,
    carbs: 42
  }
];
