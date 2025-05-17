import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Switch } from "@/components/ui/switch";

const Auth = () => {
  const { signIn, signUp, session } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  
  if (session) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="min-h-screen bg-slate-50 py-12 flex items-center justify-center">
      <div className="mx-auto w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-2">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm signIn={signIn} toast={toast} navigate={navigate} />
            </TabsContent>
            <TabsContent value="signup">
              <SignupForm signUp={signUp} toast={toast} navigate={navigate} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const LoginForm = ({ signIn, toast, navigate }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        toast({
          title: "Login failed",
          description: error.message || "Invalid email or password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="p-6 space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Welcome back</h2>
        <p className="text-sm text-gray-500">Enter your credentials to access your account</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-xs text-qzene-purple-dark hover:underline">
              Forgot password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <Button
          type="submit"
          className="w-full bg-qzene-purple-dark hover:bg-qzene-purple/90"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
};

const SignupForm = ({ signUp, toast, navigate }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error, data } = await signUp(email, password, firstName, lastName);
      
      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message || "Failed to create account",
          variant: "destructive",
        });
      } else {
        // If admin is selected, update the user's role
        if (isAdmin && data?.user?.id) {
          const { error: roleError } = await supabase
            .from('profiles')
            .update({ role: 'admin' })
            .eq('id', data.user.id);
          
          if (roleError) {
            toast({
              title: "Admin role assignment failed",
              description: "Account created but admin role couldn't be assigned",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Admin account created",
              description: "Your admin account has been created successfully",
            });
          }
        } else {
          toast({
            title: "Account created",
            description: "Please check your email to verify your account",
          });
        }
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="p-6 space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Create an account</h2>
        <p className="text-sm text-gray-500">Enter your details to get started</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <p className="text-xs text-gray-500">
            Password must be at least 6 characters long
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="admin-mode" 
            checked={isAdmin} 
            onCheckedChange={setIsAdmin}
          />
          <Label htmlFor="admin-mode" className="text-sm font-medium">
            Create as Admin (Development mode)
          </Label>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-qzene-purple-dark hover:bg-qzene-purple/90"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create Account"}
        </Button>
      </form>
    </div>
  );
};

export default Auth;
