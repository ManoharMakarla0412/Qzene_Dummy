
export type CuisineType = 
  | 'Indian' 
  | 'Mexican' 
  | 'Italian' 
  | 'Chinese' 
  | 'Thai' 
  | 'American' 
  | 'Mediterranean' 
  | 'Japanese' 
  | 'French' 
  | 'Korean';

export type DeviceSupport = 'MoMe' | 'Simmr' | 'Both' | 'None';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export interface Recipe {
  id: string;
  name: string;
  image: string;
  cuisine: CuisineType;
  cookingTime: number;
  servings: number;
  difficulty: DifficultyLevel;
  rating: number;
  deviceSupport: DeviceSupport;
  featured?: boolean;
  chefCreated?: boolean;
  ingredients: string[];
  instructions: string[];
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}
