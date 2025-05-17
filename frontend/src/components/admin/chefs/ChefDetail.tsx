
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  ChefHat, 
  Mail, 
  User, 
  AlertTriangle, 
  Edit, 
  Trash2, 
  ArrowLeft, 
  Loader2,
  Star 
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChefProfile {
  id: string;
  name: string;
  bio: string | null;
  contact_email: string | null;
  profile_image_url: string | null;
  specialties: string[] | null;
  rating: number | null;
  total_recipes: number | null;
  user_id: string | null;
  created_at: string;
  updated_at: string;
  profile?: {
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    role: string;
  } | null;
}

interface ChefRecipe {
  id: string;
  name: string;
  is_approved: boolean | null;
  image_url: string | null;
}

const ChefDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch chef data
  const { data: chef, isLoading, isError } = useQuery<ChefProfile>({
    queryKey: ["chef-detail", id],
    queryFn: async () => {
      // First fetch the chef data
      const { data: chefData, error: chefError } = await supabase
        .from('chefs')
        .select(`
          id,
          name,
          bio,
          contact_email,
          profile_image_url,
          specialties,
          rating,
          total_recipes,
          user_id,
          created_at,
          updated_at
        `)
        .eq("id", id)
        .single();
      
      if (chefError) throw chefError;
      
      // If the chef has a user_id, fetch the profile data separately
      if (chefData && chefData.user_id) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('first_name, last_name, avatar_url, role')
          .eq("id", chefData.user_id)
          .single();
          
        if (!profileError && profileData) {
          return {
            ...chefData,
            profile: profileData
          };
        }
      }
      
      return {
        ...chefData,
        profile: null
      };
    },
  });

  // Fetch chef's recipes
  const { data: recipes } = useQuery<ChefRecipe[]>({
    queryKey: ["chef-recipes", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('id, name, is_approved, image_url')
        .eq('chef_id', id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  // Delete chef mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('chefs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-chefs"] });
      toast({
        title: "Chef deleted",
        description: "The chef has been permanently deleted",
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

  if (isError || !chef) {
    return (
      <div className="container py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
            <CardDescription>
              Could not load chef details. The chef might have been deleted or you don't have permission to view it.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{chef.name}</CardTitle>
                    <CardDescription className="mt-2 flex items-center">
                      <Mail className="h-4 w-4 mr-1" /> {chef.contact_email || "No email provided"}
                    </CardDescription>
                  </div>
                  {chef.rating && (
                    <div className="flex items-center bg-amber-100 text-amber-800 px-2 py-1 rounded">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                      <span className="font-medium">{chef.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Biography</h3>
                  <p className="text-muted-foreground">{chef.bio || "No biography provided"}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(chef.specialties) && chef.specialties.length > 0 ? (
                      chef.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No specialties specified</p>
                    )}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Associated User</h3>
                  {chef.profile && chef.user_id ? (
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={chef.profile.avatar_url || ""} />
                        <AvatarFallback>
                          {chef.profile.first_name?.[0] || ""}{chef.profile.last_name?.[0] || ""}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {chef.profile.first_name || ""} {chef.profile.last_name || ""}
                        </p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {chef.profile.role}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No user associated</p>
                  )}
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Total Recipes</h3>
                    <p className="text-2xl font-bold">{chef.total_recipes || recipes?.length || 0}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">Member Since</h3>
                    <p className="text-muted-foreground">
                      {new Date(chef.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/admin/chefs/edit/${chef.id}`)}
                  >
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  
                  <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Chef</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{chef.name}"? This will also delete associated data. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => deleteMutation.mutate()}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          {deleteMutation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <Trash2 className="h-4 w-4 mr-2" />
                          )}
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Image</CardTitle>
              </CardHeader>
              <CardContent>
                {chef.profile_image_url ? (
                  <div className="aspect-square w-full overflow-hidden rounded-md border">
                    <img
                      src={chef.profile_image_url}
                      alt={chef.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-square w-full overflow-hidden rounded-md border bg-muted flex items-center justify-center">
                    <ChefHat className="h-12 w-12 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No image available</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {recipes && recipes.length > 0 && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Recipes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {recipes.slice(0, 5).map(recipe => (
                      <li key={recipe.id} className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded overflow-hidden bg-muted flex-shrink-0">
                          {recipe.image_url ? (
                            <img
                              src={recipe.image_url}
                              alt={recipe.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{recipe.name}</p>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${recipe.is_approved ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}
                          >
                            {recipe.is_approved ? 'Approved' : 'Pending'}
                          </Badge>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex-shrink-0"
                          onClick={() => navigate(`/admin/recipes/${recipe.id}`)}
                        >
                          View
                        </Button>
                      </li>
                    ))}
                  </ul>
                  {recipes.length > 5 && (
                    <Button 
                      variant="link" 
                      className="mt-2 w-full"
                      onClick={() => navigate('/admin', { state: { tab: 'recipe-management', filter: { chef_id: chef.id } } })}
                    >
                      View all {recipes.length} recipes
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefDetail;
