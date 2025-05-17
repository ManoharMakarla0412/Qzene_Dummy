
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

interface RecipeDatesProps {
  createdAt: string;
  updatedAt: string;
}

const RecipeDates = ({ createdAt, updatedAt }: RecipeDatesProps) => {
  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "PPP p"); // Format: Mar 15, 2023, 3:25 PM
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-semibold text-lg">Created</h3>
        <p className="text-muted-foreground">
          {formatDateTime(createdAt)}
        </p>
      </div>
      
      <div>
        <h3 className="font-semibold text-lg">Last Updated</h3>
        <p className="text-muted-foreground">
          {formatDateTime(updatedAt)}
        </p>
      </div>
    </div>
  );
};

export default RecipeDates;
