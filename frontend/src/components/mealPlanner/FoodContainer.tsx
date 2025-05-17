
import { Container, Ingredient } from "@/types/mealPlanner";
import { Plus, X } from "lucide-react";
import ContainerIngredient from "./ContainerIngredient";

interface FoodContainerProps {
  container: Container;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, containerId: number) => void;
  onRemoveIngredient: (containerId: number, ingredientId: string) => void;
  onDragStart: (e: React.DragEvent, ingredient: Ingredient, source: "ingredient-list" | "container", containerId?: number) => void;
  dragging: Ingredient | null;
}

const FoodContainer = ({ 
  container, 
  onDragOver, 
  onDrop, 
  onRemoveIngredient, 
  onDragStart, 
  dragging 
}: FoodContainerProps) => {
  // Filter out any invalid ingredients before rendering
  const validIngredients = container.ingredients.filter(ing => ing && ing.name && ing.id);
  
  return (
    <div className="relative">
      <div className="flex items-center mb-2">
        <h3 className="text-qzene-purple-dark">Container</h3>
        <div className="ml-2 w-8 h-8 rounded-full border-2 border-qzene-purple text-qzene-purple flex items-center justify-center">
          {container.id}
        </div>
      </div>
      
      <div 
        className={`border-2 rounded-lg p-4 min-h-[100px] transition-colors ${dragging ? 'border-dashed border-qzene-purple bg-qzene-purple/5' : 'border-gray-200'}`}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, container.id)}
      >
        {validIngredients.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {validIngredients.map((ingredient, idx) => (
              <ContainerIngredient
                key={`${ingredient.id}-${idx}`}
                ingredient={ingredient}
                onDragStart={onDragStart}
                onRemove={(ingredientId) => onRemoveIngredient(container.id, ingredientId)}
                containerId={container.id}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[80px] text-gray-400">
            <div className="flex flex-col items-center">
              <Plus className="w-6 h-6 mb-1" />
              <span className="text-sm">Drop ingredients here</span>
            </div>
          </div>
        )}
      </div>
      
      <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default FoodContainer;
