
import { Separator } from "@/components/ui/separator";
import { Clock, Users, Tag, DollarSign } from "lucide-react";

interface RecipeAttributesProps {
  cookingTime: number | null;
  servings: number | null;
  difficulty: string | null;
  price: number | null;
}

const RecipeAttributes = ({ 
  cookingTime, 
  servings, 
  difficulty, 
  price 
}: RecipeAttributesProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        {cookingTime && (
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-5 w-5" />
            <div>
              <p className="text-sm text-gray-500">Cooking Time</p>
              <p className="font-medium">{cookingTime} minutes</p>
            </div>
          </div>
        )}
        
        {servings && (
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="h-5 w-5" />
            <div>
              <p className="text-sm text-gray-500">Servings</p>
              <p className="font-medium">{servings} people</p>
            </div>
          </div>
        )}
        
        {difficulty && (
          <div className="flex items-center gap-2 text-gray-600">
            <Tag className="h-5 w-5" />
            <div>
              <p className="text-sm text-gray-500">Difficulty</p>
              <p className="font-medium capitalize">{difficulty}</p>
            </div>
          </div>
        )}
        
        {price !== null && (
          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign className="h-5 w-5" />
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-medium">${price.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>
      
      <Separator />
    </div>
  );
};

export default RecipeAttributes;
