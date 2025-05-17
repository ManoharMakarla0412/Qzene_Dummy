
import { Utensil } from "@/types/recipeCreation";
import UtensilCard from "./UtensilCard";
import { useState } from "react";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

interface UtensilsPanelProps {
  utensils: Utensil[];
  onUtensilsChange: (utensils: Utensil[]) => void;
  availableUtensils?: Utensil[];
  onDragStart?: (utensil: Utensil) => void;
}

const UtensilsPanel = ({ 
  utensils, 
  onUtensilsChange, 
  availableUtensils = [],
  onDragStart = () => {} 
}: UtensilsPanelProps) => {
  const [showAvailable, setShowAvailable] = useState(false);
  
  const handleAddUtensil = (utensil: Utensil) => {
    if (!utensils.some(u => u.id === utensil.id)) {
      onUtensilsChange([...utensils, utensil]);
    }
  };
  
  const handleRemoveUtensil = (id: string) => {
    onUtensilsChange(utensils.filter(u => u.id !== id));
  };
  
  const defaultUtensils = [
    { id: "pan", name: "Frying Pan", image: "" },
    { id: "pot", name: "Cooking Pot", image: "" },
    { id: "knife", name: "Chef's Knife", image: "" },
    { id: "board", name: "Cutting Board", image: "" },
    { id: "spoon", name: "Wooden Spoon", image: "" },
  ];
  
  const utensilOptions = availableUtensils.length > 0 ? availableUtensils : defaultUtensils;
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-medium">Utensils</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowAvailable(!showAvailable)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Utensil
        </Button>
      </div>
      
      {showAvailable && (
        <div className="mb-4 p-3 border rounded-lg bg-white">
          <h4 className="mb-2 text-sm font-medium">Available Utensils</h4>
          <div className="grid grid-cols-2 gap-2">
            {utensilOptions.map(utensil => (
              <div 
                key={utensil.id}
                className="text-sm p-2 border rounded cursor-pointer hover:bg-gray-100"
                onClick={() => handleAddUtensil(utensil)}
              >
                {utensil.name}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        {utensils.map(utensil => (
          <div key={utensil.id} className="flex justify-between items-center p-2 bg-white rounded border">
            <span>{utensil.name}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleRemoveUtensil(utensil.id)}
              className="h-8 px-2 text-red-500 hover:text-red-700"
            >
              Remove
            </Button>
          </div>
        ))}
        
        {utensils.length === 0 && (
          <div className="text-gray-500 italic text-center p-4">
            No utensils added yet. Click "Add Utensil" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default UtensilsPanel;
