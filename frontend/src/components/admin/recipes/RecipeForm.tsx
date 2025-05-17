
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Upload, ChefHat, X } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface RecipeFormProps {
  isEditing?: boolean;
}

interface RecipeFormData {
  name: string;
  description: string;
  category: string;
  chef_id: string;
  cooking_time: number;
  preparation_time: number;
  servings: number;
  difficulty: string;
  price: number;
  ingredients: string[];
  instructions: string[];
  tags: string[];
  image_url: string;
  is_approved: boolean;
}

const RecipeForm = ({ isEditing = false }: RecipeFormProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [recipeData, setRecipeData] = useState<RecipeFormData>({
    name: "",
    description: "",
    category: "",
    chef_id: "",
    cooking_time: 0,
    preparation_time: 0,
    servings: 0,
    difficulty: "",
    price: 0,
    ingredients: [],
    instructions: [],
    tags: [],
    image_url: "",
    is_approved: false,
  });

  const { data: chefs } = useQuery({
    queryKey: ["chefs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('chefs')
        .select('id, name');
      
      if (error) throw error;
      return data;
    },
  });

  const { data: recipe, isLoading: isLoadingRecipe } = useQuery({
    queryKey: ["recipe-detail", id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq("id", id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: isEditing && !!id,
  });

  useEffect(() => {
    if (isEditing && recipe) {
      // Convert ingredients and instructions to string arrays if needed
      const ingredients = Array.isArray(recipe.ingredients) 
        ? recipe.ingredients.map(item => typeof item === 'string' ? item : String(item))
        : [];
      
      const instructions = Array.isArray(recipe.instructions)
        ? recipe.instructions.map(item => typeof item === 'string' ? item : String(item))
        : [];
      
      const tags = Array.isArray(recipe.tags)
        ? recipe.tags.map(item => typeof item === 'string' ? item : String(item))
        : [];
      
      setRecipeData({
        name: recipe.name || "",
        description: recipe.description || "",
        category: recipe.category || "",
        chef_id: recipe.chef_id || "",
        cooking_time: recipe.cooking_time || 0,
        preparation_time: recipe.preparation_time || 0,
        servings: recipe.servings || 0,
        difficulty: recipe.difficulty || "",
        price: recipe.price || 0,
        ingredients,
        instructions,
        tags,
        image_url: recipe.image_url || "",
        is_approved: recipe.is_approved || false,
      });
      
      if (recipe.image_url) {
        setImagePreview(recipe.image_url);
      }
    }
  }, [isEditing, recipe]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipeData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecipeData((prev) => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setRecipeData((prev) => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleArrayChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: 'ingredients' | 'instructions' | 'tags') => {
    // Split by newline and filter out empty strings
    const values = e.target.value
      .split('\n')
      .filter(item => item.trim() !== '');
    
    setRecipeData(prev => ({
      ...prev,
      [field]: values
    }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return recipeData.image_url;
    
    setUploadingImage(true);
    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('recipes')
        .upload(filePath, imageFile);
        
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('recipes')
        .getPublicUrl(filePath);
        
      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error uploading image",
        description: "There was an error uploading your image. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const createMutation = useMutation({
    mutationFn: async (formData: any) => {
      const { data, error } = await supabase
        .from('recipes')
        .insert(formData)
        .select();
      
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-recipes"] });
      toast({
        title: "Recipe created successfully",
        description: "New recipe has been created",
      });
      navigate("/admin");
    },
    onError: (error: any) => {
      toast({
        title: "Error creating recipe",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string, formData: any }) => {
      const { data, error } = await supabase
        .from('recipes')
        .update(formData)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-recipes"] });
      queryClient.invalidateQueries({ queryKey: ["recipe-detail", id] });
      toast({
        title: "Recipe updated successfully",
        description: "Recipe has been updated",
      });
      navigate("/admin");
    },
    onError: (error: any) => {
      toast({
        title: "Error updating recipe",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Upload image if present
      const imageUrl = await uploadImage();
      
      // Create form data
      const formData = {
        ...recipeData,
        image_url: imageUrl || recipeData.image_url,
      };
      
      // Submit form
      if (isEditing && id) {
        updateMutation.mutate({ id, formData });
      } else {
        createMutation.mutate(formData);
      }
    } catch (error: any) {
      toast({
        title: "Error saving recipe",
        description: error.message || "Something went wrong",
        variant: "destructive"
      });
    }
  };

  if (isEditing && isLoadingRecipe) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {isEditing ? "Edit Recipe" : "Create New Recipe"}
        </h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Recipe Details</CardTitle>
            <CardDescription>
              Fill in the details of the recipe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Recipe Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={recipeData.name}
                  onChange={handleChange}
                  placeholder="Enter recipe name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={recipeData.description}
                  onChange={handleChange}
                  placeholder="Brief description of the recipe"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={recipeData.category}
                  onChange={handleChange}
                  placeholder="Enter recipe category"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chef_id">Chef</Label>
                <Select 
                  value={recipeData.chef_id} 
                  onValueChange={(value) => setRecipeData((prev) => ({ ...prev, chef_id: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a chef" />
                  </SelectTrigger>
                  <SelectContent>
                    {chefs?.map(chef => (
                      <SelectItem key={chef.id} value={chef.id}>
                        {chef.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cooking_time">Cooking Time (minutes)</Label>
                <Input
                  id="cooking_time"
                  name="cooking_time"
                  type="number"
                  value={recipeData.cooking_time}
                  onChange={handleNumberChange}
                  placeholder="Enter cooking time"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preparation_time">Preparation Time (minutes)</Label>
                <Input
                  id="preparation_time"
                  name="preparation_time"
                  type="number"
                  value={recipeData.preparation_time}
                  onChange={handleNumberChange}
                  placeholder="Enter preparation time"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="servings">Servings</Label>
                <Input
                  id="servings"
                  name="servings"
                  type="number"
                  value={recipeData.servings}
                  onChange={handleNumberChange}
                  placeholder="Enter number of servings"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Input
                  id="difficulty"
                  name="difficulty"
                  value={recipeData.difficulty}
                  onChange={handleChange}
                  placeholder="Enter difficulty level"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={recipeData.price}
                  onChange={handleNumberChange}
                  placeholder="Enter price"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ingredients">Ingredients</Label>
                <Textarea
                  id="ingredients"
                  name="ingredients"
                  value={recipeData.ingredients.join('\n')}
                  onChange={(e) => handleArrayChange(e, 'ingredients')}
                  placeholder="Enter ingredients, one per line"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea
                  id="instructions"
                  name="instructions"
                  value={recipeData.instructions.join('\n')}
                  onChange={(e) => handleArrayChange(e, 'instructions')}
                  placeholder="Enter instructions, one per line"
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Textarea
                  id="tags"
                  name="tags"
                  value={recipeData.tags.join('\n')}
                  onChange={(e) => handleArrayChange(e, 'tags')}
                  placeholder="Enter tags, one per line"
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Recipe Image</Label>
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="w-full md:w-2/3">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Upload a high-quality image of the recipe
                    </p>
                  </div>
                  {imagePreview && (
                    <div className="w-full md:w-1/3">
                      <div className="relative aspect-square w-full overflow-hidden rounded-md border">
                        <img
                          src={imagePreview}
                          alt="Recipe preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Input
                    id="is_approved"
                    name="is_approved"
                    type="checkbox"
                    checked={recipeData.is_approved}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="is_approved">Approve Recipe</Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Approved recipes will be visible to all users
                </p>
              </div>
              
              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending || uploadingImage}
                  className="bg-primary hover:bg-primary/90"
                >
                  {(createMutation.isPending || updateMutation.isPending || uploadingImage) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isEditing ? "Update Recipe" : "Create Recipe"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecipeForm;
