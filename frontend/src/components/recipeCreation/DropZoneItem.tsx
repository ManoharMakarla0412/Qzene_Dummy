
import { PreparationItem, Utensil } from "@/types/recipeCreation";

interface DropZoneItemProps {
  item: PreparationItem | Utensil;
  onRemove: (id: string) => void;
  imageType: "food" | "utensil";
}

const DropZoneItem = ({ item, onRemove, imageType }: DropZoneItemProps) => {
  const imageQuery = imageType === "food" 
    ? `${encodeURIComponent(item.name.toLowerCase())},food` 
    : `${encodeURIComponent(item.name.toLowerCase())},kitchen,utensil`;
    
  return (
    <div className="bg-white border rounded-lg p-2 w-24 h-28 flex flex-col items-center justify-center relative group">
      <div className="w-16 h-16 mb-1">
        <img 
          src={`https://source.unsplash.com/100x100/?${imageQuery}`} 
          alt={item.name}
          className="w-full h-full object-cover rounded-md"
          onError={(e) => {
            e.currentTarget.src = "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png";
          }}
        />
      </div>
      <span className="text-xs text-center line-clamp-2">{item.name}</span>
      <button 
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onRemove(item.id)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default DropZoneItem;
