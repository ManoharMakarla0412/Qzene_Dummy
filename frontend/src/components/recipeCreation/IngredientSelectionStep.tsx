import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RecipeData, RecipeIngredient } from "@/types/recipeCreation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import IngredientWeightPopup from './IngredientWeightPopup';

interface IngredientSelectionStepProps {
  recipeData: RecipeData;
  updateRecipeData: (data: Partial<RecipeData>) => void;
  onNext: () => void;
  onPrev: () => void;
}
const mockIngredients = {
  ingredients: [
    { id: "pepper", name: "Pepper", image: "/images/capsicum.png" },
    { id: "radish", name: "Radish", image: "/images/mullangi.png" },
    { id: "onion", name: "Onion", image: "/images/garlic.png" },
    { id: "Cucumber", name: "Cucumber", image: "/images/cucumber.png" },
    { id: "tomato", name: "Tomato", image: "/images/tamato.png" },
    { id: "garlic", name: "Garlic", image: "/images/garlic.png" },
    { id: "ginger", name: "Ginger", image: "/images/ginger.png" },
    { id: "chilli", name: "Chilli", image: "/images/chilli.png" },
    { id: "lemon", name: "Lemon", image: "/images/lemon.png" },
    { id: "capsicum", name: "Capsicum", image: "/images/capsicum.png" },
    { id: "carrot", name: "Carrot", image: "/images/carrot.png" },
    { id: "cucumber", name: "Cucumber", image: "/images/cucumber.png" },
  ],
  containers: [
    {
      id: 1,
      name: "Container 1",
      ingredients: []
    },
    {
      id: 2, 
      name: "Container 2",
      ingredients: []
    },
    {
      id: 3,
      name: "Container 3", 
      ingredients: []
    },
    {
      id: 4,
      name: "Container 4",
      ingredients: []
    }
  ],
  seasonings: [],
  waterOilItems: [
    { id: "water", name: "Water", image: "/images/water.png" },
    { id: "oil", name: "Oil", image: "/images/oil.png" }
  ]
};

