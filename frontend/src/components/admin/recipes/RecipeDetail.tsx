
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

import RecipeDetailHeader from "./detail/RecipeDetailHeader";
import RecipeDetailContent from "./detail/RecipeDetailContent";
import RecipeActions from "./detail/RecipeActions";
import RecipeImage from "./detail/RecipeImage";
import RecipeStatus from "./detail/RecipeStatus";

interface RecipeDetail {
  id: string;
  name: string;
  description: string | null;
  ingredients: any;
  instructions: any;
  image_url: string | null;
  cooking_time: number | null;
  preparation_time: number | null;
  servings: number | null;
  difficulty: string | null;
  category: string | null;
  tags: string[] | null;
  price: number | null;
  is_approved: boolean | null;
  status: string | null;
  chef_id: string | null;
  created_at: string;
  updated_at: string;
  chefs: {
    name: string;
    profile_image_url: string | null;
  } | null;
}

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch recipe data
  const { data: recipe, isLoading, isError } = useQuery<RecipeDetail>({
    queryKey: ["recipe-detail", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select(`
          *,
          chefs(name, profile_image_url)
        `)
        .eq("id", id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  // Approve recipe mutation
  const approveMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('recipes')
        .update({ is_approved: true })
        .eq('id', id);
      
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipe-detail", id] });
      toast({
        title: "Recipe approved",
        description: "The recipe has been approved and is now visible to users",
      });
    },
  });

  // Reject recipe mutation
  const rejectMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('recipes')
        .update({ is_approved: false })
        .eq('id', id);
      
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipe-detail", id] });
      toast({
        title: "Recipe rejected",
        description: "The recipe has been rejected and is not visible to users",
      });
    },
  });

  // Delete recipe mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('recipes')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-recipes"] });
      toast({
        title: "Recipe deleted",
        description: "The recipe has been permanently deleted",
      });
      navigate("/admin");
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !recipe) {
    return (
      <div className="container py-8">
        <Card className="max-w-3xl mx-auto">
          <RecipeDetailHeader 
            name="Error" 
            description="Could not load recipe details. The recipe might have been deleted or you don't have permission to view it."
            isApproved={false}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <RecipeDetailHeader 
                name={recipe.name}
                description={recipe.description}
                isApproved={recipe.is_approved}
              />
              
              <RecipeDetailContent recipe={recipe} />
              
              <RecipeActions 
                recipeId={recipe.id}
                isApproved={recipe.is_approved}
                approveMutation={approveMutation}
                rejectMutation={rejectMutation}
                deleteMutation={deleteMutation}
              />
            </Card>
          </div>
          
          <div>
            <RecipeImage 
              imageUrl={recipe.image_url} 
              recipeName={recipe.name} 
            />
            
            <RecipeStatus 
              isApproved={recipe.is_approved}
              status={recipe.status}
              price={recipe.price}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
