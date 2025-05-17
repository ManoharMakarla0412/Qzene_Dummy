
import { createContext, useContext, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { useAuthState } from "@/hooks/useAuthState";
import { useAuthMethods } from "@/hooks/useAuthMethods";

type UserRole = "user" | "chef" | "admin";

type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  bio: string | null;
};

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isAdmin: boolean;
  isChef: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ error: any, data: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
  becomeChef: (chefData: any) => Promise<{ error: any }>;
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { session, user, profile, loading, setProfile } = useAuthState();
  const { signIn, signUp, signOut: supabaseSignOut, updateProfile: updateProfileMethod, becomeChef: becomeChefMethod } = useAuthMethods();

  const isAdmin = profile?.role === "admin";
  const isChef = profile?.role === "chef" || profile?.role === "admin";

  const updateProfile = async (updates: Partial<Profile>) => {
    const result = await updateProfileMethod(updates, profile);
    if (!result.error && profile) {
      setProfile({ ...profile, ...updates });
    }
    return result;
  };

  const signOut = async () => {
    await supabaseSignOut();
  };

  const becomeChef = async (chefData: any) => {
    if (!user) return { error: new Error("User not logged in") };
    return becomeChefMethod(chefData, user.id, user.email, profile);
  };

  const value = {
    session,
    user,
    profile,
    isAdmin,
    isChef,
    signIn,
    signUp,
    signOut,
    loading,
    updateProfile,
    becomeChef,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
