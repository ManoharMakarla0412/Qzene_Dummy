import { useParams, Link, useNavigate } from "react-router-dom";  // Add useNavigate import
import { recipes } from "@/data/recipes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, ChefHat, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecipeGrid from "@/components/RecipeGrid";

const RecipeDetail = () => {
  const navigate = useNavigate();  // Add this hook
  const { id } = useParams<{ id: string }>();
  const recipe = recipes.find(r => r.id === id);
  
  // Get related recipes (same cuisine)
  const relatedRecipes = recipe 
    ? recipes.filter(r => r.cuisine === recipe.cuisine && r.id !== recipe.id).slice(0, 4)
    : [];
    
  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar onSearch={() => {}} />
        <div className="container py-16 flex-grow">
          <h1 className="text-2xl font-bold mb-4">Recipe Not Found</h1>
          <p className="text-gray-500 mb-4">The recipe you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button className="bg-qzene-purple hover:bg-qzene-purple/90">
              Back to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={() => {}} />
      
      <div className="container py-8 flex-grow">
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="text-qzene-purple hover:underline flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left">
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to Recipes
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="relative">
              <img 
                src={recipe.image} 
                alt={recipe.name} 
                className="w-full h-auto rounded-lg shadow-lg"
              />
              
              {recipe.deviceSupport !== 'None' && (
                <div className="absolute top-4 right-4">
                  {recipe.deviceSupport === 'MoMe' && (
                    <Badge className="bg-green-500 hover:bg-green-600">MoMe Compatible</Badge>
                  )}
                  {recipe.deviceSupport === 'Simmr' && (
                    <Badge className="bg-amber-500 hover:bg-amber-600">Simmr Compatible</Badge>
                  )}
                  {recipe.deviceSupport === 'Both' && (
                    <Badge className="bg-qzene-purple hover:bg-qzene-purple/90">MoMe & Simmr Compatible</Badge>
                  )}
                </div>
              )}
              
              {recipe.chefCreated && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-qzene-gold text-black flex items-center gap-1">
                    <ChefHat className="h-3 w-3" />
                    Chef Curated
                  </Badge>
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline">{recipe.cuisine}</Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                  {recipe.rating.toFixed(1)}
                </Badge>
                <Badge variant="outline" className={
                  recipe.difficulty === 'Easy' 
                    ? 'bg-green-100 text-green-800 border-green-200' 
                    : recipe.difficulty === 'Medium'
                    ? 'bg-amber-100 text-amber-800 border-amber-200'
                    : 'bg-red-100 text-red-800 border-red-200'
                }>
                  {recipe.difficulty}
                </Badge>
              </div>
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-2">{recipe.name}</h1>
            
            <div className="flex flex-wrap gap-4 mt-4 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-5 w-5" />
                <div>
                  <p className="text-sm text-gray-500">Cooking Time</p>
                  <p className="font-medium">{recipe.cookingTime} minutes</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="h-5 w-5" />
                <div>
                  <p className="text-sm text-gray-500">Servings</p>
                  <p className="font-medium">{recipe.servings} people</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Info className="h-5 w-5" />
                <div>
                  <p className="text-sm text-gray-500">Calories</p>
                  <p className="font-medium">{recipe.calories} kcal</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-medium mb-2">Protein</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(recipe.protein / 50) * 100}%` }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{recipe.protein}g</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Carbs</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(recipe.carbs / 100) * 100}%` }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{recipe.carbs}g</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Fat</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: `${(recipe.fat / 50) * 100}%` }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{recipe.fat}g</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Calories</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${(recipe.calories / 800) * 100}%` }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{recipe.calories} kcal</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-green-500 mt-0.5">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-3">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="bg-qzene-purple text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p>{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>
            
            <div className="flex gap-4 mt-8">
              <Button className="bg-qzene-purple hover:bg-qzene-purple/90">
                Start Cooking
              </Button>
              <Button variant="outline" className="border-qzene-purple text-qzene-purple hover:bg-qzene-purple/10">
                Save Recipe
              </Button>
            </div>
          </div>
        </div>
        
        {relatedRecipes.length > 0 && (
          <RecipeGrid 
            recipes={relatedRecipes} 
            title="Similar Recipes" 
            subtitle={`More ${recipe.cuisine} recipes you might enjoy`}
          />
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default RecipeDetail;
