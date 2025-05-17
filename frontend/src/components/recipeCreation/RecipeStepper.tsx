import { useState, useEffect } from "react";
import { RecipeData } from "@/types/recipeCreation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BasicDetailsStep from "@/components/recipeCreation/BasicDetailsStep";
import IngredientSelectionStep from "@/components/recipeCreation/IngredientSelectionStep";
import PreparationStep from "@/components/recipeCreation/PreparationStep";
import CookingInstructionsStep from "@/components/recipeCreation/CookingInstructionsStep";
import IngredientsServeStep from "@/components/recipeCreation/IngredientsServeStep";
import { API_URL } from "@/lib/constants";


interface RecipeStepperProps {
  initialRecipeId: string | null;
  initialRecipeData: RecipeData;
}

const RecipeStepper = ({ initialRecipeId, initialRecipeData }: RecipeStepperProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [recipeData, setRecipeData] = useState<RecipeData>(initialRecipeData);
  const [loading, setLoading] = useState(false);
  const [savedRecipeId, setSavedRecipeId] = useState<string | null>(initialRecipeId);

  const updateRecipeData = (newData: Partial<RecipeData>) => {
    setRecipeData(prev => ({
      ...prev,
      ...newData
    }));
  };

  const handleBasicDetailsNext = async () => {
    try {
      setLoading(true);

      if (!recipeData.name || recipeData.name.trim() === "") {
        toast({
          title: "Name required",
          description: "Please provide a name for your recipe",
          variant: "destructive"
        });
        return;
      }

      const response = await fetch(`${API_URL}/api/recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSavedRecipeId(result.data._id);
        setCurrentStep(2);
        toast({
          title: "Success",
          description: "Recipe details saved successfully"
        });
      } else {
        throw new Error(result.error || 'Failed to save recipe details');
      }
    } catch (error) {
      console.error("Error saving basic details:", error);
      toast({
        title: "Error",
        description: "Failed to save recipe details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleBackNavigation = () => {
    if (currentStep === 1) {
      // If on first step, confirm before leaving
      const confirmLeave = window.confirm("Are you sure you want to leave? Any unsaved changes will be lost.");
      if (confirmLeave) {
        navigate("/admin");
      }
    } else {
      // If not on first step, go back one step
      handlePrevStep();
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const url = savedRecipeId 
        ? `${API_URL}/api/recipes/${savedRecipeId}`
        : `${API_URL}/api/recipes`;

      const response = await fetch(url, {
        method: savedRecipeId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...recipeData,
          // Include all required data from all steps
          containers: recipeData.containers,
          seasonings: recipeData.seasonings,
          preparationItems: recipeData.preparationItems,
          instructions: recipeData.instructions,
          waterOil: recipeData.waterOil
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Success",
          description: "Recipe saved successfully"
        });
        
        setTimeout(() => {
          navigate("/admin");
        }, 1500);
      } else {
        throw new Error(result.error || 'Failed to save recipe');
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
      toast({
        title: "Error",
        description: "Failed to save recipe",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Add an effect to warn user before leaving the page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (currentStep > 1) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentStep]);

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBackNavigation}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-semibold">{recipeData.name || "New Recipe"}</h1>
        <div className="ml-4 text-sm text-gray-500">
          Step {currentStep} of 5
        </div>
      </div>

      {currentStep === 1 && (
        <BasicDetailsStep
          recipeData={recipeData}
          updateRecipeData={updateRecipeData}
          onNext={handleBasicDetailsNext}
        />
      )}

      {currentStep === 2 && (
        <IngredientSelectionStep
          recipeData={recipeData}
          updateRecipeData={updateRecipeData}
          onNext={handleNextStep}
          onPrev={handlePrevStep}
        />
      )}

      {currentStep === 3 && (
        <PreparationStep
          recipeData={recipeData}
          updateRecipeData={updateRecipeData}
          onNext={handleNextStep}
          onPrev={handlePrevStep}
        />
      )}

      {currentStep === 4 && (
        <IngredientsServeStep
          recipeData={recipeData}
          updateRecipeData={updateRecipeData}
          onNext={handleNextStep}
          onPrev={handlePrevStep}
        />
      )}

      {currentStep === 5 && (
        <CookingInstructionsStep
          recipeData={recipeData}
          updateRecipeData={updateRecipeData}
          onPrev={handlePrevStep}
          onSave={handleSave}
          isSaving={loading}
        />
      )}
    </div>
  );
};

export default RecipeStepper;
