
import { Recipe } from '@/types';

export const koreanRecipes: Recipe[] = [
  {
    id: "33",
    name: "Bibimbap",
    image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cuisine: "Korean",
    cookingTime: 45,
    servings: 4,
    difficulty: "Medium",
    rating: 4.8,
    deviceSupport: "None",
    featured: true,
    ingredients: [
      "4 cups cooked short-grain rice",
      "1 lb beef sirloin, thinly sliced",
      "2 cups spinach",
      "1 cup bean sprouts",
      "1 carrot, julienned",
      "1 zucchini, julienned",
      "4 eggs",
      "4 tbsp gochujang (Korean chili paste)",
      "3 tbsp soy sauce",
      "2 tbsp sesame oil",
      "2 tbsp sugar",
      "2 cloves garlic, minced",
      "2 tbsp toasted sesame seeds",
      "Vegetable oil for cooking"
    ],
    instructions: [
      "Marinate beef in soy sauce, 1 tbsp sesame oil, sugar, and garlic for 30 minutes",
      "Blanch spinach for 30 seconds, drain, and season with salt and sesame oil",
      "Blanch bean sprouts for 2 minutes, drain, and season with salt and sesame oil",
      "Sauté carrot and zucchini separately until tender-crisp",
      "Cook marinated beef until no longer pink",
      "Fry eggs sunny-side up",
      "Divide hot rice among four bowls",
      "Arrange beef and vegetables on top of rice",
      "Place fried egg on top",
      "Serve with gochujang on the side for mixing in"
    ],
    calories: 520,
    protein: 32,
    fat: 22,
    carbs: 52
  },
  {
    id: "34",
    name: "Kimchi Jjigae",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    cuisine: "Korean",
    cookingTime: 35,
    servings: 4,
    difficulty: "Medium",
    rating: 4.7,
    deviceSupport: "Simmr",
    ingredients: [
      "2 cups kimchi, chopped",
      "1/2 cup kimchi juice",
      "1/2 lb pork belly, sliced",
      "1 block tofu, cubed",
      "1 onion, sliced",
      "2 green onions, chopped",
      "2 cloves garlic, minced",
      "1 tbsp gochugaru (Korean red pepper flakes)",
      "1 tbsp gochujang (Korean chili paste)",
      "1 tsp sugar",
      "4 cups anchovy stock or water",
      "1 tbsp vegetable oil"
    ],
    instructions: [
      "Heat oil in a pot and sauté pork belly until slightly crisp",
      "Add kimchi and onion, sauté for 5 minutes",
      "Add garlic, gochugaru, gochujang, and sugar, cook for 1 minute",
      "Pour in kimchi juice and anchovy stock, bring to a boil",
      "Simmer for 20 minutes until flavors meld",
      "Add tofu and simmer for 5 more minutes",
      "Garnish with green onions and serve with rice"
    ],
    calories: 380,
    protein: 22,
    fat: 28,
    carbs: 14
  }
];
