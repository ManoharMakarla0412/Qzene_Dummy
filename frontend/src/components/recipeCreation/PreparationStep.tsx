import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RecipeData, RecipeIngredient } from "@/types/recipeCreation";
import { ArrowLeft, ArrowRight, Grip } from "lucide-react";

interface PreparationStepProps {
  recipeData: RecipeData;
  updateRecipeData: (data: Partial<RecipeData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

interface DragItem {
  type: 'action' | 'container';
  item: any;
}

const preparationItems = [
  { id: "induction-on", name: "Induction On", image: "/images/induction-on.png", type: "action" },
  { id: "lid-open", name: "Lid Open", image: "/images/lid-open.png", type: "action" },
  { id: "pump-oil", name: "Pump Oil", image: "/images/pump-oil.png", type: "action" },
  { id: "wait", name: "Wait", image: "/images/wait.png", type: "action" },
  { id: "pump-water", name: "Pump Water", image: "/images/water.png", type: "action" },
  { id: "stir", name: "Stir", image: "/images/stir.png", type: "action" },
];

const PreparationStep = ({
  recipeData,
  updateRecipeData,
  onNext,
  onPrev
}: PreparationStepProps) => {
  const [dragging, setDragging] = useState<DragItem | null>(null);
  const [instructions, setInstructions] = useState<any[]>(recipeData.preparationItems || []);

  const handleDragStart = (e: React.DragEvent, item: any, type: 'action' | 'container') => {
    e.dataTransfer.effectAllowed = "move";
    setDragging({ type, item });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!dragging) return;

    const newInstruction = {
      ...dragging.item,
      id: `${dragging.item.id}-${Date.now()}`, // Ensure unique IDs
      type: dragging.type
    };

    const updatedInstructions = [...instructions, newInstruction];
    setInstructions(updatedInstructions);
    updateRecipeData({ preparationItems: updatedInstructions });
    setDragging(null);
  };

  const handleRemoveInstruction = (id: string) => {
    const updatedInstructions = instructions.filter(item => item.id !== id);
    setInstructions(updatedInstructions);
    updateRecipeData({ preparationItems: updatedInstructions });
  };

  const handleReset = () => {
    setInstructions([]);
    updateRecipeData({ preparationItems: [] });
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto h-[80vh] overflow-y-auto scrollbar-smooth">
      <div className="p-4 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Preparation Actions Panel */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions</h3>
              <div className="grid grid-cols-3 gap-4">
                {preparationItems.map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item, 'action')}
                    className="flex flex-col items-center space-y-1 cursor-move"
                  >
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                    <span className="text-xs text-gray-600 text-center">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructions Panel */}
          <div className="lg:col-span-5">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Instructions</h3>
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 min-h-[500px]"
              >
                <div className="space-y-2">
                  {instructions.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-2 bg-white rounded-lg p-2 shadow-sm"
                    >
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                        {index + 1}
                      </span>
                      {item.type === 'container' ? (
                        <div className="flex-1 flex items-center space-x-2">
                          <span className="text-sm font-medium">{item.name}</span>
                          <div className="grid grid-cols-3 gap-2">
                            {item.ingredients.map((ing: any) => (
                              <img 
                                key={ing.id} 
                                src={ing.image} 
                                alt={ing.name} 
                                className="w-8 h-8 object-contain"
                                title={`${ing.name} - ${ing.quantity}g`}
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <img src={item.image} alt={item.name} className="w-8 h-8 object-contain" />
                          <span className="text-sm">{item.name}</span>
                        </div>
                      )}
                      <button
                        onClick={() => handleRemoveInstruction(item.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {instructions.length === 0 && (
                    <div className="text-center text-gray-400 py-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-dashed border-gray-300 mb-2">
                        +
                      </span>
                      <p className="text-xs">Drop actions or containers here</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleReset} variant="outline" className="w-full rounded-full text-blue-600 border-blue-600">
                  Reset
                </Button>
                <Button onClick={onPrev} variant="outline" className="w-full rounded-full text-blue-600 border-blue-600">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                </Button>
                <Button onClick={onNext} className="w-full rounded-full bg-blue-600 text-white">
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Containers Panel */}
          <div className="lg:col-span-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Containers</h3>
              {recipeData.containers.map((container) => (
                <div
                  key={container.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, container, 'container')}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200 cursor-move hover:border-blue-400 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Grip className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">{container.name}</span>
                    </div>
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                      {container.id}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {container.ingredients.map((ingredient) => (
                      <div
                        key={ingredient.id}
                        className="flex items-center space-x-2 bg-white rounded-lg p-2 shadow-sm"
                      >
                        <img src={ingredient.image} alt={ingredient.name} className="w-8 h-8 object-contain" />
                        <div className="flex-1">
                          <p className="text-xs font-medium text-gray-800">{ingredient.name}</p>
                          <p className="text-xs text-gray-500">{ingredient.quantity}g</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreparationStep;