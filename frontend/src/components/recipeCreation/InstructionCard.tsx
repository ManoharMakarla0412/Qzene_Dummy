
import { Instruction } from "@/types/recipeCreation";
import { ReactNode } from "react";

interface InstructionCardProps {
  instruction: Instruction;
  renderActionIcon: (iconName: string) => ReactNode;
  onRemove: (id: string) => void;
}

const InstructionCard = ({ instruction, renderActionIcon, onRemove }: InstructionCardProps) => {
  return (
    <div className="relative border rounded-lg p-3 bg-white">
      <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -left-2">
        {instruction.step}
      </div>
      
      <div className="mb-2 flex items-center">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
          {renderActionIcon(instruction.icon)}
        </div>
        <div className="font-medium">{instruction.action}</div>
      </div>
      
      <div className="flex justify-end">
        <button 
          className="text-red-500 hover:text-red-700"
          onClick={() => onRemove(instruction.id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InstructionCard;
