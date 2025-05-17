
import { Plus } from "lucide-react";

interface AddInstructionCardProps {
  onClick: () => void;
}

const AddInstructionCard = ({ onClick }: AddInstructionCardProps) => {
  return (
    <div 
      className="border rounded-lg p-3 bg-gray-50 flex items-center justify-center cursor-pointer hover:bg-gray-100 min-h-[100px]"
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-gray-500">
        <Plus className="h-6 w-6 mb-1" />
        <span className="text-sm">Drop your instruction here</span>
      </div>
    </div>
  );
};

export default AddInstructionCard;
