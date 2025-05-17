
import { useNavigate } from "react-router-dom";
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface RecipeDetailHeaderProps {
  name: string;
  description: string | null;
  isApproved: boolean | null;
}

const RecipeDetailHeader = ({ name, description, isApproved }: RecipeDetailHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <>
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{name}</CardTitle>
            <CardDescription className="mt-2">
              {description || "No description provided"}
            </CardDescription>
          </div>
          <Badge 
            variant={isApproved ? "secondary" : "outline"}
            className={isApproved 
              ? "bg-green-100 text-green-800 hover:bg-green-100" 
              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"}
          >
            {isApproved ? "Approved" : "Pending Approval"}
          </Badge>
        </div>
      </CardHeader>
    </>
  );
};

export default RecipeDetailHeader;
