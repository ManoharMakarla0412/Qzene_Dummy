import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Search, Bell, ShoppingCart, Moon, Sun, Menu, LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AdminHeaderProps {
  className?: string;
}

const AdminHeader = ({ className }: AdminHeaderProps) => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  
  useEffect(() => {
    // Show a welcome toast when the component mounts
    if (profile?.role === "admin") {
      toast({
        title: "Welcome to Admin Dashboard",
        description: `Logged in as ${profile.first_name || ""} ${profile.last_name || ""}`,
      });
    }
  }, []);
  
  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out",
    });
    navigate("/");
  };
  
  const getInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
    }
    return "AD";
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    toast({
      title: isDarkMode ? "Light Mode Activated" : "Dark Mode Activated",
      description: isDarkMode ? "Switched to light theme" : "Switched to dark theme",
    });
  };

  const toggleMobileSidebar = () => {
    // This will be handled by the parent component that has the SidebarProvider
    const event = new CustomEvent('toggle-sidebar');
    window.dispatchEvent(event);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    toast({
      title: "Search initiated",
      description: `Searching for: ${searchQuery}`,
    });
    // Actually implement search in the future
  };

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 3 unread notifications",
    });
    setNotificationCount(0);
  };

  const handleCartClick = () => {
    toast({
      title: "Shopping Cart",
      description: "Your cart has been opened",
    });
    navigate("/cart");
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className || ''}`}>
      <div className="flex h-16 max-w-7xl mx-auto items-center px-4 sm:px-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden mr-3" 
          onClick={toggleMobileSidebar}
        >
          <Menu size={20} />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
        
        <div className="flex flex-1 items-center justify-between gap-x-4 self-stretch">
          <div className="flex items-center">
            <div className="text-xl font-bold mr-4 md:mr-6 text-primary whitespace-nowrap">Admin Panel</div>
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search recipes, chefs, users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[180px] sm:w-[300px] pl-8 focus-visible:ring-1"
              />
            </form>
          </div>
          
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearch} className="relative md:hidden">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[140px] pl-8 focus-visible:ring-1"
              />
            </form>
            
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="text-foreground">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            
            <Button variant="ghost" size="icon" onClick={handleCartClick} className="text-foreground">
              <ShoppingCart size={20} />
            </Button>
            
            <Button variant="ghost" size="icon" onClick={handleNotificationClick} className="text-foreground relative">
              <Bell size={20} />
              {notificationCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {notificationCount}
                </span>
              )}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url || ''} alt="Profile" />
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {profile?.first_name || ''} {profile?.last_name || ''}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Administrator
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/admin")} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Admin Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  User Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/")} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  View Site
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/create-recipe")} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Create Recipe
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
