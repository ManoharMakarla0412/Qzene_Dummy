import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavbarProps {
  onSearch?: (query: string) => void;  // Make onSearch optional with '?'
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);  // Use optional chaining here
  };

  const isAdmin = profile?.role === "admin";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/24708f27-bbd0-4ca9-aafb-64a3f0d94ba8.png" 
              alt="Qzene Logo" 
              className="h-10"
            />
          </Link>
          
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-qzene-purple-dark">
              Home
            </Link>
            <Link to="/all-recipes" className="text-sm font-medium transition-colors hover:text-qzene-purple-dark">
              All Recipes
            </Link>
            <Link to="/cuisines" className="text-sm font-medium transition-colors hover:text-qzene-purple-dark">
              Cuisines
            </Link>
            <Link to="/devices" className="text-sm font-medium transition-colors hover:text-qzene-purple-dark">
              Devices
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-sm font-medium text-amber-600 transition-colors hover:text-amber-700">
                Admin
              </Link>
            )}
            <a href="#meal-planner" className="text-sm font-medium transition-colors hover:text-qzene-purple-dark">
              Meal Planner
            </a>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {/* <form onSubmit={handleSubmit} className="relative w-full max-w-sm hidden md:flex">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search recipes..."
              className="w-full pl-8 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form> */}
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url || ""} alt={profile?.first_name || "User"} />
                    <AvatarFallback>{getInitials(profile?.first_name, profile?.last_name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {profile?.first_name} {profile?.last_name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>
                {profile?.role === "admin" && (
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    Admin Dashboard
                  </DropdownMenuItem>
                )}
                {(profile?.role === "chef" || profile?.role === "admin") && (
                  <DropdownMenuItem onClick={() => navigate("/create-recipe")}>
                    Create Recipe
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => {
                    signOut();
                    navigate("/");
                  }}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              {/* <Button 
                variant="ghost" 
                className="text-sm text-muted-foreground hidden md:flex"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button> */}
              <Button 
                className="bg-qzene-purple-dark hover:bg-qzene-purple/90"
                onClick={() => navigate("/")}
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

// Helper function to get initials from name
const getInitials = (firstName?: string | null, lastName?: string | null): string => {
  const first = firstName && firstName.length > 0 ? firstName[0].toUpperCase() : '';
  const last = lastName && lastName.length > 0 ? lastName[0].toUpperCase() : '';
  
  if (first && last) return `${first}${last}`;
  if (first) return first;
  if (last) return last;
  return 'U';
};

export default Navbar;
