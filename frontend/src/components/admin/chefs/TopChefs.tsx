
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChefHat, Star, ChevronRight, Edit } from "lucide-react";
import { ChefProfile } from "./types";

interface TopChefsProps {
  chefs: ChefProfile[];
  onView: (id: string) => void;
  onEdit?: (id: string) => void;
}

const TopChefs = ({ chefs, onView, onEdit }: TopChefsProps) => {
  // Helper function to get initials from name
  const getInitials = (name: string) => {
    if (!name) return "CH";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Chefs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {chefs.map((chef) => (
            <div key={chef.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={chef.profile_image_url || ""} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(chef.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{chef.name}</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs text-muted-foreground ml-1">
                      {chef.rating ? chef.rating.toFixed(1) : "No rating"}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">•</span>
                    <ChefHat className="h-3 w-3 ml-2 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground ml-1">
                      {chef.total_recipes || 0} recipes
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                {onEdit && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto"
                    onClick={() => onEdit(chef.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto"
                  onClick={() => onView(chef.id)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {chefs.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No chefs available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopChefs;
