
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { RecipeData } from "@/types/recipeCreation";
import RecipeStepper from "@/components/recipeCreation/RecipeStepper";
import { useRecipeOperations } from "@/hooks/useRecipeOperations";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const { id: recipeId } = useParams();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const { loadRecipe } = useRecipeOperations(recipeId || null);
  
  const [recipeData, setRecipeData] = useState<RecipeData>({
    name: "",
    description: "",
    category: "",
    difficulty: "medium",
    price: 0,
    cookingTime: 30,
    servingSize: 4,
    ingredients: [],
    containers: [],
    preparationItems: [],
    utensils: [],
    instructions: [],
    seasonings: [],
    waterOil: [] // Add this line, adjust the default value as per your RecipeData type definition
  });

  // Redirect to auth if user is not logged in
  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create recipes",
        variant: "destructive"
      });
      navigate("/auth", { replace: true });
    }
  }, [user, navigate, toast]);

  // Load existing recipe data if editing
  useEffect(() => {
    const fetchRecipe = async () => {
      if (recipeId) {
        const result = await loadRecipe(recipeId);
        if (result.success && result.data) {
          setRecipeData({
            ...result.data,
            instructions: Array.isArray(result.data.instructions)
              ? result.data.instructions.map((instr: any) => ({
                  ...instr,
                  serves: instr.serves ?? {}, // Ensure serves is present
                }))
              : [],
            waterOil: (result.data as any).waterOil ?? [], // Ensure waterOil is always present
          });
        }
      }
      setLoading(false);
    };
    
    fetchRecipe();
  }, [recipeId, loadRecipe]);

  // If user is not logged in, don't render the component
  if (!user) {
    return null;
  }

  if (loading) {
    return <div className="container mx-auto py-6 px-4 text-center">Loading recipe data...</div>;
  }

  return <RecipeStepper initialRecipeId={recipeId || null} initialRecipeData={recipeData} />;
};

export default CreateRecipe;
