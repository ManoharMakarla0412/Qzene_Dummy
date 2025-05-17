
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChefHat } from "lucide-react";

interface ChefSectionProps {
  chefId: string | null;
  chefName: string | null;
  chefImage: string | null;
}

const ChefSection = ({ chefId, chefName, chefImage }: ChefSectionProps) => {
  const navigate = useNavigate();
  
  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Chef</h3>
      {chefName ? (
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={chefImage || ""} />
            <AvatarFallback>
              <ChefHat className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{chefName}</p>
            {chefId && (
              <Button 
                variant="link" 
                className="p-0 h-auto text-sm"
                onClick={() => navigate(`/admin/chefs/${chefId}`)}
              >
                View Chef Profile
              </Button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground">No chef associated</p>
      )}
      <Separator className="my-6" />
    </div>
  );
};

export default ChefSection;
