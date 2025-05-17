import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RecipeData, Instruction } from "@/types/recipeCreation";
import { ArrowLeft, CheckCircle } from "lucide-react";
import SubmitRecipePopup from './SubmitRecipePopup';

interface CookingInstructionsStepProps {
  recipeData: RecipeData;
  updateRecipeData: (data: Partial<RecipeData>) => void;
  onPrev: () => void;
  onSave: () => void;
  isSaving: boolean;
}

const CookingInstructionsStep = ({
  recipeData,
  updateRecipeData,
  onPrev,
  onSave,
  isSaving
}: CookingInstructionsStepProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [instructions, setInstructions] = useState<Instruction[]>(recipeData.instructions || []);

  useEffect(() => {
    if (recipeData.instructions.length === 0) {
      const sampleInstructions: Instruction[] = [
        { 
          id: "inst-1", 
          step: 1, 
          action: "Induction On", 
          icon: "/images/induction-on.png", 
          serves: { 1: "ON", 2: "ON", 3: "ON", 4: "ON" } 
        },
        { 
          id: "inst-2", 
          step: 2, 
          action: "Lid Open", 
          icon: "/images/lid-open.png", 
          serves: { 1: "Open", 2: "Open", 3: "Open", 4: "Open" } 
        },
        { 
          id: "inst-3", 
          step: 3, 
          action: "Decrease the Temp", 
          icon: "/images/decrease_temprature.png", 
          serves: { 1: "300 W", 2: "350 W", 3: "420 W", 4: "450 W" } 
        },
        { 
          id: "inst-4", 
          step: 4, 
          action: "Pump Oil", 
          icon: "/images/oil.png", 
          serves: { 1: "100 ml", 2: "120 ml", 3: "140 ml", 4: "150 ml" } 
        },
        { 
          id: "inst-5", 
          step: 5, 
          action: "Drop Container 6", 
          icon: "/images/container1 .png", 
          serves: { 1: "10 g", 2: "14 g", 3: "16 g", 4: "18 g" } 
        },
        { 
          id: "inst-6", 
          step: 6, 
          action: "Drop Container 7", 
          icon: "/images/container1.png", 
          serves: { 1: "5 g", 2: "6 g", 3: "8 g", 4: "10 g" } 
        },
        { 
          id: "inst-7", 
          step: 7, 
          action: "Drop Container 8", 
          icon: "/images/container1.png", 
          serves: { 1: "4 g", 2: "5 g", 3: "7 g", 4: "9 g" } 
        },
        { 
          id: "inst-8", 
          step: 8, 
          action: "Drop Ingredient Container", 
          icon: "container1.png", 
          serves: { 1: "Drop Container 1", 2: "Drop Container 1", 3: "Drop Container 1", 4: "Drop Container 1" } 
        },
        { 
          id: "inst-9", 
          step: 9, 
          action: "Decrease the Temp", 
          icon: "/images/decrease_temprature.png", 
          serves: { 1: "150 W", 2: "250 W", 3: "320 W", 4: "380 W" } 
        },
      ];
      updateRecipeData({ instructions: sampleInstructions });
      setInstructions(sampleInstructions);
    }
  }, [recipeData.instructions, updateRecipeData]);

  const handleSubmit = async (formData: { name: string; cuisine: string; author: string; recipeImage: string }) => {
    try {
      updateRecipeData({
        name: formData.name,
        cuisine: formData.cuisine,
        author: formData.author,
        recipeImage: formData.recipeImage
      });
      setIsPopupOpen(false);
      await onSave();
    } catch (error) {
      console.error('Error submitting recipe:', error);
      // Handle error (show toast, etc.)
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
        <div className="flex flex-row justify-right">
          <div>
          <Button 
            onClick={() => setIsPopupOpen(true)} 
            className="rounded-full bg-blue-600 text-white"
            disabled={isSaving}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Continue
          </Button>

          <SubmitRecipePopup
            isOpen={isPopupOpen}
            onSubmit={handleSubmit}
            onCancel={() => setIsPopupOpen(false)}
          />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-[#35A2E2] text-white">
                <th className="text-left p-2 text-lg font-semibold ">Instruction</th>
                <th className="text-center p-2 text-lg font-semibold ">Serve 1</th>
                <th className="text-center p-2 text-lg font-semibold ">Serve 2</th>
                <th className="text-center p-2 text-lg font-semibold ">Serve 3</th>
                <th className="text-center p-2 text-lg font-semibold ">Serve 4</th>
              </tr>
            </thead>
            <tbody>
              {instructions.map((instruction) => (
                <tr key={instruction.id} className="border-b">
                  <td className="p-2 flex items-center space-x-2">
                    <img src={instruction.icon} alt={instruction.action} className="w-8 h-8 object-contain" />
                    <span className="text-sm font-medium text-gray-700">{instruction.action}</span>
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                      {instruction.step}
                    </span>
                  </td>
                  <td className="text-center p-2 text-sm text-gray-700">{instruction.serves[1]}</td>
                  <td className="text-center p-2 text-sm text-gray-700">{instruction.serves[2]}</td>
                  <td className="text-center p-2 text-sm text-gray-700">{instruction.serves[3]}</td>
                  <td className="text-center p-2 text-sm text-gray-700">{instruction.serves[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CookingInstructionsStep;