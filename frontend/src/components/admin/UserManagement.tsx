
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, UserCog, User, ChefHat, ShieldAlert, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
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

interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  role: 'admin' | 'chef' | 'user';
  avatar_url: string | null;
  created_at: string;
  email?: string;
}

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      // First get profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select("*")
        .order('created_at', { ascending: false });
      
      if (profilesError) throw profilesError;

      // Get user emails from auth.users using a server function or edge function
      // This is a simplified version; in production, use a secure method
      // For now, we'll just use the profiles data
      return profilesData as UserProfile[];
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      // In a real implementation, you would need to delete the user through Supabase Auth admin API
      // This would typically be done through a secure server function
      // For now, we'll just delete the profile record
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);
        
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast({
        title: "User deleted",
        description: "User has been removed from the system",
      });
      setDeleteDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error deleting user",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  // Promote user to chef mutation
  const promoteToChefMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'chef' })
        .eq('id', userId);
        
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast({
        title: "User promoted",
        description: "User has been promoted to Chef",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error promoting user",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  // Promote user to admin mutation
  const promoteToAdminMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', userId);
        
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast({
        title: "User promoted",
        description: "User has been promoted to Admin",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error promoting user",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  // Update user profile mutation
  const updateUserProfileMutation = useMutation({
    mutationFn: async ({ userId, data }: { userId: string, data: any }) => {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', userId);
        
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast({
        title: "Profile updated",
        description: "User profile has been updated",
      });
      setEditDialogOpen(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error updating profile",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const filteredUsers = users?.filter(user => {
    if (!searchQuery) return true;
    
    const fullName = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const openEditDialog = (user: UserProfile) => {
    setSelectedUser(user);
    setFirstName(user.first_name || '');
    setLastName(user.last_name || '');
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (user: UserProfile) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleUpdateProfile = () => {
    if (selectedUser) {
      updateUserProfileMutation.mutate({
        userId: selectedUser.id,
        data: {
          first_name: firstName,
          last_name: lastName,
        }
      });
    }
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      deleteUserMutation.mutate(selectedUser.id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">User Management</h2>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add New User
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-sm"
            />
          </div>
          
          <Tabs defaultValue="all-users">
            <TabsList className="mb-6">
              <TabsTrigger value="all-users">All Users</TabsTrigger>
              <TabsTrigger value="admin-list">Administrators</TabsTrigger>
              <TabsTrigger value="chef-list">Chefs</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all-users">
              {renderUsersTable(
                filteredUsers, 
                isLoading, 
                (id) => promoteToChefMutation.mutate(id),
                (id) => promoteToAdminMutation.mutate(id),
                openEditDialog,
                promoteToChefMutation.isPending,
                promoteToAdminMutation.isPending,
                openDeleteDialog,
                user?.id
              )}
            </TabsContent>
            
            <TabsContent value="admin-list">
              {renderUsersTable(
                filteredUsers?.filter(user => user.role === 'admin'),
                isLoading,
                (id) => promoteToChefMutation.mutate(id),
                (id) => promoteToAdminMutation.mutate(id),
                openEditDialog,
                promoteToChefMutation.isPending,
                promoteToAdminMutation.isPending,
                openDeleteDialog,
                user?.id
              )}
            </TabsContent>
            
            <TabsContent value="chef-list">
              {renderUsersTable(
                filteredUsers?.filter(user => user.role === 'chef'),
                isLoading,
                (id) => promoteToChefMutation.mutate(id),
                (id) => promoteToAdminMutation.mutate(id),
                openEditDialog,
                promoteToChefMutation.isPending,
                promoteToAdminMutation.isPending,
                openDeleteDialog,
                user?.id
              )}
            </TabsContent>
            
            <TabsContent value="customers">
              {renderUsersTable(
                filteredUsers?.filter(user => user.role === 'user'),
                isLoading,
                (id) => promoteToChefMutation.mutate(id),
                (id) => promoteToAdminMutation.mutate(id),
                openEditDialog,
                promoteToChefMutation.isPending,
                promoteToAdminMutation.isPending,
                openDeleteDialog,
                user?.id
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User Profile</DialogTitle>
            <DialogDescription>
              Update user information. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="first-name" className="text-right">
                First Name
              </Label>
              <Input
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="last-name" className="text-right">
                Last Name
              </Label>
              <Input
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              onClick={handleUpdateProfile}
              disabled={updateUserProfileMutation.isPending}
            >
              {updateUserProfileMutation.isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this user?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user account
              and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteUser}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleteUserMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const renderUsersTable = (
  users: UserProfile[] | undefined, 
  isLoading: boolean,
  promoteToChef: (id: string) => void,
  promoteToAdmin: (id: string) => void,
  openEditDialog: (user: UserProfile) => void,
  isChefPromotionPending: boolean,
  isAdminPromotionPending: boolean,
  openDeleteDialog: (user: UserProfile) => void,
  currentUserId?: string
) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }
  
  if (!users || users.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No users found</div>;
  }
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-mono text-xs">{user.id.substring(0, 8)}...</TableCell>
              <TableCell className="font-medium">
                {user.first_name || user.last_name ? 
                  `${user.first_name || ''} ${user.last_name || ''}`.trim() : 
                  <span className="flex items-center text-muted-foreground">
                    <User className="h-3 w-3 mr-1" /> User {user.id.substring(0, 4)}
                  </span>
                }
              </TableCell>
              <TableCell>
                {user.role === 'admin' && (
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 flex items-center w-fit">
                    <ShieldAlert className="h-3 w-3 mr-1" /> Admin
                  </Badge>
                )}
                {user.role === 'chef' && (
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 flex items-center w-fit">
                    <ChefHat className="h-3 w-3 mr-1" /> Chef
                  </Badge>
                )}
                {user.role === 'user' && (
                  <Badge variant="outline" className="flex items-center w-fit">
                    <User className="h-3 w-3 mr-1" /> User
                  </Badge>
                )}
              </TableCell>
              <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  {user.role === 'user' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8"
                      onClick={() => promoteToChef(user.id)}
                      disabled={isChefPromotionPending}
                    >
                      {isChefPromotionPending ? "Processing..." : "Make Chef"}
                    </Button>
                  )}
                  {user.role !== 'admin' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8"
                      onClick={() => promoteToAdmin(user.id)}
                      disabled={isAdminPromotionPending}
                    >
                      {isAdminPromotionPending ? "Processing..." : "Make Admin"}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => openEditDialog(user)}
                  >
                    <UserCog className="h-4 w-4" />
                  </Button>
                  
                  {/* Don't allow users to delete themselves */}
                  {user.id !== currentUserId && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-red-600"
                      onClick={() => openDeleteDialog(user)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;
