import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle, Loader2, Check, X, Eye, Pencil } from "lucide-react";

// Import our components
import RecipeTable from "./RecipeTable";
import CategoryPanel from "./CategoryPanel";
import TagPanel from "./TagPanel";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { API_URL } from "@/lib/constants";


const RecipeManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("all-recipes");
  const [searchQuery, setSearchQuery] = useState("");
  const [recipeToDelete, setRecipeToDelete] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch recipes
  const { data: recipes, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-recipes"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/recipes`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const result = await response.json();
      return result.data;
    },
  });

  // Approve recipe mutation
  const approveMutation = useMutation({
    mutationFn: async (recipeId: string) => {
      const response = await fetch(`${API_URL}/api/recipes/${recipeId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'approved' })
      });
      
      if (!response.ok) {
        throw new Error('Failed to approve recipe');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-recipes"] });
      toast({
        title: "Recipe approved",
        description: "The recipe is now visible to users",
      });
    },
  });

  // Reject recipe mutation
  const rejectMutation = useMutation({
    mutationFn: async (recipeId: string) => {
      const response = await fetch(`${API_URL}/api/recipes/${recipeId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'rejected' })
      });
      
      if (!response.ok) {
        throw new Error('Failed to reject recipe');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-recipes"] });
      toast({
        title: "Recipe rejected",
        description: "The recipe has been rejected",
      });
    },
  });

  // Delete recipe mutation
  const deleteMutation = useMutation({
    mutationFn: async (recipeId: string) => {
      const response = await fetch(`${API_URL}/api/recipes/${recipeId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete recipe');
      }
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-recipes"] });
      toast({
        title: "Recipe deleted",
        description: "The recipe has been permanently deleted",
      });
      setDeleteDialogOpen(false);
    },
  });

  const handleDeleteClick = (recipeId: string) => {
    setRecipeToDelete(recipeId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (recipeToDelete) {
      deleteMutation.mutate(recipeToDelete);
    }
  };

  const handleViewRecipe = (id: string) => {
    console.log("Viewing recipe:", id);
    navigate(`/admin/recipes/${id}`);
  };

  const handleEditRecipe = (id: string) => {
    console.log("Editing recipe:", id);
    navigate(`/create-recipe/${id}`);
  };

  // Update filtered recipes logic
  const filteredRecipes = recipes?.filter(recipe => {
    // Filter based on tab
    if (activeTab === "pending-approval" && recipe.status !== 'pending') {
      return false;
    }
    if (activeTab === "approved" && recipe.status !== 'approved') {
      return false;
    }
    
    // Filter based on search query
    if (searchQuery && !recipe.name?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  if (isError) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Recipe Management</h2>
          <Button onClick={() => navigate("/create-recipe")} className="bg-qzene-dark hover:bg-qzene-dark/90">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Recipe
          </Button>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <h3 className="text-xl font-medium text-red-600 mb-2">Error Loading Recipes</h3>
              <p className="text-muted-foreground">There was an error loading the recipes. Please try again later.</p>
              <Button className="mt-4" onClick={() => queryClient.invalidateQueries({ queryKey: ["admin-recipes"] })}>
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-background">
      {/* Header with Search */}
      <div className="p-4 border-b bg-white/50 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <h2 className="text-2xl font-semibold tracking-tight">Recipe Management</h2>
          <Button 
            onClick={() => navigate("/create-recipe")} 
            className="sm:w-auto bg-primary hover:bg-primary/90 transition-colors"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Recipe
          </Button>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full bg-white/80"
          />
        </div>
      </div>

      {/* Tabs and Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Tabs defaultValue="all-recipes" onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white border-b px-4 h-12 flex items-center space-x-6 overflow-x-auto scrollbar-hide">
            <TabsTrigger 
              value="all-recipes"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary px-1 py-2 rounded-none bg-transparent"
            >
              All Recipes
            </TabsTrigger>
            <TabsTrigger 
              value="pending-approval"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary px-1 py-2 rounded-none bg-transparent"
            >
              Pending Approval
            </TabsTrigger>
            <TabsTrigger 
              value="approved"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary px-1 py-2 rounded-none bg-transparent"
            >
              Approved
            </TabsTrigger>
            <TabsTrigger 
              value="categories"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary px-1 py-2 rounded-none bg-transparent"
            >
              Categories
            </TabsTrigger>
            <TabsTrigger 
              value="tags"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary px-1 py-2 rounded-none bg-transparent"
            >
              Tags
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="all-recipes" className="h-full m-0">
              <div className="h-full overflow-auto">
                <div className="min-w-[800px]">
                  <RecipeTable
                    recipes={filteredRecipes}
                    isLoading={isLoading}
                    handleDeleteClick={handleDeleteClick}
                    onViewRecipe={handleViewRecipe}
                    onEditRecipe={handleEditRecipe}
                    onRefetch={refetch}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="pending-approval" className="h-full m-0">
              <div className="overflow-x-auto">
                <RecipeTable
                  recipes={filteredRecipes?.filter(r => !r.is_approved)}
                  isLoading={isLoading}
                  handleDeleteClick={handleDeleteClick}
                  onViewRecipe={handleViewRecipe}
                  onEditRecipe={handleEditRecipe}
                  onRefetch={refetch}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="approved" className="h-full m-0">
              <div className="overflow-x-auto">
                <RecipeTable
                  recipes={filteredRecipes?.filter(r => r.is_approved)}
                  isLoading={isLoading}
                  handleDeleteClick={handleDeleteClick}
                  onViewRecipe={handleViewRecipe}
                  onEditRecipe={handleEditRecipe}
                  onRefetch={refetch}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="categories" className="p-4">
              <CategoryPanel />
            </TabsContent>
            
            <TabsContent value="tags" className="p-4">
              <TagPanel />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        confirmDelete={confirmDelete}
        deleteMutation={deleteMutation}
      />
    </div>
  );
};

export default RecipeManagement;
