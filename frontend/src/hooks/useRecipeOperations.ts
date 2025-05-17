import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { RecipeData } from "@/types/recipeCreation";
import { Database } from "@/integrations/supabase/types";
import { useQueryClient } from "@tanstack/react-query";

type RecipeStatus = Database["public"]["Enums"]["recipe_status"];

export const useRecipeOperations = (recipeId: string | null) => {
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [savedRecipeId, setSavedRecipeId] = useState<string | null>(recipeId);

  // Save basic recipe details after first step
  const saveBasicDetails = async (recipeData: RecipeData) => {
    if (!user) {
      toast({
        title: "Not authenticated",
        description: "You must be logged in to create recipes",
        variant: "destructive"
      });
      return false;
    }
    
    setLoading(true);
    console.log("Saving basic details, recipe data:", recipeData);
    
    try {
      // Get chef ID or create a chef profile if needed
      let chefId = null;
      
      if (!profile) {
        throw new Error("User profile not found. Please refresh and try again.");
      }
      
      const { data: chefData, error: chefError } = await supabase
        .from('chefs')
        .select("id")
        .eq("user_id", user.id);
        
      if (chefError) {
        throw new Error("Error finding chef profile");
      }
      
      if (chefData && chefData.length > 0) {
        chefId = chefData[0].id;
      } else {
        // Create a new chef profile if one doesn't exist
        const { data: newChef, error: createError } = await supabase
          .from('chefs')
          .insert({
            user_id: user.id,
            name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || `Chef ${user.id.substring(0, 4)}`,
            bio: "",
            total_recipes: 1
          })
          .select();
        
        if (createError) {
          throw new Error("Couldn't create chef profile");
        }
        
        chefId = newChef?.[0]?.id;
      }
      
      if (!chefId) {
        throw new Error("Couldn't find or create chef profile");
      }
      
      const recipeToSave = {
        name: recipeData.name,
        description: recipeData.description,
        price: recipeData.price,
        category: recipeData.category,
        difficulty: recipeData.difficulty,
        cooking_time: recipeData.cookingTime,
        chef_id: chefId,
        is_approved: false,
        servings: recipeData.servingSize,
        image_url: recipeData.imageUrl,
        tags: recipeData.cuisine ? [recipeData.cuisine] : [],
        status: 'in_progress' as RecipeStatus, // Set status to in_progress for incomplete recipes
        ingredients: [],
        instructions: []
      };
      
      let result;
      
      if (savedRecipeId) {
        // Update existing recipe
        console.log("Updating existing recipe with ID:", savedRecipeId);
        const { data, error } = await supabase
          .from('recipes')
          .update(recipeToSave)
          .eq('id', savedRecipeId)
          .select();
        
        if (error) throw error;
        result = data[0];
        console.log("Updated recipe:", result);
      } else {
        // Create new recipe
        console.log("Creating new recipe");
        const { data, error } = await supabase
          .from('recipes')
          .insert(recipeToSave)
          .select();
        
        if (error) throw error;
        result = data[0];
        setSavedRecipeId(result.id);
        console.log("Created new recipe with ID:", result.id);
      }
      
      toast({
        title: savedRecipeId ? "Recipe updated" : "Recipe created",
        description: "Basic details saved. You can continue editing or come back later."
      });
      
      return { success: true, recipeId: result.id };
    } catch (error: any) {
      console.error("Error saving recipe:", error);
      toast({
        title: "Error saving recipe",
        description: error.message || "Something went wrong",
        variant: "destructive"
      });
      return { success: false, recipeId: null };
    } finally {
      setLoading(false);
    }
  };

  // Final save with all recipe details
  const finalizeRecipe = async (recipeData: RecipeData, savedId: string) => {
    if (!savedId) {
      toast({
        title: "Error saving recipe",
        description: "Could not create recipe record",
        variant: "destructive"
      });
      return false;
    }
    
    setLoading(true);
    console.log("Finalizing recipe with ID:", savedId);
    
    try {
      // Format ingredients as arrays of objects
      const ingredientsArray = recipeData.ingredients.map(ing => ({
        name: ing.name,
        image: ing.image,
        weight: ing.weight
      }));
      
      // Format instructions as arrays of objects
      const instructionsArray = recipeData.instructions.map(inst => ({
        step: inst.step,
        action: inst.action,
        icon: inst.icon
      }));
      
      console.log("Saving ingredients:", ingredientsArray);
      console.log("Saving instructions:", instructionsArray);
      
      // Update recipe with full details
      const { error } = await supabase
        .from('recipes')
        .update({
          ingredients: ingredientsArray,
          instructions: instructionsArray,
          status: 'published' as RecipeStatus // Change status to published when fully completed
        })
        .eq('id', savedId);
      
      if (error) {
        throw error;
      }
      
      // Refresh the recipe list in admin dashboard
      queryClient.invalidateQueries({ queryKey: ["admin-recipes"] });
      
      console.log("Recipe finalized successfully");
      return true;
    } catch (error: any) {
      console.error("Error saving recipe:", error);
      toast({
        title: "Error updating recipe",
        description: error.message || "Something went wrong",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Load existing recipe data
  const loadRecipe = async (id: string) => {
    setLoading(true);
    try {
      console.log("Loading recipe with ID:", id);
      const { data, error } = await supabase
        .from('recipes')
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) throw error;
      
      if (data) {
        console.log("Loaded recipe data:", data);
        // Convert from DB format to app format
        const ingredientsFromDB = Array.isArray(data.ingredients) 
          ? data.ingredients.map((item: any, index: number) => ({
              id: `ing-${index}`,
              name: typeof item === 'string' ? item : item.name || '',
              image: typeof item === 'object' && item.image ? item.image : 'placeholder.svg',
              weight: typeof item === 'object' && item.weight ? item.weight : undefined
            }))
          : [];
          
        const instructionsFromDB = Array.isArray(data.instructions)
          ? data.instructions.map((item: any, index: number) => ({
              id: `inst-${index}`,
              step: index + 1,
              action: typeof item === 'string' ? item : item.action || '',
              icon: typeof item === 'object' && item.icon ? item.icon : ''
            }))
          : [];
          
        const recipeData = {
          name: data.name || "",
          description: data.description || "",
          category: data.category || "",
          difficulty: data.difficulty || "medium",
          price: data.price || 0,
          cookingTime: data.cooking_time || 30,
          servingSize: data.servings || 4,
          ingredients: ingredientsFromDB,
          containers: [],
          preparationItems: [],
          utensils: [],
          instructions: instructionsFromDB,
          seasonings: [],
          imageUrl: data.image_url,
          cuisine: data.tags?.[0] || "",
        };
        
        setSavedRecipeId(data.id);
        return { success: true, data: recipeData };
      }
      return { success: false, data: null };
    } catch (error: any) {
      console.error("Error loading recipe:", error);
      toast({
        title: "Error loading recipe",
        description: error.message || "Something went wrong",
        variant: "destructive"
      });
      return { success: false, data: null };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    savedRecipeId,
    setSavedRecipeId,
    saveBasicDetails,
    finalizeRecipe,
    loadRecipe
  };
};
