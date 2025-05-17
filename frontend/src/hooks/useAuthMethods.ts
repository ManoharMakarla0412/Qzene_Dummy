
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  role: "user" | "chef" | "admin";
  bio: string | null;
};

export function useAuthMethods() {
  const { toast } = useToast();

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (!error) {
        // After successful login, check if this is the special admin email
        if (email === "jan.amarnath@gmail.com") {
          // Check if this user already has admin role
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', (await supabase.auth.getSession()).data.session?.user.id)
            .single();
          
          // If not admin yet, update to admin
          if (profile && profile.role !== 'admin') {
            await supabase
              .from('profiles')
              .update({ role: 'admin' })
              .eq('id', profile.id);
            
            toast({
              title: "Admin access granted",
              description: "You now have admin privileges.",
            });
          }
        }
      }
      
      return { error };
    } catch (error) {
      console.error("Error signing in:", error);
      return { error };
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });
      
      if (!error) {
        toast({
          title: "Account created",
          description: "Please verify your email to complete the registration.",
        });
      }
      
      return { data, error };
    } catch (error) {
      console.error("Error signing up:", error);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      return { error: null };
    } catch (error) {
      console.error("Error signing out:", error);
      return { error };
    }
  };

  const updateProfile = async (updates: Partial<Profile>, profile: Profile | null) => {
    if (!profile) return { error: new Error("User not logged in") };

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq("id", profile.id);

      if (!error) {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        });
      }

      return { error };
    } catch (error) {
      console.error("Error updating profile:", error);
      return { error };
    }
  };

  const becomeChef = async (chefData: any, userId: string, email: string | undefined, profile: Profile | null) => {
    if (!userId) return { error: new Error("User not logged in") };

    try {
      // Insert into chefs table
      const { error } = await supabase
        .from('chefs')
        .insert({
          user_id: userId,
          name: `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim() || 'New Chef',
          bio: chefData.bio || null,
          specialties: chefData.specialties || [],
          contact_email: email,
        });

      if (!error && profile) {
        // Update user role to chef
        const profileUpdate = await updateProfile({ role: "chef" }, profile);
        
        if (!profileUpdate.error) {
          toast({
            title: "Chef status granted",
            description: "You are now a chef and can create recipes.",
          });
        }
        
        return profileUpdate;
      }

      return { error };
    } catch (error) {
      console.error("Error becoming chef:", error);
      return { error };
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    updateProfile,
    becomeChef,
  };
}
