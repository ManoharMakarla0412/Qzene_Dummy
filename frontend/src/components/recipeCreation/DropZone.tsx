
import { PreparationItem, Utensil } from "@/types/recipeCreation";
import DropZoneItem from "./DropZoneItem";

interface DropZoneProps {
  title: string;
  items: PreparationItem[] | Utensil[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
  onRemoveItem: (id: string) => void;
  isDragging: boolean;
  itemType: "food" | "utensil";
}

const DropZone = ({ 
  title, 
  items, 
  onDragOver, 
  onDrop, 
  onRemoveItem, 
  isDragging,
  itemType
}: DropZoneProps) => {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-xl font-medium mb-4">{title}</h3>
      <div 
        className={`border-2 rounded-lg p-4 min-h-[150px] ${isDragging ? 'border-dashed border-blue-400 bg-blue-50' : 'border-gray-200'}`}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {items.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {items.map((item) => (
              <DropZoneItem
                key={item.id}
                item={item}
                onRemove={onRemoveItem}
                imageType={itemType}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm">Drop {itemType === "food" ? "pre-preparation items" : "utensils"} here</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropZone;
