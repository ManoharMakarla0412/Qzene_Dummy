
export interface Ingredient {
  id: string;
  name: string;
  image: string;
  weight?: number;
}

export interface Container {
  id: number;
  name: string;
  ingredients: Ingredient[];
}

export interface SeasoningItem {
  id: string;
  name: string;
  image: string;
  count: number;
}
