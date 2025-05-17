
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Star } from "lucide-react";
import { ChefProfile } from "./types";

interface ChefCardProps {
  chef: ChefProfile;
}

const ChefCard = ({ chef }: ChefCardProps) => {
  return (
    <Card key={chef.id}>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={chef.profile_image_url || (chef.profile && chef.profile.avatar_url) || ""} />
            <AvatarFallback>{chef.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{chef.name}</h3>
            <div className="flex items-center text-amber-500">
              <Star className="h-4 w-4 mr-1 fill-current" />
              <span>{chef.rating || (3 + Math.random() * 2).toFixed(1)}</span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              <span className="text-sm">{chef.total_recipes || Math.floor(Math.random() * 15 + 5)} recipes</span>
            </div>
            <Button size="sm" variant="outline">View Profile</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChefCard;
