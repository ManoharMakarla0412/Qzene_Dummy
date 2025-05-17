
import { Recipe } from '@/types';

export const mediterraneanRecipes: Recipe[] = [
  {
    id: "31",
    name: "Greek Salad",
    image: "https://images.unsplash.com/photo-1561043433-aaf687c4cf04?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cuisine: "Mediterranean",
    cookingTime: 15,
    servings: 4,
    difficulty: "Easy",
    rating: 4.6,
    deviceSupport: "None",
    ingredients: [
      "1 large cucumber, diced",
      "4 roma tomatoes, diced",
      "1 red onion, thinly sliced",
      "1 green bell pepper, diced",
      "1 cup kalamata olives",
      "8 oz feta cheese, cubed",
      "2 tbsp fresh oregano",
      "1/4 cup extra virgin olive oil",
      "2 tbsp red wine vinegar",
      "1 tsp dried oregano",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Combine cucumber, tomatoes, onion, bell pepper, and olives in a large bowl",
      "Whisk together olive oil, vinegar, dried oregano, salt, and pepper",
      "Pour dressing over vegetables and toss gently",
      "Top with feta cheese and fresh oregano",
      "Serve chilled with warm pita bread"
    ],
    calories: 260,
    protein: 8,
    fat: 22,
    carbs: 12
  },
  {
    id: "32",
    name: "Hummus",
    image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cuisine: "Mediterranean",
    cookingTime: 10,
    servings: 6,
    difficulty: "Easy",
    rating: 4.7,
    deviceSupport: "None",
    chefCreated: true,
    ingredients: [
      "2 cans (15 oz each) chickpeas, drained and rinsed",
      "1/4 cup fresh lemon juice",
      "1/4 cup tahini",
      "2 cloves garlic, minced",
      "2 tbsp olive oil, plus more for serving",
      "1/2 tsp ground cumin",
      "2-3 tbsp water",
      "Paprika for garnish",
      "Fresh parsley, chopped",
      "Salt to taste"
    ],
    instructions: [
      "In a food processor, combine chickpeas, lemon juice, tahini, garlic, and cumin",
      "Process until smooth, adding water as needed for desired consistency",
      "Season with salt to taste",
      "Transfer to a serving bowl",
      "Drizzle with olive oil and sprinkle with paprika and parsley",
      "Serve with pita bread or vegetable sticks"
    ],
    calories: 180,
    protein: 6,
    fat: 11,
    carbs: 16
  }
];
