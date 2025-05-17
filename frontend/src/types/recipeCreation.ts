export interface RecipeIngredient {
  id: string;
  name: string;
  image: string;
  weight?: number;
  quantity?: number;
}

export interface Container {
  id: number;
  name: string;
  ingredients: RecipeIngredient[];
}

export interface Seasoning {
  id: string;
  name: string;
  image: string;
  count: number;
  quantity: number;
}

export interface PreparationItem {
  id: string;
  name: string;
  image: string;
}

export interface Utensil {
  id: string;
  name: string;
  image: string;
}

export interface Instruction {
  id: string;
  step: number;
  action: string;
  icon: string;
  serves: {
    [key: number]: string;  // This allows serves[1], serves[2], etc.
  };
}

export interface RecipeData {
  name: string;
  description: string;
  category: string;
  difficulty: string;
  price: number;
  cookingTime: number;
  servingSize: number;
  ingredients: RecipeIngredient[];
  containers: Container[];
  seasonings: Seasoning[];
  preparationItems: PreparationItem[];
  utensils: Utensil[];
  instructions: Instruction[];
  // New fields for basic details
  author?: string;
  cuisine?: string;
  deviceSupport?: string;
  preparationRequired?: boolean;
  imageUrl?: string | null;
  waterOil: any;
  recipeImage?: string;
}
