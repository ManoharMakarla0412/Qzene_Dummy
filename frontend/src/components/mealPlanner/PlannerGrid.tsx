
import { Container, Ingredient } from "@/types/mealPlanner";
import IngredientsPanel from "./IngredientsPanel";
import ContainersPanel from "./ContainersPanel";
import SeasoningsPanel from "./SeasoningsPanel";

interface PlannerGridProps {
  ingredients: Ingredient[];
  containers: Container[];
  seasonings: any[];
  dragging: Ingredient | null;
  onDragStart: (e: React.DragEvent, ingredient: Ingredient, source: "ingredient-list" | "container", containerId?: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, containerId: number) => void;
  onRemoveIngredient: (containerId: number, ingredientId: string) => void;
  onStartCooking: () => void;
}

const PlannerGrid = ({ 
  ingredients, 
  containers, 
  seasonings, 
  dragging, 
  onDragStart, 
  onDragOver, 
  onDrop, 
  onRemoveIngredient, 
  onStartCooking 
}: PlannerGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
      <IngredientsPanel ingredients={ingredients} onDragStart={onDragStart} />
      <ContainersPanel 
        containers={containers} 
        onDragOver={onDragOver} 
        onDrop={onDrop} 
        onRemoveIngredient={onRemoveIngredient} 
        onDragStart={onDragStart}
        dragging={dragging}
        onStartCooking={onStartCooking}
      />
      <SeasoningsPanel seasonings={seasonings} onDragStart={onDragStart} />
    </div>
  );
};

export default PlannerGrid;
