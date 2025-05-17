
import { useState } from "react";
import { cuisines, getRecipesByCuisine } from "@/data/recipes";
import { CuisineType } from "@/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";

const CuisinesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineType | null>(null);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  // Get cuisines and their descriptions
  const cuisineDescriptions: Record<CuisineType, string> = {
    "Indian": "Indian cuisine consists of a variety of regional and traditional foods native to the Indian subcontinent. It uses spices, herbs, vegetables, and fruits to create rich and flavorful dishes.",
    "Mexican": "Mexican cuisine is primarily a fusion of indigenous Mesoamerican cooking with European, especially Spanish, cooking developed after the Spanish conquest of the Aztec Empire.",
    "Italian": "Italian cuisine is characterized by its simplicity, with many dishes having only two to four main ingredients. Italian cooks rely chiefly on the quality of the ingredients rather than on elaborate preparation.",
    "Chinese": "Chinese cuisine encompasses the numerous cuisines originating from China, as well as overseas cuisines created by the Chinese diaspora. Because of the Chinese diaspora and historical power of the country, Chinese cuisine has influenced many other cuisines in Asia.",
    "Thai": "Thai cooking places emphasis on lightly prepared dishes with strong aromatic components and a spicy edge. Thai cuisine is known for being complex and for featuring a balance of various flavors including sweet, sour, spicy, and salty.",
    "American": "American cuisine consists of the cooking style and traditional dishes prepared in the United States. It has been significantly influenced by Europeans, indigenous Native Americans, Africans, Asians, and many other cultures and traditions.",
    "Mediterranean": "Mediterranean cuisine is the foods and methods of preparation by people of the Mediterranean Basin. The idea of Mediterranean cuisine originates with the cookery writer Elizabeth David's book, A Book of Mediterranean Food.",
    "Japanese": "Japanese cuisine is based on combining staple foods, typically rice or noodles, with a soup and okazu—dishes made from fish, vegetable, tofu, and the like—to add flavor to the staple food.",
    "French": "French cuisine consists of the cooking traditions and practices from France. Its cuisine has been influenced by the surrounding cultures of Italy, Spain, Switzerland, Germany, and Belgium.",
    "Korean": "Korean cuisine is largely based on rice, vegetables, and meats. Traditional Korean meals are named for the number of side dishes that accompany steam-cooked short-grain rice."
  };
  
  // Get cuisine images
  const cuisineImages: Record<CuisineType, string> = {
    "Indian": "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    "Mexican": "https://images.unsplash.com/photo-1464219551459-ac14ae01fbe0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    "Italian": "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    "Chinese": "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    "Thai": "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    "American": "https://images.unsplash.com/photo-1550317138-10000687a72b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    "Mediterranean": "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    "Japanese": "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    "French": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    "Korean": "https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
  };
  
  const filteredRecipes = selectedCuisine 
    ? getRecipesByCuisine(selectedCuisine)
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={handleSearch} />
      
      <div className="container py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Explore Cuisines</h1>
        
        {!selectedCuisine ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cuisines.map(cuisine => (
              <div 
                key={cuisine} 
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedCuisine(cuisine)}
              >
                <div className="h-48 w-full relative">
                  <img 
                    src={cuisineImages[cuisine]} 
                    alt={cuisine} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <h2 className="text-white text-2xl font-bold">{cuisine}</h2>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 line-clamp-3">
                    {cuisineDescriptions[cuisine]}
                  </p>
                  <Button 
                    className="mt-4 w-full bg-qzene-purple hover:bg-qzene-purple/90"
                    onClick={() => setSelectedCuisine(cuisine)}
                  >
                    View Recipes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <Button 
                variant="outline" 
                onClick={() => setSelectedCuisine(null)}
                className="flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left">
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
                Back to All Cuisines
              </Button>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-lg mb-8">
              <div className="h-64 w-full relative">
                <img 
                  src={cuisineImages[selectedCuisine]} 
                  alt={selectedCuisine} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h2 className="text-white text-4xl font-bold">{selectedCuisine} Cuisine</h2>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600">
                  {cuisineDescriptions[selectedCuisine]}
                </p>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4">{selectedCuisine} Recipes</h3>
            
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredRecipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold mb-2">No recipes found</h3>
                <p className="text-gray-500 mb-4">
                  We couldn't find any recipes for this cuisine.
                </p>
                <Button onClick={() => setSelectedCuisine(null)} className="bg-qzene-purple hover:bg-qzene-purple/90">
                  Explore Other Cuisines
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default CuisinesPage;
