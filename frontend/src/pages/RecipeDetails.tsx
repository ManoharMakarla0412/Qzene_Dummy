import { useParams } from "react-router-dom";
import { recipes } from "@/data/recipes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Utensils, Users } from "lucide-react";

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-8 flex-grow">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Recipe not found</h1>
            <p className="text-gray-500">The recipe you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recipe Image Section */}
          <div className="relative">
            <img 
              src={recipe.image} 
              alt={recipe.name} 
              className="w-full h-[400px] object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
              }}
            />
            {recipe.deviceSupport !== 'None' && (
              <div className="absolute top-4 right-4">
                {recipe.deviceSupport === 'MoMe' && (
                  <Badge className="bg-green-600">MoMe</Badge>
                )}
                {recipe.deviceSupport === 'Simmr' && (
                  <Badge className="bg-amber-600">Simmr</Badge>
                )}
                {recipe.deviceSupport === 'Both' && (
                  <Badge className="bg-qzene-purple">MoMe & Simmr</Badge>
                )}
              </div>
            )}
            {recipe.chefCreated && (
              <Badge className="absolute bottom-4 left-4 bg-qzene-gold text-black">
                Chef Curated
              </Badge>
            )}
          </div>

          {/* Recipe Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{recipe.name}</h1>
              <div className="flex items-center gap-4 text-gray-500">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                  <span>{recipe.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-5 w-5" />
                  <span>{recipe.cookingTime} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-5 w-5" />
                  <span>{recipe.servings} servings</span>
                </div>
                <Badge variant="outline">{recipe.difficulty}</Badge>
                <Badge>{recipe.cuisine}</Badge>
              </div>
            </div>

            {/* Nutritional Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="font-bold mb-3">Nutritional Information</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Calories</p>
                  <p className="font-bold">{recipe.calories}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Protein</p>
                  <p className="font-bold">{recipe.protein}g</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Carbs</p>
                  <p className="font-bold">{recipe.carbs}g</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Fat</p>
                  <p className="font-bold">{recipe.fat}g</p>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <h2 className="font-bold text-xl mb-3">Ingredients</h2>
              <ul className="list-disc pl-5 space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700">{ingredient}</li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h2 className="font-bold text-xl mb-3">Instructions</h2>
              <ol className="list-decimal pl-5 space-y-3">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="text-gray-700">{instruction}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecipeDetails;