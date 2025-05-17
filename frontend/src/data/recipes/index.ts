
import { Recipe, CuisineType, DeviceSupport } from '@/types';
import { indianRecipes } from './indian';
import { mexicanRecipes } from './mexican';
import { italianRecipes } from './italian';
import { chineseRecipes } from './chinese';
import { thaiRecipes } from './thai';
import { americanRecipes } from './american';
import { mediterraneanRecipes } from './mediterranean';
import { japaneseRecipes } from './japanese';
import { frenchRecipes } from './french';
import { koreanRecipes } from './korean';

// Combine all recipes into a single array
export const recipes: Recipe[] = [
  ...indianRecipes,
  ...mexicanRecipes,
  ...italianRecipes,
  ...chineseRecipes,
  ...thaiRecipes,
  ...americanRecipes,
  ...mediterraneanRecipes,
  ...japaneseRecipes,
  ...frenchRecipes,
  ...koreanRecipes,
];

export const cuisines: CuisineType[] = [
  'Indian', 
  'Mexican', 
  'Italian', 
  'Chinese', 
  'Thai', 
  'American', 
  'Mediterranean', 
  'Japanese', 
  'French', 
  'Korean'
];

// Helper functions to filter recipes
export const getFeaturedRecipes = () => {
  // Get truly unique featured recipes
  return recipes.filter(recipe => recipe.featured);
};

export const getChefCreatedRecipes = () => {
  return recipes.filter(recipe => recipe.chefCreated);
};

export const getRecipesByCuisine = (cuisine: CuisineType) => {
  return recipes.filter(recipe => recipe.cuisine === cuisine);
};

export const getRecipesByDevice = (device: DeviceSupport) => {
  if (device === 'Both') {
    return recipes.filter(recipe => recipe.deviceSupport === 'Both');
  }
  return recipes.filter(recipe => 
    recipe.deviceSupport === device || 
    recipe.deviceSupport === 'Both'
  );
};
