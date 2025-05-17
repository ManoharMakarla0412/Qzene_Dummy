
import { Container, Ingredient } from "@/types/mealPlanner";
import FoodContainer from "./FoodContainer";
import { Button } from "@/components/ui/button";
import { Play, Utensils } from "lucide-react";

interface ContainersPanelProps {
  containers: Container[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, containerId: number) => void;
  onRemoveIngredient: (containerId: number, ingredientId: string) => void;
  onDragStart: (e: React.DragEvent, ingredient: Ingredient, source: "ingredient-list" | "container", containerId?: number) => void;
  dragging: Ingredient | null;
  onStartCooking: () => void;
}

const ContainersPanel = ({ 
  containers, 
  onDragOver, 
  onDrop, 
  onRemoveIngredient, 
  onDragStart,
  dragging,
  onStartCooking
}: ContainersPanelProps) => {
  return (
    <div className="md:col-span-6 p-4 bg-white">
      <div className="grid grid-cols-1 gap-6">
        {containers.slice(0, 4).map(container => (
          <FoodContainer 
            key={container.id}
            container={container}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onRemoveIngredient={onRemoveIngredient}
            onDragStart={onDragStart}
            dragging={dragging}
          />
        ))}
      </div>
      
      <div className="mt-8 flex gap-4">
        <Button variant="outline" className="flex-1 border-blue-500 text-blue-500 hover:bg-blue-50">
          Add Pre-Preparation
        </Button>
        <Button 
          className="flex-1 bg-blue-500 hover:bg-blue-600 flex items-center justify-center gap-2"
          onClick={onStartCooking}
        >
          <Utensils className="w-4 h-4" />
          Start Cooking Instruction
        </Button>
      </div>
    </div>
  );
};

export default ContainersPanel;
