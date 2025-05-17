
import { useState } from "react";
import { PreparationItem } from "@/types/recipeCreation";
import PreparationItemCard from "./PreparationItemCard";
import SearchInput from "./SearchInput";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

interface PreparationPanelProps {
  preparationItems: PreparationItem[];
  onPreparationItemsChange: (items: PreparationItem[]) => void;
  availablePreparations?: PreparationItem[];
  onDragStart?: (item: PreparationItem) => void;
}

const PreparationPanel = ({ 
  preparationItems, 
  onPreparationItemsChange,
  availablePreparations = [],
  onDragStart = () => {} 
}: PreparationPanelProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAvailable, setShowAvailable] = useState(false);
  
  const defaultPreparations = [
    { id: "chop", name: "Chopped Vegetables", image: "" },
    { id: "dice", name: "Diced Onions", image: "" },
    { id: "mince", name: "Minced Garlic", image: "" },
    { id: "slice", name: "Sliced Tomatoes", image: "" },
    { id: "grate", name: "Grated Cheese", image: "" },
  ];
  
  const prepOptions = availablePreparations.length > 0 ? availablePreparations : defaultPreparations;
  
  const filteredPreparations = prepOptions.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddPreparation = (item: PreparationItem) => {
    if (!preparationItems.some(p => p.id === item.id)) {
      onPreparationItemsChange([...preparationItems, item]);
    }
  };
  
  const handleRemovePreparation = (id: string) => {
    onPreparationItemsChange(preparationItems.filter(p => p.id !== id));
  };
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-medium">Preparation Items</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowAvailable(!showAvailable)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Preparation
        </Button>
      </div>
      
      {showAvailable && (
        <div className="mb-4">
          <SearchInput 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search preparations..."
          />
          
          <div className="mt-2 p-3 border rounded-lg bg-white grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
            {filteredPreparations.map(item => (
              <div 
                key={item.id}
                className="text-sm p-2 border rounded cursor-pointer hover:bg-gray-100"
                onClick={() => handleAddPreparation(item)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        {preparationItems.map(item => (
          <div key={item.id} className="flex justify-between items-center p-2 bg-white rounded border">
            <span>{item.name}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleRemovePreparation(item.id)}
              className="h-8 px-2 text-red-500 hover:text-red-700"
            >
              Remove
            </Button>
          </div>
        ))}
        
        {preparationItems.length === 0 && (
          <div className="text-gray-500 italic text-center p-4">
            No preparation items added yet. Click "Add Preparation" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default PreparationPanel;
