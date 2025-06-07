import { useState } from "react";
import { getFeaturedRecipes, getChefCreatedRecipes, getRecipesByCuisine, recipes } from "@/data/recipes";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RecipeGrid from "@/components/RecipeGrid";
import RecipeCard from "@/components/RecipeCard";
import DragDropMealPlanner from "@/components/DragDropMealPlanner";
import DeviceSection from "@/components/DeviceSection";
import MarqueeRecipes from "@/components/MarqueeRecipes";
import Footer from "@/components/Footer";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const featuredRecipes = getFeaturedRecipes();
  const chefCuratedRecipes = getChefCreatedRecipes();
  
  // Get a complete row of recipes for each cuisine section
  // For a 4-column grid, we need at least 4 recipes per cuisine
  const indianRecipes = getRecipesByCuisine("Indian");
  const italianRecipes = getRecipesByCuisine("Italian").slice(0, 8);
  const mexicanRecipes = getRecipesByCuisine("Mexican").slice(0, 8);
  
  // For the marquee, get a variety of recipes
  const marqueeRecipes1 = recipes.slice(0, 10);
  const marqueeRecipes2 = recipes.slice(10, 20);
  
  // Filter recipes if search is active
  const filteredRecipes = searchQuery
    ? recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Navbar onSearch={handleSearch} />
      
      <main className="flex-1">
        {searchQuery ? (
          <div className="w-full py-8 px-4 lg:px-8">
            <h1 className="text-2xl font-bold mb-4">Search Results for "{searchQuery}"</h1>
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {filteredRecipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No recipes found matching your search.</p>
            )}
          </div>
        ) : (
          <>
            <Hero />
            
            <div className="space-y-12">
              {/* Featured Recipes Section */}
              <section className="w-full px-4 lg:px-8 py-12">
                <RecipeGrid 
                  recipes={featuredRecipes} 
                  title="Featured Recipes" 
                  subtitle="Our most popular and highly-rated recipes"
                  minCount={8}
                />
              </section>
              
              {/* Trending Recipes Section */}
              <section className="w-full bg-gray-50 py-12">
                <div className="px-4 lg:px-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-8">Trending Recipes</h2>
                  <MarqueeRecipes recipes={marqueeRecipes1} direction="left" />
                </div>
              </section>
              
              {/* Chef Curated Section */}
              <section className="w-full px-4 lg:px-8 py-12">
                <RecipeGrid 
                  recipes={chefCuratedRecipes} 
                  title="Chef Curated Recipes" 
                  subtitle="Exclusive recipes created by professional chefs"
                  minCount={4}
                />
              </section>
              
              {/* Meal Planner Section */}
              <DragDropMealPlanner />
              
              {/* Device Section */}
              <DeviceSection />
              
              {/* Discover Flavors Section */}
              <section className="w-full bg-gray-50 py-12">
                <div className="px-4 lg:px-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-8">Discover New Flavors</h2>
                  <MarqueeRecipes recipes={marqueeRecipes2} direction="right" />
                </div>
              </section>
              
              {/* Cuisine Sections */}
              <section className="w-full px-4 lg:px-8 py-12">
                <div className="space-y-16">
                  <RecipeGrid 
                    recipes={indianRecipes} 
                    title="Indian Specials" 
                    subtitle="Authentic Indian dishes with rich flavors and spices"
                    minCount={4}
                  />
                  
                  <RecipeGrid 
                    recipes={italianRecipes} 
                    title="Italian Favorites" 
                    subtitle="Classic Italian cuisine that everyone loves"
                    minCount={4}
                  />
                  
                  <RecipeGrid 
                    recipes={mexicanRecipes} 
                    title="Mexican Delights" 
                    subtitle="Bold and vibrant Mexican recipes"
                    minCount={4}
                  />
                </div>
              </section>
              
              {/* Community Section */}
              <section className="w-full bg-qzene-purple/10 py-16">
                <div className="px-4 lg:px-8">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Culinary Community</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Connect with passionate home cooks, professional chefs, and food enthusiasts.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
                    {/* Community Cards */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                      <div className="w-16 h-16 bg-qzene-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        {/* Profile Icon SVG */}
                      </div>
                      <h3 className="text-xl font-bold mb-3">Create a Profile</h3>
                      <p className="text-gray-600 mb-4">Showcase your culinary journey and favorite recipes.</p>
                      <button className="w-full px-4 py-2 rounded-md bg-qzene-purple-dark text-white hover:bg-qzene-purple/90 transition-colors">
                        Get Started
                      </button>
                    </div>
                    
                    {/* Similar cards for Share Recipes and Join Events */}
                    {/* ... */}
                  </div>
                  
                  {/* Newsletter Subscription */}
                  <div className="mt-12 text-center max-w-xl mx-auto">
                    <div className="flex items-center justify-center gap-2">
                      <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="flex-1 px-4 py-2.5 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-qzene-purple/50"
                      />
                      <button className="bg-qzene-purple-dark text-white px-6 py-2.5 rounded-r-md hover:bg-qzene-purple/90 transition-colors whitespace-nowrap">
                        Subscribe
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Join 10,000+ subscribers receiving our weekly recipe newsletter
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default Index;
