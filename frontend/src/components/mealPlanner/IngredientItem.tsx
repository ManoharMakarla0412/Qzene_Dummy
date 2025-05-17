
import { Ingredient } from "@/types/mealPlanner";
import { X } from "lucide-react";

interface IngredientItemProps {
  ingredient: Ingredient;
  onDragStart: (e: React.DragEvent, ingredient: Ingredient, source: "ingredient-list" | "container", containerId?: number) => void;
  source: "ingredient-list" | "container";
  containerId?: number;
  onRemove?: (id: string) => void;
}

const IngredientItem = ({ 
  ingredient, 
  onDragStart, 
  source, 
  containerId,
  onRemove 
}: IngredientItemProps) => {
  return (
    <div 
      className={`${source === "ingredient-list" ? 'bg-white p-2 rounded-lg shadow-sm flex flex-col items-center text-center cursor-grab' : 'bg-white border rounded-lg p-2 flex items-center gap-2 group relative'}`}
      draggable
      onDragStart={(e) => onDragStart(e, ingredient, source, containerId)}
    >
      {source === "ingredient-list" ? (
        <>
          <div className="w-16 h-16 flex items-center justify-center mb-1">
            <img 
              src={`https://source.unsplash.com/100x100/?${encodeURIComponent(ingredient.name.toLowerCase())},food`} 
              alt={ingredient.name}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png";
              }}
            />
          </div>
          <span className="text-sm">{ingredient.name}</span>
        </>
      ) : (
        <>
          <div className="w-8 h-8 flex-shrink-0">
            <img 
              src={`https://source.unsplash.com/100x100/?${encodeURIComponent(ingredient.name.toLowerCase())},food`} 
              alt={ingredient.name}
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.currentTarget.src = "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png";
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{ingredient.name}</span>
            {ingredient.weight && (
              <div className="flex items-center">
                <input 
                  type="number" 
                  className="w-12 h-6 border rounded text-xs text-center" 
                  value={ingredient.weight || 0}
                  min="1"
                  readOnly
                />
                <span className="text-xs ml-1">g</span>
              </div>
            )}
          </div>
          {onRemove && (
            <button 
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onRemove(ingredient.id)}
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default IngredientItem;
