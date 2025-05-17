
import { Ingredient } from "@/types/mealPlanner";
import { X } from "lucide-react";

interface ContainerIngredientProps {
  ingredient: Ingredient;
  onDragStart: (e: React.DragEvent, ingredient: Ingredient, source: "ingredient-list" | "container", containerId?: number) => void;
  onRemove: (ingredientId: string) => void;
  containerId: number;
}

const ContainerIngredient = ({ ingredient, onDragStart, onRemove, containerId }: ContainerIngredientProps) => {
  // Make sure ingredient is valid before rendering
  if (!ingredient || !ingredient.name) {
    console.error("Invalid ingredient in ContainerIngredient:", ingredient);
    return null; // Return null if ingredient or ingredient.name is undefined/null
  }

  return (
    <div 
      className="bg-white border rounded-lg px-3 py-2 flex items-center space-x-2 shadow-sm hover:shadow-md transition-shadow"
      draggable
      onDragStart={(e) => onDragStart(e, ingredient, "container", containerId)}
    >
      <img 
        src={`https://source.unsplash.com/100x100/?${encodeURIComponent(ingredient.name.toLowerCase())},food`} 
        alt={ingredient.name} 
        className="w-6 h-6 object-contain rounded-sm"
        onError={(e) => {
          // Fallback in case the image fails to load
          e.currentTarget.src = `https://via.placeholder.com/100?text=${encodeURIComponent(ingredient.name)}`;
        }}
      />
      <span>{ingredient.name}</span>
      <span className="text-sm text-gray-500">{ingredient.weight}g</span>
      <button 
        className="text-gray-400 hover:text-red-500 transition-colors"
        onClick={() => onRemove(ingredient.id)}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ContainerIngredient;
