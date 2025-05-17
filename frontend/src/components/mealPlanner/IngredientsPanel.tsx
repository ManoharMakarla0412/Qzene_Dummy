
import { Ingredient } from "@/types/mealPlanner";
import IngredientItem from "./IngredientItem";
import { Button } from "@/components/ui/button";

interface IngredientsPanelProps {
  ingredients: Ingredient[];
  onDragStart: (e: React.DragEvent, ingredient: Ingredient, source: "ingredient-list" | "container", containerId?: number) => void;
}

const IngredientsPanel = ({ ingredients, onDragStart }: IngredientsPanelProps) => {
  return (
    <div className="md:col-span-3 border-r bg-gray-50 p-4">
      <div className="mb-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search here..." 
            className="w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-qzene-purple/50"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-2 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div className="mb-4">
        <Button className="w-full bg-blue-500 hover:bg-blue-600">
          Ingredients <span className="ml-1">▼</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-[480px] pr-2">
        {ingredients.map(ingredient => (
          <IngredientItem 
            key={ingredient.id}
            ingredient={ingredient}
            onDragStart={onDragStart}
            source="ingredient-list"
          />
        ))}
      </div>
    </div>
  );
};

export default IngredientsPanel;
