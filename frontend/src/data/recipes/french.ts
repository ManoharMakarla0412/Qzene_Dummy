
import { Recipe } from '@/types';

export const frenchRecipes: Recipe[] = [
  {
    id: "15",
    name: "Coq au Vin",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cuisine: "French",
    cookingTime: 90,
    servings: 6,
    difficulty: "Hard",
    rating: 4.9,
    deviceSupport: "Both",
    featured: true,
    chefCreated: true,
    ingredients: [
      "3 lbs chicken pieces",
      "4 oz bacon, diced",
      "1 bottle red wine (preferably Burgundy)",
      "2 cups chicken stock",
      "1 onion, chopped",
      "2 carrots, chopped",
      "8 oz mushrooms, quartered",
      "3 cloves garlic, minced",
      "2 tbsp tomato paste",
      "1 bouquet garni (thyme, parsley, bay leaf)",
      "2 tbsp butter",
      "2 tbsp flour",
      "Fresh parsley for garnish"
    ],
    instructions: [
      "In a large Dutch oven, cook bacon until crispy, remove and set aside",
      "Brown chicken pieces in bacon fat, remove and set aside",
      "Sauté onions, carrots, and garlic until soft",
      "Add tomato paste and cook for 1 minute",
      "Deglaze with red wine, scraping up browned bits",
      "Return chicken and bacon to the pot, add stock and bouquet garni",
      "Cover and simmer for 1 hour or until chicken is tender",
      "In a separate pan, sauté mushrooms in butter",
      "Make a beurre manié with butter and flour, add to stew to thicken",
      "Add mushrooms, simmer for 10 more minutes",
      "Garnish with fresh parsley and serve with mashed potatoes"
    ],
    calories: 620,
    protein: 45,
    fat: 35,
    carbs: 18
  },
  {
    id: "16",
    name: "Ratatouille",
    image: "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cuisine: "French",
    cookingTime: 60,
    servings: 6,
    difficulty: "Medium",
    rating: 4.6,
    deviceSupport: "MoMe",
    ingredients: [
      "1 eggplant, cubed",
      "2 zucchini, cubed",
      "1 red bell pepper, cubed",
      "1 yellow bell pepper, cubed",
      "1 onion, chopped",
      "3 tomatoes, chopped",
      "3 cloves garlic, minced",
      "1/4 cup olive oil",
      "2 tbsp fresh thyme",
      "2 tbsp fresh basil, chopped",
      "1 bay leaf",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Preheat oven to 375°F",
      "Toss eggplant and zucchini with olive oil, salt, and pepper",
      "Roast for 20 minutes until golden",
      "In a large pot, sauté onions and bell peppers until soft",
      "Add garlic and cook for 1 minute",
      "Add tomatoes, thyme, bay leaf, and roasted vegetables",
      "Simmer for 30 minutes until vegetables are tender",
      "Stir in fresh basil and adjust seasoning",
      "Serve hot or at room temperature"
    ],
    calories: 180,
    protein: 4,
    fat: 12,
    carbs: 16
  }
];
