
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

interface ChefFormProps {
  isEditing?: boolean;
}

const specialtiesOptions = [
  "Italian", "Mexican", "Indian", "Chinese", "American", "French", "Spanish", 
  "Thai", "Japanese", "Korean", "Mediterranean", "Middle Eastern", "Vegan", 
  "Vegetarian", "Desserts", "Baking", "Grilling", "Seafood", "Soups", "Salads"
];

const ChefForm = ({ isEditing = false }: ChefFormProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  
  const [chefData, setChefData] = useState({
    name: "",
    bio: "",
    contact_email: "",
    specialties: [] as string[],
    profile_image_url: "",
    user_id: null,
  });

  // Fetch chef data if editing
  const { data: chef, isLoading: isLoadingChef } = useQuery({
    queryKey: ["chef-detail", id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('chefs')
        .select(`
          id,
          name,
          bio,
          contact_email,
          profile_image_url,
          specialties,
          user_id,
          profiles: user_id (
            first_name,
            last_name,
            avatar_url,
            role
          )
        `)
        .eq("id", id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: isEditing && !!id,
  });

  // Fetch profiles for user assignment
  const { data: profiles } = useQuery({
    queryKey: ["profiles-for-chef"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, avatar_url, role')
        .order('first_name', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  // Create chef mutation
  const createMutation = useMutation({
    mutationFn: async (formData: any) => {
      const { data, error } = await supabase
        .from('chefs')
        .insert(formData)
        .select();
      
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-chefs"] });
      toast({
        title: "Chef created successfully",
        description: "New chef profile has been created",
      });
      navigate("/admin");
    },
    onError: (error: any) => {
      toast({
        title: "Error creating chef",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  // Update chef mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string, formData: any }) => {
      const { data, error } = await supabase
        .from('chefs')
        .update(formData)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-chefs"] });
      queryClient.invalidateQueries({ queryKey: ["chef-detail", id] });
      toast({
        title: "Chef updated successfully",
        description: "Chef profile has been updated",
      });
      navigate("/admin");
    },
    onError: (error: any) => {
      toast({
        title: "Error updating chef",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  // Set form data if editing
  useEffect(() => {
    if (isEditing && chef) {
      setChefData({
        name: chef.name || "",
        bio: chef.bio || "",
        contact_email: chef.contact_email || "",
        specialties: Array.isArray(chef.specialties) ? chef.specialties : [],
        profile_image_url: chef.profile_image_url || "",
        user_id: chef.user_id,
      });

      if (chef.profile_image_url) {
        setImagePreview(chef.profile_image_url);
      }
    }
  }, [isEditing, chef]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setChefData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setChefData((prev) => ({
      ...prev,
      [name]: value
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

  const handleAddSpecialty = () => {
    if (selectedSpecialty && !chefData.specialties.includes(selectedSpecialty)) {
      setChefData((prev) => ({
        ...prev,
        specialties: [...prev.specialties, selectedSpecialty]
      }));
      setSelectedSpecialty("");
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    setChefData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter(item => item !== specialty)
    }));
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return chefData.profile_image_url;
    
    setUploadingImage(true);
    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `chef-images/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('chefs')
        .upload(filePath, imageFile);
        
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('chefs')
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Upload image if present
      const imageUrl = await uploadImage();
      
      // Create form data
      const formData = {
        ...chefData,
        profile_image_url: imageUrl || chefData.profile_image_url,
      };
      
      // Submit form
      if (isEditing && id) {
        updateMutation.mutate({ id, formData });
      } else {
        createMutation.mutate(formData);
      }
    } catch (error: any) {
      toast({
        title: "Error saving chef",
        description: error.message || "Something went wrong",
        variant: "destructive"
      });
    }
  };

  if (isEditing && isLoadingChef) {
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
          {isEditing ? "Edit Chef Profile" : "Create New Chef"}
        </h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Chef Details</CardTitle>
            <CardDescription>
              Fill in the details of the chef profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Chef Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={chefData.name}
                  onChange={handleChange}
                  placeholder="Enter chef's name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={chefData.bio}
                  onChange={handleChange}
                  placeholder="Brief biography of the chef"
                  rows={3}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact_email">Contact Email</Label>
                <Input
                  id="contact_email"
                  name="contact_email"
                  type="email"
                  value={chefData.contact_email}
                  onChange={handleChange}
                  placeholder="chef@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="user_id">Associated User (Optional)</Label>
                <Select 
                  value={chefData.user_id || "none"} 
                  onValueChange={(value) => handleSelectChange("user_id", value === "none" ? null : value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {profiles?.map(profile => (
                      <SelectItem key={profile.id} value={profile.id}>
                        {profile.first_name} {profile.last_name} ({profile.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Link this chef profile to an existing user account
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialties">Specialties</Label>
                <div className="flex gap-2">
                  <Select 
                    value={selectedSpecialty} 
                    onValueChange={setSelectedSpecialty}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialtiesOptions.map(specialty => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleAddSpecialty}
                    disabled={!selectedSpecialty}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {chefData.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="pl-3 pr-2 py-1">
                      {specialty}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1 text-muted-foreground hover:text-foreground"
                        onClick={() => handleRemoveSpecialty(specialty)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                  {chefData.specialties.length === 0 && (
                    <p className="text-sm text-muted-foreground">No specialties added</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Profile Image</Label>
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
                      Upload a high-quality profile image
                    </p>
                  </div>
                  {imagePreview && (
                    <div className="w-full md:w-1/3">
                      <div className="relative aspect-square w-full overflow-hidden rounded-md border">
                        <img
                          src={imagePreview}
                          alt="Profile preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
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
                  {isEditing ? "Update Chef" : "Create Chef"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChefForm;
