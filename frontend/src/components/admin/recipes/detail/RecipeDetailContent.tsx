
import { CardContent } from "@/components/ui/card";
import RecipeAttributes from "./RecipeAttributes";
import IngredientsSection from "./IngredientsSection";
import InstructionsSection from "./InstructionsSection";
import CategoriesSection from "./CategoriesSection";
import ChefSection from "./ChefSection";
import RecipeDates from "./RecipeDates";

interface RecipeDetailContentProps {
  recipe: {
    cooking_time: number | null;
    servings: number | null;
    difficulty: string | null;
    price: number | null;
    ingredients: any;
    instructions: any;
    category: string | null;
    tags: string[] | null;
    chef_id: string | null;
    chefs: {
      name: string;
      profile_image_url: string | null;
    } | null;
    created_at: string;
    updated_at: string;
  };
}

const RecipeDetailContent = ({ recipe }: RecipeDetailContentProps) => {
  // Convert JSON ingredients and instructions to arrays if they're not already
  const ingredientsList = Array.isArray(recipe.ingredients) 
    ? recipe.ingredients 
    : typeof recipe.ingredients === 'object' && recipe.ingredients !== null
      ? Object.values(recipe.ingredients)
      : [];
      
  const instructionsList = Array.isArray(recipe.instructions) 
    ? recipe.instructions 
    : typeof recipe.instructions === 'object' && recipe.instructions !== null
      ? Object.values(recipe.instructions)
      : [];

  return (
    <CardContent className="space-y-6">
      <RecipeAttributes
        cookingTime={recipe.cooking_time}
        servings={recipe.servings}
        difficulty={recipe.difficulty}
        price={recipe.price}
      />
      
      <IngredientsSection ingredients={ingredientsList} />
      
      <InstructionsSection instructions={instructionsList} />
      
      <CategoriesSection 
        category={recipe.category}
        tags={recipe.tags}
      />
      
      <ChefSection 
        chefId={recipe.chef_id}
        chefName={recipe.chefs?.name}
        chefImage={recipe.chefs?.profile_image_url}
      />
      
      <RecipeDates 
        createdAt={recipe.created_at}
        updatedAt={recipe.updated_at}
      />
    </CardContent>
  );
};

export default RecipeDetailContent;
