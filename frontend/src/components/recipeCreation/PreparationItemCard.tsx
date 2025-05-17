
import { PreparationItem } from "@/types/recipeCreation";

interface PreparationItemCardProps {
  item: PreparationItem;
  onDragStart: (item: PreparationItem) => void;
}

const PreparationItemCard = ({ item, onDragStart }: PreparationItemCardProps) => {
  return (
    <div 
      className="bg-white p-2 rounded-lg shadow-sm flex flex-col items-center text-center cursor-grab"
      draggable
      onDragStart={() => onDragStart(item)}
    >
      <div className="w-16 h-16 flex items-center justify-center mb-1">
        <img 
          src={`https://source.unsplash.com/100x100/?${encodeURIComponent(item.name.toLowerCase())},food`} 
          alt={item.name}
          className="max-w-full max-h-full object-contain"
          onError={(e) => {
            e.currentTarget.src = "/lovable-uploads/dd9bf0df-61e9-4df5-958f-179c836006ce.png";
          }}
        />
      </div>
      <span className="text-sm">{item.name}</span>
    </div>
  );
};

export default PreparationItemCard;
