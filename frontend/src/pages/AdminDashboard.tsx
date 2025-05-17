import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSummary from "@/components/admin/AdminSummary";
import RecipeManagement from "@/components/admin/recipes/RecipeManagement";
import UserManagement from "@/components/admin/UserManagement";
import ChefManagement from "@/components/admin/chefs/ChefManagement";
import OrderManagement from "@/components/admin/OrderManagement";
import FeedbackControl from "@/components/admin/FeedbackControl";
import SiteManagement from "@/components/admin/SiteManagement";
import { Button } from "@/components/ui/button";
import { Clock, Heart, Lock, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const cuisines = [
  "Indian",
  "Chinese",
  "Thai",
  "Mexican",
  "Italian",
  "Japanese",
  "American",
  "French",
  "Greek",
  "Lebanese",
  "Turkish",
  "Spanish",
  "European",
];

const AdminDashboard = () => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("summary");
  const [selectedCuisine, setSelectedCuisine] = useState(null);

  console.log("AdminDashboard - Current profile:", profile);

  useEffect(() => {
    const handleToggleSidebar = () => {
      const sidebarTrigger = document.querySelector('[data-sidebar="trigger"]');
      if (sidebarTrigger) {
        (sidebarTrigger as HTMLElement).click();
      }
    };
    window.addEventListener("toggle-sidebar", handleToggleSidebar);
    return () =>
      window.removeEventListener("toggle-sidebar", handleToggleSidebar);
  }, []);

  const { data: recipes, isLoading } = useQuery({
    queryKey: ["admin-recipes", selectedCuisine],
    queryFn: async () => {
      let query = supabase
        .from("recipes")
        .select(
          `
          *,
          chefs (
            name,
            user_id
          )
        `
        )
        .order("created_at", { ascending: false });

      if (selectedCuisine) {
        query = query.eq("category", selectedCuisine.toLowerCase());
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const handleCuisineSelect = (cuisine) => {
    setSelectedCuisine(cuisine);
    toast({
      title: cuisine ? `Selected ${cuisine} cuisine` : "Showing all cuisines",
      description: cuisine
        ? `Filtering recipes by ${cuisine} cuisine`
        : "Showing recipes from all cuisines",
    });
  };

  const handleRecipeLike = (recipeId) => {
    toast({
      title: "Recipe Liked",
      description: "This recipe has been added to your favorites",
    });
  };


const renderMainContent = ({ activeSection, recipes, cuisines, selectedCuisine, isLoading, handleCuisineSelect, handleRecipeLike }) => {
  switch (activeSection) {
    case "recipe-management":
      return <RecipeManagement />;
    case "user-management":
      return <UserManagement />;
    case "chef-management":
    case "top-chefs":
      return <ChefManagement />;
    case "order-management":
      return <OrderManagement />;
    case "feedback-control":
    case "feed":
      return <FeedbackControl />;
    case "site-management":
      return <SiteManagement />;
    default:
      return (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              Recipes Explorer
            </h2>
            <div className="w-full lg:w-1/3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search recipes..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Cuisine Filters */}
          <div className="overflow-x-auto -mx-4 px-4 pb-2">
            <div className="flex gap-2 min-w-max">
              <Button
                variant={selectedCuisine === null ? "default" : "outline"}
                onClick={() => handleCuisineSelect(null)}
                className="rounded-full text-sm h-8"
              >
                All
              </Button>
              {cuisines.map((cuisine) => (
                <Button
                  key={cuisine}
                  variant={selectedCuisine === cuisine ? "default" : "outline"}
                  onClick={() => handleCuisineSelect(cuisine)}
                  className="rounded-full text-sm h-8"
                >
                  {cuisine}
                </Button>
              ))}
            </div>
          </div>

          {/* Recipe Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-[400px]:gap-6 auto-rows-fr max-w-[1800px] mx-auto">
              {recipes?.map((recipe) => (
                <div
                  key={recipe.id}
                  className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative pt-[60%] overflow-hidden">
                    <img
                      src={recipe.image_url || "/placeholder.svg"}
                      alt={recipe.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                      sizes="(max-width: 400px) 100vw, (max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Overlay for better text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                    {/* Status Badge */}
                    {!recipe.is_approved && (
                      <div className="absolute top-2 right-2 z-10">
                        <div className="rounded-full bg-amber-100/90 backdrop-blur-sm p-1.5">
                          <Lock className="h-3.5 w-3.5 text-amber-800" />
                        </div>
                      </div>
                    )}

                    {/* Like Button */}
                    <button
                      className="absolute top-2 left-2 rounded-full bg-white/80 p-1.5 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:scale-110"
                      onClick={() => handleRecipeLike(recipe.id)}
                    >
                      <Heart className="h-3.5 w-3.5 text-gray-600" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow p-4">
                    <h3 className="font-medium text-sm min-[400px]:text-base sm:text-lg line-clamp-1">
                      {recipe.name}
                    </h3>
                    <p className="text-xs min-[400px]:text-sm text-gray-600   line-clamp-1">
                      {recipe.chefs?.name || "Unknown Chef"}
                    </p>

                    {/* Info Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <span className="text-amber-500">★</span>
                        <span className="text-xs min-[400px]:text-sm font-medium">
                          {(Math.random() * 2 + 3).toFixed(1)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3.5 min-[400px]:h-4 w-3.5 min-[400px]:w-4 text-gray-400" />
                        <span className="text-xs min-[400px]:text-sm text-gray-600">
                          {recipe.cooking_time || Math.floor(Math.random() * 30 + 15)}m
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
  }
}

  return (
    <div className="h-screen overflow-hidden bg-gray-100">
      <AdminHeader />

      <div className="flex h-[calc(100vh-4rem)]">
        <SidebarProvider defaultOpen={true}>
          <Sidebar className="border-r border-gray-200 bg-white">
            <SidebarContent>
              <AdminSidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
              />
            </SidebarContent>
          </Sidebar>

          <main className="flex-1 overflow-auto min-h-screen">
      <div className="container mx-auto p-4 xs:p-5 sm:p-6">
        {renderMainContent({ activeSection, recipes, cuisines, selectedCuisine, isLoading, handleCuisineSelect, handleRecipeLike })}
      </div>
    </main>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default AdminDashboard;
