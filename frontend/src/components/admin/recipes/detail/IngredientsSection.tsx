
import { Separator } from "@/components/ui/separator";

interface IngredientsSectionProps {
  ingredients: any[];
}

const IngredientsSection = ({ ingredients }: IngredientsSectionProps) => {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Ingredients</h3>
      <ul className="space-y-2">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-primary"></span>
            </div>
            <span>{typeof ingredient === 'string' ? ingredient : JSON.stringify(ingredient)}</span>
          </li>
        ))}
        {ingredients.length === 0 && (
          <p className="text-muted-foreground">No ingredients specified</p>
        )}
      </ul>
      <Separator className="my-6" />
    </div>
  );
};

export default IngredientsSection;
