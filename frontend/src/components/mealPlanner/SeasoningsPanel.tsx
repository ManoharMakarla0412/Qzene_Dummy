import { Ingredient, SeasoningItem } from "@/types/mealPlanner";

const FALLBACK_IMAGE = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=";

interface SeasoningsPanelProps {
  seasonings: SeasoningItem[];
  onDragStart: (e: React.DragEvent, ingredient: Ingredient, source: "ingredient-list" | "container", containerId?: number) => void;
}

const SeasoningsPanel = ({ seasonings, onDragStart }: SeasoningsPanelProps) => {
  // Filter out any invalid seasonings
  const validSeasonings = seasonings.filter(s => s && s.name && s.id);
  
  return (
    <div className="md:col-span-3 border-l bg-gray-50 p-4">
      <h3 className="text-xl font-medium mb-4">Seasonings</h3>
      
      <div className="space-y-3 mb-8">
        {validSeasonings.map(seasoning => (
          <div 
            key={seasoning.id}
            className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-grab"
            draggable
            onDragStart={(e) => onDragStart(e, { id: seasoning.id, name: seasoning.name, image: seasoning.image }, "ingredient-list")}
          >
            <div className="flex items-center">
              <img 
                src={`https://source.unsplash.com/100x100/?${encodeURIComponent(seasoning.name.toLowerCase())},spice`} 
                alt={seasoning.name} 
                className="w-8 h-8 object-contain rounded-full mr-3"
                onError={(e) => {
                  e.currentTarget.onerror = null; // Prevent infinite loop
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
              />
              <span>{seasoning.name}</span>
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-blue-500 text-blue-500 flex items-center justify-center">
              {seasoning.count}
            </div>
          </div>
        ))}
      </div>
      
      <h3 className="text-xl font-medium mb-4">Water & Oil</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
          <div className="flex items-center">
            <span>Drinking Water</span>
          </div>
          <div className="text-blue-500">
            <img 
              src="https://source.unsplash.com/100x100/?water,glass" 
              alt="Water" 
              className="w-8 h-8 object-contain rounded-lg"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
          <div className="flex items-center">
            <span>Olive Oil</span>
          </div>
          <div className="text-amber-500">
            <img 
              src="https://source.unsplash.com/100x100/?olive,oil" 
              alt="Oil" 
              className="w-8 h-8 object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasoningsPanel;
