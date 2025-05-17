
import { RecipeData } from "@/types/recipeCreation";
import { Droplet } from "lucide-react";

interface RecipeSummaryProps {
  recipeData: RecipeData;
}

const RecipeSummary = ({ recipeData }: RecipeSummaryProps) => {
  return (
    <div className="md:col-span-3 bg-gray-50 p-4 rounded-lg">
      <h3 className="text-xl font-medium mb-4">Ingredients</h3>
      
      {recipeData.containers.map((container, containerIndex) => (
        container.ingredients.length > 0 && (
          <div key={container.id} className="mb-6">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2">
                {containerIndex + 1}
              </div>
              <span className="text-blue-600 font-medium">Container {container.id}</span>
            </div>
            
            <div className="pl-8 space-y-2">
              {container.ingredients.map((ing) => (
                <div key={ing.id} className="flex items-center">
                  <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                    <img 
                      src={`https://source.unsplash.com/100x100/?${encodeURIComponent(ing.name.toLowerCase())},food`} 
                      alt={ing.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png";
                      }}
                    />
                  </div>
                  <span>{ing.name}</span>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
      
      <h3 className="text-xl font-medium mb-4">Seasonings</h3>
      
      <div className="space-y-2">
        {recipeData.seasonings.map((seasoning) => (
          <div key={seasoning.id} className="flex items-center">
            <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
              <img 
                src={`https://source.unsplash.com/100x100/?${encodeURIComponent(seasoning.name.toLowerCase())},spice`} 
                alt={seasoning.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png";
                }}
              />
            </div>
            <span>{seasoning.name}</span>
          </div>
        ))}
      </div>
      
      <h3 className="text-xl font-medium mt-6 mb-4">Water & Oil</h3>
      
      <div className="space-y-2">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full overflow-hidden mr-2 bg-blue-100 flex items-center justify-center">
            <Droplet className="h-4 w-4 text-blue-500" />
          </div>
          <span>Drinking Water</span>
        </div>
        
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full overflow-hidden mr-2 bg-yellow-100 flex items-center justify-center">
            <Droplet className="h-4 w-4 text-yellow-500" />
          </div>
          <span>Olive Oil</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeSummary;
