import React from "react";
import { Button } from "@/components/ui/button";
import { RecipeData } from "@/types/recipeCreation";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface IngredientsServeStepProps {
  recipeData: RecipeData;
  updateRecipeData: (data: Partial<RecipeData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const IngredientsServeStep = ({
  recipeData,
  updateRecipeData,
  onNext,
  onPrev
}: IngredientsServeStepProps) => {
  // Calculate servings for different portions
  const calculateServing = (quantity: number, serveNumber: number) => {
    const baseServing = 4; // Base serving size
    return Math.round((quantity * serveNumber) / baseServing);
  };

  const renderIngredientRow = (ingredient: any, index: number) => (
    <tr key={ingredient.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
      <td className="px-4 py-3 flex items-center gap-2">
        <img 
          src={ingredient.image} 
          alt={ingredient.name} 
          className="w-8 h-8 object-contain"
        />
        {ingredient.name}
      </td>
      <td className="px-4 py-3 text-center">{`${calculateServing(ingredient.quantity, 1)}g`}</td>
      <td className="px-4 py-3 text-center">{`${calculateServing(ingredient.quantity, 2)}g`}</td>
      <td className="px-4 py-3 text-center">{`${calculateServing(ingredient.quantity, 3)}g`}</td>
      <td className="px-4 py-3 text-center">{`${ingredient.quantity}g`}</td>
    </tr>
  );

  // Get all ingredients from containers
  const getAllIngredients = () => {
    const containerIngredients = recipeData.containers.flatMap(container => 
      container.ingredients.map(ing => ({
        ...ing,
        containerId: container.id,
        containerName: container.name
      }))
    );

    return containerIngredients;
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto">
      <div className="rounded-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#35A2E2] text-white">
                <th className="px-4 py-3 text-left">Container</th>
                <th className="px-4 py-3 text-center">Serve 1</th>
                <th className="px-4 py-3 text-center">Serve 2</th>
                <th className="px-4 py-3 text-center">Serve 3</th>
                <th className="px-4 py-3 text-center">Serve 4</th>
              </tr>
            </thead>
            <tbody>
              {getAllIngredients().map((ingredient, index) => 
                renderIngredientRow(ingredient, index)
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button 
            onClick={onPrev} 
            variant="outline" 
            className="rounded-full text-blue-600 border-blue-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button 
            onClick={onNext}
            className="rounded-full bg-blue-600 text-white"
          >
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IngredientsServeStep;