const IngredientSelectionStep = ({
  recipeData,
  updateRecipeData,
  onNext,
  onPrev
}: IngredientSelectionStepProps) => {
  const [dragging, setDragging] = useState<any>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<any>(null);
  const [targetInfo, setTargetInfo] = useState<{containerId: number, target: string} | null>(null);

  const handleDragStart = (e: React.DragEvent, ingredient: RecipeIngredient, source: string, containerId?: number) => {
    e.dataTransfer.effectAllowed = "move";
    setDragging({ ingredient, source, containerId });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, containerId: number, target: string) => {
    e.preventDefault();
    if (!dragging || !dragging.ingredient) return;

    // Instead of immediately adding the ingredient, show the popup
    setSelectedIngredient(dragging.ingredient);
    setTargetInfo({ containerId, target });
  };

  const handleWeightConfirm = (weight: number) => {
    if (!selectedIngredient || !targetInfo) return;

    const ingredientWithWeight = {
      ...selectedIngredient,
      quantity: weight
    };

    if (targetInfo.target === "containers") {
      const updatedContainers = [...recipeData.containers];
      const containerIndex = updatedContainers.findIndex(c => c.id === targetInfo.containerId);
      if (containerIndex >= 0) {
        updatedContainers[containerIndex].ingredients.push(ingredientWithWeight);
        updateRecipeData({ containers: updatedContainers });
      }
    } else if (targetInfo.target === "seasonings") {
      const updatedSeasonings = [...recipeData.seasonings, ingredientWithWeight];
      updateRecipeData({ seasonings: updatedSeasonings });
    } else if (targetInfo.target === "waterOil") {
      const updatedWaterOil = [...recipeData.waterOil, ingredientWithWeight];
      updateRecipeData({ waterOil: updatedWaterOil });
    }

    // Reset the popup state
    setSelectedIngredient(null);
    setTargetInfo(null);
  };

  const handleWeightCancel = () => {
    setSelectedIngredient(null);
    setTargetInfo(null);
  };

  useEffect(() => {
    // Only initialize ingredients list and empty containers if not already set
    if (recipeData.ingredients.length === 0) {
      updateRecipeData({ ingredients: mockIngredients.ingredients });
    }

    if (recipeData.containers.length === 0) {
      updateRecipeData({ 
        containers: mockIngredients.containers,
        seasonings: [],
        waterOil: []
      });
    }
  }, []);

  // Remove ingredient from containers, seasonings, or waterOil
  const handleRemoveIngredient = (containerId: number, ingredientId: string, target: string) => {
    if (target === "containers") {
      const updatedContainers = recipeData.containers.map(container => {
        if (container.id === containerId) {
          return {
            ...container,
            ingredients: container.ingredients.filter(ing => ing.id !== ingredientId)
          };
        }
        return container;
      });
      updateRecipeData({ containers: updatedContainers });
    } else if (target === "seasonings") {
      const updatedSeasonings = recipeData.seasonings.filter(ing => ing.id !== ingredientId);
      updateRecipeData({ seasonings: updatedSeasonings });
    } else if (target === "waterOil") {
      const updatedWaterOil = (recipeData.waterOil || []).filter(ing => ing.id !== ingredientId);
      updateRecipeData({ waterOil: updatedWaterOil });
    }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto h-[80vh] overflow-y-auto scrollbar-smooth">
      <style>
        {`
        .scrollbar-smooth::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-smooth::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .scrollbar-smooth::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .scrollbar-smooth::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .scrollbar-smooth {
          scroll-behavior: smooth;
        }
        `}
      </style>
      <div className="p-4 space-y-6">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Ingredients Panel */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="text"
                  placeholder="Search here..."
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <select className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300">
                  <option>Ingredients</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {recipeData.ingredients.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, ingredient, "ingredients")}
                    className="flex flex-col items-center space-y-1 cursor-move"
                  >
                    <img src={ingredient.image} alt={ingredient.name} className="w-12 h-12 object-contain" />
                    <span className="text-xs text-gray-600 text-center">{ingredient.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Containers Panel */}
          <div className="lg:col-span-5">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Ingredients</h3>
              {recipeData.containers.map((container) => (
                <div
                  key={container.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, container.id, "containers")}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{container.name}</span>
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
                          <p className="text-xs text-gray-500">{ingredient.quantity}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveIngredient(container.id, ingredient.id, "containers")}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  {container.ingredients.length === 0 && (
                    <div className="text-center text-gray-400 py-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-dashed border-gray-300 mb-2">
                        +
                      </span>
                      <p className="text-xs">Drop ingredients here</p>
                    </div>
                  )}
                </div>
              ))}
              <Button variant="outline" className="w-full rounded-full text-blue-600 border-blue-600">
                Add Pre-preparation
              </Button>
              <Button onClick={onNext} className="w-full rounded-full bg-blue-600 text-white">
                Start Cooking Instruction
              </Button>
            </div>
          </div>

          {/* Seasonings and Water/Oil Panel */}
          <div className="lg:col-span-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Seasonings</h3>
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 0, "seasonings")}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <div className="grid grid-cols-3 gap-2">
                  {recipeData.seasonings.map((seasoning) => (
                    <div
                      key={seasoning.id}
                      className="flex items-center space-x-2 bg-white rounded-lg p-2 shadow-sm"
                    >
                      <img src={seasoning.image} alt={seasoning.name} className="w-8 h-8 object-contain" />
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-800">{seasoning.name}</p>
                        <p className="text-xs text-gray-500">{seasoning.quantity}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveIngredient(0, seasoning.id, "seasonings")}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                {recipeData.seasonings.length < 7 && (
                  <div className="text-center text-gray-400 py-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-dashed border-gray-300 mb-2">
                      +
                    </span>
                    <p className="text-xs">Drop here</p>
                  </div>
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-800">Water & Oil</h3>
              <div className="space-y-4">
                {/* Draggable Water & Oil Items */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    {mockIngredients.waterOilItems.map((item) => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item, "waterOilItems")}
                        className="flex flex-col items-center space-y-1 cursor-move"
                      >
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                        <span className="text-xs text-gray-600 text-center">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Droppable Area */}
                <div
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 0, "waterOil")}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="grid grid-cols-2 gap-2">
                    {recipeData.waterOil?.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-2 bg-white rounded-lg p-2 shadow-sm"
                      >
                        <img src={item.image} alt={item.name} className="w-8 h-8 object-contain" />
                        <div className="flex-1">
                          <p className="text-xs font-medium text-gray-800">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.quantity} ml</p>
                        </div>
                        <button
                          onClick={() => handleRemoveIngredient(0, item.id, "waterOil")}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  {!recipeData.waterOil?.length && (
                    <div className="text-center text-gray-400 py-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-dashed border-gray-300 mb-2">
                        +
                      </span>
                      <p className="text-xs">Drop water or oil here</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedIngredient && (
        <IngredientWeightPopup
          ingredient={selectedIngredient}
          onConfirm={handleWeightConfirm}
          onCancel={handleWeightCancel}
        />
      )}
    </div>
  );
};

export default IngredientSelectionStep;