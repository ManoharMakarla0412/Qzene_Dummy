
import { Instruction, PreparationItem, RecipeIngredient, Utensil } from "@/types/recipeCreation";
import { ReactNode } from "react";
import PreviewStep from "./PreviewStep";

interface InstructionsPreviewProps {
  instructions: Instruction[];
  ingredients?: RecipeIngredient[];
  utensils?: Utensil[];
  preparationItems?: PreparationItem[];
  renderActionIcon?: (iconName: string) => ReactNode;
}

const InstructionsPreview = ({ 
  instructions, 
  ingredients = [], 
  utensils = [], 
  preparationItems = [],
  renderActionIcon = () => null 
}: InstructionsPreviewProps) => {
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-medium mb-4">Cooking Steps</h2>
      
      <div className="space-y-6">
        {instructions.map((instruction, index) => (
          <PreviewStep 
            key={instruction.id}
            instruction={instruction}
            index={index}
            renderIcon={renderActionIcon}
          />
        ))}
        
        {instructions.length === 0 && (
          <div className="text-gray-500 italic">
            No cooking steps added yet. Start by adding instructions.
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructionsPreview;
