
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Pencil, Trash, Save, X, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Category {
  id: string;
  name: string;
  description?: string;
  count?: number;
}

const CategoryPanel = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch categories - in a real app, this would be from a dedicated table
  // For demo, we'll categorize recipes by their category field
  const { data: categories, isLoading } = useQuery({
    queryKey: ["recipe-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('category')
        .not('category', 'is', null);
      
      if (error) throw error;

      // Count categories and create unique list
      const categoryMap = new Map<string, number>();
      data.forEach(recipe => {
        if (recipe.category) {
          const category = recipe.category.trim().toLowerCase();
          categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
        }
      });

      // Convert to array of category objects
      const categoryList: Category[] = Array.from(categoryMap).map(([name, count], index) => ({
        id: `cat-${index + 1}`,
        name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize
        count
      }));
      
      // If no categories found, provide defaults
      if (categoryList.length === 0) {
        return [
          { id: 'cat-1', name: 'Italian', count: 0 },
          { id: 'cat-2', name: 'Mexican', count: 0 },
          { id: 'cat-3', name: 'Indian', count: 0 },
          { id: 'cat-4', name: 'Chinese', count: 0 },
          { id: 'cat-5', name: 'American', count: 0 },
          { id: 'cat-6', name: 'French', count: 0 },
        ];
      }
      
      return categoryList;
    }
  });

  // Add category mutation - for demo purposes
  const addCategoryMutation = useMutation({
    mutationFn: async (name: string) => {
      // In a real app, you would add to a categories table
      console.log(`Adding category: ${name}`);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      return { id: `cat-${Date.now()}`, name };
    },
    onSuccess: (newCat) => {
      queryClient.setQueryData(['recipe-categories'], (old: Category[] | undefined) => [
        ...(old || []),
        { ...newCat, count: 0 }
      ]);
      toast({
        title: 'Category added',
        description: `${newCat.name} has been added to categories`
      });
      setNewCategory('');
    }
  });

  // Update category mutation - for demo purposes
  const updateCategoryMutation = useMutation({
    mutationFn: async ({ id, name }: { id: string, name: string }) => {
      // In a real app, you would update the categories table
      console.log(`Updating category ${id} to: ${name}`);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      return { id, name };
    },
    onSuccess: (updatedCat) => {
      queryClient.setQueryData(['recipe-categories'], (old: Category[] | undefined) => 
        old?.map(cat => cat.id === updatedCat.id ? { ...cat, name: updatedCat.name } : cat)
      );
      toast({
        title: 'Category updated',
        description: `Category has been renamed to ${updatedCat.name}`
      });
      setIsEditing(false);
      setEditingCategory(null);
    }
  });

  // Delete category mutation - for demo purposes
  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      // In a real app, you would delete from the categories table
      console.log(`Deleting category: ${id}`);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      return { id };
    },
    onSuccess: (result) => {
      queryClient.setQueryData(['recipe-categories'], (old: Category[] | undefined) => 
        old?.filter(cat => cat.id !== result.id)
      );
      toast({
        title: 'Category deleted',
        description: 'The category has been removed'
      });
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  });

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategoryMutation.mutate(newCategory.trim());
    }
  };

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setEditName(category.name);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editingCategory && editName.trim() && editName !== editingCategory.name) {
      updateCategoryMutation.mutate({ id: editingCategory.id, name: editName.trim() });
    } else {
      setIsEditing(false);
      setEditingCategory(null);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingCategory(null);
  };

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      deleteCategoryMutation.mutate(categoryToDelete.id);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>
          Manage recipe categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-6">
          <Input 
            placeholder="New category name..." 
            className="max-w-sm"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button 
            onClick={handleAddCategory}
            disabled={!newCategory.trim() || addCategoryMutation.isPending}
          >
            {addCategoryMutation.isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <PlusCircle className="h-4 w-4 mr-2" />
            )}
            Add Category
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <Card key={category.id}>
                <CardContent className="flex justify-between items-center p-4">
                  {isEditing && editingCategory?.id === category.id ? (
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 mr-2"
                      autoFocus
                    />
                  ) : (
                    <div className="flex items-center">
                      <span className="font-medium">{category.name}</span>
                      {category.count !== undefined && (
                        <span className="ml-2 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                          {category.count} recipes
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className="flex space-x-1">
                    {isEditing && editingCategory?.id === category.id ? (
                      <>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={handleSaveEdit}
                          disabled={updateCategoryMutation.isPending}
                        >
                          {updateCategoryMutation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4" />
                          )}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={handleCancelEdit}
                          disabled={updateCategoryMutation.isPending}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditClick(category)}
                          disabled={isEditing}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-600"
                          onClick={() => handleDeleteClick(category)}
                          disabled={isEditing}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No categories found. Add your first category above.
          </div>
        )}
      </CardContent>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the category "{categoryToDelete?.name}". This action cannot be undone.
              {categoryToDelete?.count && categoryToDelete.count > 0 && (
                <p className="mt-2 text-amber-600 font-medium">
                  Warning: This category contains {categoryToDelete.count} recipes!
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteCategoryMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteCategoryMutation.isPending}
            >
              {deleteCategoryMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>Delete</>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default CategoryPanel;
