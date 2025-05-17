
import { Link } from "react-router-dom";
import { Recipe } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, ImageOff } from "lucide-react";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  // Function to check if an image exists or provide a fallback
  const getImageUrl = (imageUrl: string) => {
    // Default fallback image if the recipe image is missing
    const fallbackImage = "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
    
    // Check if the image URL is empty or undefined
    if (!imageUrl || imageUrl.trim() === "") {
      return fallbackImage;
    }
    
    return imageUrl;
  };

  return (
    <Link to={`/recipes/${recipe.id}`}>
      <Card className="overflow-hidden h-full recipe-card hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <div className="w-full h-48 bg-gray-100 relative">
            <img 
              src={getImageUrl(recipe.image)} 
              alt={recipe.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                // If image fails to load, replace with fallback
                e.currentTarget.src = "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
              }}
            />
          </div>
          
          {recipe.deviceSupport !== 'None' && (
            <div className="device-badge absolute top-2 right-2">
              {recipe.deviceSupport === 'MoMe' && (
                <Badge className="bg-green-600 hover:bg-green-700">MoMe</Badge>
              )}
              {recipe.deviceSupport === 'Simmr' && (
                <Badge className="bg-amber-600 hover:bg-amber-700">Simmr</Badge>
              )}
              {recipe.deviceSupport === 'Both' && (
                <Badge className="bg-qzene-purple-dark hover:bg-qzene-purple/90">MoMe & Simmr</Badge>
              )}
            </div>
          )}
          
          {recipe.chefCreated && (
            <Badge className="absolute bottom-2 left-2 bg-qzene-gold text-black">Chef Curated</Badge>
          )}
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-1 line-clamp-1">{recipe.name}</h3>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-4 w-4 fill-amber-500" />
            <span className="text-sm">{recipe.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <Badge variant="outline" className="text-xs">{recipe.cuisine}</Badge>
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="h-3 w-3" />
              <span className="text-xs">{recipe.cookingTime} min</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-0 pb-4 px-4">
          <div className="text-xs text-gray-500 w-full">
            <div className="flex justify-between items-center">
              <span>Calories: {recipe.calories}</span>
              <span>Protein: {recipe.protein}g</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span>Carbs: {recipe.carbs}g</span>
              <span>Fat: {recipe.fat}g</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default RecipeCard;
