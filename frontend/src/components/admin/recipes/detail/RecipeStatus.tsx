
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RecipeStatusProps {
  isApproved: boolean | null;
  status: string | null;
  price: number | null;
}

const RecipeStatus = ({ isApproved, status, price }: RecipeStatusProps) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg">Recipe Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Approval Status</p>
            <div className="mt-1">
              <Badge 
                variant={isApproved ? "secondary" : "outline"}
                className={isApproved 
                  ? "bg-green-100 text-green-800" 
                  : "bg-yellow-100 text-yellow-800"}
              >
                {isApproved ? "Approved" : "Pending Approval"}
              </Badge>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Publication Status</p>
            <div className="mt-1">
              <Badge 
                variant="outline"
                className={
                  status === 'published' 
                    ? "bg-green-100 text-green-800" 
                    : status === 'draft'
                    ? "bg-gray-100 text-gray-800"
                    : "bg-red-100 text-red-800"
                }
              >
                {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown"}
              </Badge>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Pricing</p>
            <div className="mt-1 font-medium">
              {price !== null && price > 0 
                ? `$${price.toFixed(2)}` 
                : "Free"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeStatus;
