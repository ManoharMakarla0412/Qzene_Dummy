
import { Recipe } from "@/types";
import RecipeCard from "./RecipeCard";

interface RecipeGridProps {
  recipes: Recipe[];
  title: string;
  subtitle?: string;
  minCount?: number;
}

const RecipeGrid = ({ recipes, title, subtitle, minCount = 4 }: RecipeGridProps) => {
  // Show available recipes without duplicating them
  const displayRecipes = [...recipes];
  
  return (
    <div className="py-8">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayRecipes.map((recipe, index) => (
          <RecipeCard key={`${recipe.id}-${index}`} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default RecipeGrid;
