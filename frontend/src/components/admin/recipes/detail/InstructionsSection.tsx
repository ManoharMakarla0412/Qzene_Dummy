
import { Separator } from "@/components/ui/separator";

interface Instruction {
  step?: number;
  action?: string;
  icon?: string;
}

interface InstructionsSectionProps {
  instructions: Array<Instruction | string>;
}

const InstructionsSection = ({ instructions }: InstructionsSectionProps) => {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Instructions</h3>
      <ol className="space-y-4">
        {instructions.map((instruction, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
              {index + 1}
            </div>
            <p>
              {typeof instruction === 'string' 
                ? instruction 
                : instruction.action || JSON.stringify(instruction)}
            </p>
          </li>
        ))}
        {instructions.length === 0 && (
          <p className="text-muted-foreground">No instructions specified</p>
        )}
      </ol>
      <Separator className="my-6" />
    </div>
  );
};

export default InstructionsSection;
