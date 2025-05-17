
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ChefHat, 
  Clock, 
  Star, 
  Users, 
  Utensils, 
  BookOpen,
  Edit,
  Trash2,
  AlertCircle
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [chef, setChef] = useState<any>(null);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Fetch chef profile
        const { data: chefData, error: chefError } = await supabase
          .from('chefs')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (chefError && chefError.code !== 'PGRST116') {
          throw chefError;
        }
        
        if (chefData) {
          setChef(chefData);
          
          // Fetch chef's recipes
          const { data: recipesData, error: recipesError } = await supabase
            .from('recipes')
            .select(`
              *,
              chefs:chef_id(name)
            `)
            .eq('chef_id', chefData.id)
            .order('created_at', { ascending: false });
            
          if (recipesError) throw recipesError;
          setRecipes(recipesData || []);
        }
        
        // Fetch saved recipes - FIX: Use wishlists table instead of saved_recipes
        const { data: wishlistData, error: wishlistError } = await supabase
          .from('wishlists')
          .select(`
            recipe_id
          `)
          .eq('user_id', user.id);
          
        if (wishlistError) throw wishlistError;
        
        // If we have wishlists, fetch the full recipe data for each
        if (wishlistData && wishlistData.length > 0) {
          const recipeIds = wishlistData.map(item => item.recipe_id);
          
          const { data: savedRecipesData, error: savedRecipesError } = await supabase
            .from('recipes')
            .select(`
              *,
              chefs:chef_id(name)
            `)
            .in('id', recipeIds);
            
          if (savedRecipesError) throw savedRecipesError;
          setSavedRecipes(savedRecipesData || []);
        } else {
          setSavedRecipes([]);
        }
        
      } catch (error: any) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: "Error loading dashboard",
          description: error.message || "Something went wrong",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [user, toast]);
  
  const handleDeleteRecipe = async (recipeId: string) => {
    try {
      const { error } = await supabase
        .from('recipes')
        .delete()
        .eq('id', recipeId);
        
      if (error) throw error;
      
      // Update local state
      setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
      
      toast({
        title: "Recipe deleted",
        description: "Your recipe has been deleted successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error deleting recipe",
        description: error.message || "Something went wrong",
        variant: "destructive"
      });
    }
  };
  
  const renderRecipeCard = (recipe: any, isSaved = false) => (
    <Card key={recipe.id} className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden bg-gray-100">
        {recipe.image_url ? (
          <img 
            src={recipe.image_url} 
            alt={recipe.name} 
            className="h-full w-full object-cover transition-all hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-100">
            <Utensils className="h-10 w-10 text-gray-400" />
          </div>
        )}
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{recipe.name}</CardTitle>
          <Badge variant={recipe.is_approved ? "default" : "outline"}>
            {recipe.is_approved ? "Approved" : "Pending"}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {recipe.description || "No description provided"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-wrap gap-2 text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>{recipe.cooking_time || 0} min</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4" />
            <span>{recipe.servings || 2} servings</span>
          </div>
          <div className="flex items-center">
            <ChefHat className="mr-1 h-4 w-4" />
            <span>{recipe.chefs?.name || "Unknown chef"}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Link to={`/recipe/${recipe.id}`}>
          <Button variant="outline" size="sm" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            View Recipe
          </Button>
        </Link>
        
        {!isSaved && (
          <div className="flex gap-2">
            <Link to={`/edit-recipe/${recipe.id}`}>
              <Button variant="ghost" size="sm" className="flex items-center text-blue-500">
                <Edit className="mr-1 h-4 w-4" />
                Edit
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center text-red-500"
              onClick={() => handleDeleteRecipe(recipe.id)}
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Delete
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
  
  if (loading) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <div className="aspect-video w-full">
                <Skeleton className="h-full w-full" />
              </div>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-28" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link to="/create-recipe">
          <Button className="bg-qzene-purple-dark hover:bg-qzene-purple/90 flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Create Recipe
          </Button>
        </Link>
      </div>
      
      {!chef && (
        <Card className="mb-8 border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-2">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-yellow-500 mt-1" />
              <div>
                <CardTitle className="text-yellow-800">Complete Your Chef Profile</CardTitle>
                <CardDescription className="text-yellow-700">
                  You need to create a chef profile to start creating and sharing recipes.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardFooter className="pt-2">
            <Link to="/profile">
              <Button variant="outline" className="border-yellow-500 text-yellow-700 hover:bg-yellow-100">
                Complete Profile
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}
      
      <Tabs defaultValue="my-recipes">
        <TabsList className="mb-6">
          <TabsTrigger value="my-recipes">My Recipes</TabsTrigger>
          <TabsTrigger value="saved-recipes">Saved Recipes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-recipes">
          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map(recipe => renderRecipeCard(recipe))}
            </div>
          ) : (
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>No Recipes Yet</CardTitle>
                <CardDescription>
                  You haven't created any recipes yet. Click the "Create Recipe" button to get started.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/create-recipe">
                  <Button>Create Your First Recipe</Button>
                </Link>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="saved-recipes">
          {savedRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedRecipes.map(recipe => renderRecipeCard(recipe, true))}
            </div>
          ) : (
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle>No Saved Recipes</CardTitle>
                <CardDescription>
                  You haven't saved any recipes yet. Browse recipes and click the save button to add them here.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to="/all-recipes">
                  <Button>Browse Recipes</Button>
                </Link>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
