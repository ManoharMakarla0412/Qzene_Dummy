
import { Recipe } from "@/types";
import RecipeCard from "./RecipeCard";

interface MarqueeRecipesProps {
  recipes: Recipe[];
  direction: "left" | "right";
}

const MarqueeRecipes = ({ recipes, direction }: MarqueeRecipesProps) => {
  return (
    <div className="py-8 overflow-hidden">
      <div className="marquee-container">
        <div className={`flex gap-4 ${direction === "left" ? "animate-marquee" : "animate-marquee-reverse"}`}>
          {/* Double the recipes for a seamless loop */}
          {[...recipes, ...recipes].map((recipe, index) => (
            <div key={`${recipe.id}-${index}`} className="min-w-[250px] max-w-[250px]">
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MarqueeRecipes;
