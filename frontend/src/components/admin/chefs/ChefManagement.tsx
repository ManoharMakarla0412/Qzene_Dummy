
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ChefProfile } from "./types";
import ChefManagementHeader from "./ChefManagementHeader";
import ChefSearchBar from "./ChefSearchBar";
import ChefTabs from "./ChefTabs";
import ChefDeleteConfirmation from "./ChefDeleteConfirmation";

const ChefManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all-chefs");
  const [chefToDelete, setChefToDelete] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Fetch chefs data
  const { data: chefs, isLoading, isError } = useQuery<ChefProfile[]>({
    queryKey: ["admin-chefs"],
    queryFn: async () => {
      const { data, error } = await supabase
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
        .order('name', { ascending: true });
      
      if (error) throw error;
      
      // If we have chefs, fetch their profiles in a separate query
      if (data && data.length > 0) {
        const userIds = data.filter(chef => chef.user_id).map(chef => chef.user_id);
        
        if (userIds.length > 0) {
          const { data: profilesData, error: profilesError } = await supabase
            .from('profiles')
            .select('id, first_name, last_name, avatar_url, role')
            .in('id', userIds);
            
          if (!profilesError && profilesData) {
            // Create a map of user_id to profile data
            const profileMap = profilesData.reduce((map, profile) => {
              map[profile.id] = profile;
              return map;
            }, {});
            
            // Add profile data to each chef
            return data.map(chef => ({
              ...chef,
              profile: chef.user_id ? profileMap[chef.user_id] : null
            })) as ChefProfile[];
          }
        }
      }
      
      return (data || []) as ChefProfile[];
    },
  });

  // Delete chef mutation
  const deleteMutation = useMutation({
    mutationFn: async (chefId: string) => {
      const { error } = await supabase
        .from('chefs')
        .delete()
        .eq('id', chefId);
      
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-chefs"] });
      toast({
        title: "Chef deleted",
        description: "The chef has been permanently deleted",
      });
      setDeleteDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error deleting chef",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const handleDeleteClick = (chefId: string) => {
    setChefToDelete(chefId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (chefToDelete) {
      deleteMutation.mutate(chefToDelete);
    }
  };

  const handleViewChef = (id: string) => {
    navigate(`/admin/chefs/${id}`);
  };

  const handleEditChef = (id: string) => {
    navigate(`/admin/chefs/edit/${id}`);
  };

  const filteredChefs = chefs?.filter(chef => {
    const fullName = chef.profile 
      ? `${chef.profile.first_name || ''} ${chef.profile.last_name || ''}`.toLowerCase() 
      : '';
    
    return chef.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           fullName.includes(searchQuery.toLowerCase());
  });

  const topChefs = [...(filteredChefs || [])].sort((a, b) => 
    (b.rating || 0) - (a.rating || 0)
  ).slice(0, 5);

  if (isError) {
    return (
      <div className="space-y-6">
        <ChefManagementHeader />
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <h3 className="text-xl font-medium text-red-600 mb-2">Error Loading Chefs</h3>
              <p className="text-muted-foreground">There was an error loading the chefs. Please try again later.</p>
              <button 
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                onClick={() => queryClient.invalidateQueries({ queryKey: ["admin-chefs"] })}
              >
                Retry
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ChefManagementHeader />
      
      <Card>
        <CardContent className="p-6">
          <ChefSearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          <ChefTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            filteredChefs={filteredChefs}
            topChefs={topChefs}
            isLoading={isLoading}
            onView={handleViewChef}
            onEdit={handleEditChef}
            onDelete={handleDeleteClick}
          />
        </CardContent>
      </Card>

      <ChefDeleteConfirmation 
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirmDelete={confirmDelete}
        deleteMutation={deleteMutation}
      />
    </div>
  );
};

export default ChefManagement;
