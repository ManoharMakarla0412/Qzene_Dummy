
import { Recipe } from '@/types';

export const mexicanRecipes: Recipe[] = [
  {
    id: "6",
    name: "Beef Tacos",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cuisine: "Mexican",
    cookingTime: 30,
    servings: 4,
    difficulty: "Easy",
    rating: 4.7,
    deviceSupport: "None",
    ingredients: [
      "1 lb ground beef",
      "8 taco shells",
      "1 packet taco seasoning",
      "1 cup shredded lettuce",
      "1 cup diced tomatoes",
      "1 cup shredded cheese",
      "1/2 cup sour cream",
      "1/4 cup chopped cilantro",
      "1 avocado, sliced",
      "1 lime, cut into wedges"
    ],
    instructions: [
      "Brown ground beef in a skillet, drain excess fat",
      "Add taco seasoning and water, simmer until thickened",
      "Warm taco shells in the oven",
      "Assemble tacos with beef, lettuce, tomatoes, cheese, and sour cream",
      "Garnish with cilantro, avocado slices, and lime wedges"
    ],
    calories: 380,
    protein: 24,
    fat: 26,
    carbs: 18
  },
  {
    id: "7",
    name: "Chicken Enchiladas",
    image: "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cuisine: "Mexican",
    cookingTime: 45,
    servings: 4,
    difficulty: "Medium",
    rating: 4.6,
    deviceSupport: "Both",
    featured: true,
    ingredients: [
      "2 cups shredded cooked chicken",
      "8 flour tortillas",
      "2 cups enchilada sauce",
      "2 cups shredded cheese",
      "1 onion, diced",
      "1 bell pepper, diced",
      "2 cloves garlic, minced",
      "1 tsp cumin",
      "1 tsp chili powder",
      "1/4 cup chopped cilantro",
      "Sour cream for serving"
    ],
    instructions: [
      "Preheat oven to 350°F",
      "Sauté onions, bell peppers, and garlic until soft",
      "Add chicken, cumin, and chili powder, mix well",
      "Warm tortillas, fill with chicken mixture, and roll up",
      "Place in a baking dish, pour enchilada sauce over top",
      "Sprinkle with cheese and bake for 20-25 minutes until bubbly",
      "Garnish with cilantro and serve with sour cream"
    ],
    calories: 420,
    protein: 28,
    fat: 22,
    carbs: 30
  },
  {
    id: "8",
    name: "Guacamole",
    image: "https://images.unsplash.com/photo-1600803907087-f56d462fd26b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cuisine: "Mexican",
    cookingTime: 15,
    servings: 4,
    difficulty: "Easy",
    rating: 4.9,
    deviceSupport: "None",
    chefCreated: true,
    ingredients: [
      "3 ripe avocados",
      "1/2 red onion, finely diced",
      "1 jalapeño, seeded and minced",
      "2 tbsp fresh lime juice",
      "1/4 cup chopped cilantro",
      "1 tomato, diced",
      "2 cloves garlic, minced",
      "1/2 tsp cumin",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Cut avocados in half, remove pit, and scoop into a bowl",
      "Mash avocados to desired consistency",
      "Add onion, jalapeño, lime juice, cilantro, tomato, and garlic",
      "Season with cumin, salt, and pepper",
      "Mix gently and serve with tortilla chips"
    ],
    calories: 180,
    protein: 2,
    fat: 16,
    carbs: 10
  },
  // Adding more Mexican recipes for variety
  {
    id: "26",
    name: "Chiles Rellenos",
    image: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cuisine: "Mexican",
    cookingTime: 50,
    servings: 4,
    difficulty: "Medium",
    rating: 4.6,
    deviceSupport: "None",
    ingredients: [
      "8 large poblano peppers",
      "2 cups shredded cheese (Monterey Jack or queso fresco)",
      "4 eggs, separated",
      "1/4 cup flour",
      "2 cups tomato sauce",
      "1 onion, chopped",
      "2 cloves garlic, minced",
      "1 tsp oregano",
      "1/2 tsp cumin",
      "Oil for frying",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Roast poblanos until skin blisters, place in plastic bag to steam",
      "Peel skins, make a slit, and remove seeds carefully",
      "Stuff peppers with cheese and close with toothpicks",
      "Beat egg whites until stiff peaks form",
      "Fold in egg yolks, salt, and pepper",
      "Dust peppers with flour, dip in egg batter",
      "Fry in hot oil until golden brown, drain on paper towels",
      "For sauce, sauté onions and garlic, add tomato sauce and spices",
      "Simmer sauce for 10 minutes, pour over chiles",
      "Serve hot with rice and beans"
    ],
    calories: 320,
    protein: 16,
    fat: 22,
    carbs: 18
  }
];
