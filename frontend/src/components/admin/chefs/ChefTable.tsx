import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChefHat, Eye, Edit, Trash2, Star, Loader2 } from "lucide-react";
import { ChefProfile } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChefTableProps {
  chefs: ChefProfile[] | undefined;
  isLoading: boolean;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ChefTable = ({ chefs, isLoading, onView, onEdit, onDelete }: ChefTableProps) => {
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

  // Get unique chef names to handle duplicates
  const getUniqueChefs = (chefs: ChefProfile[] | undefined) => {
    if (!chefs || chefs.length === 0) return [];
    
    const uniqueChefs = new Map<string, ChefProfile>();
    chefs.forEach(chef => {
      // Use name as key
      if (!uniqueChefs.has(chef.name)) {
        uniqueChefs.set(chef.name, chef);
      } else {
        // If duplicate, keep the one with the highest rating
        const existingChef = uniqueChefs.get(chef.name);
        if ((chef.rating || 0) > (existingChef?.rating || 0)) {
          uniqueChefs.set(chef.name, chef);
        }
      }
    });
    
    return Array.from(uniqueChefs.values());
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!chefs || chefs.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No chefs found</div>;
  }

  const uniqueChefs = getUniqueChefs(chefs);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Chef</TableHead>
            <TableHead>Specialties</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Recipes</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {uniqueChefs.map((chef) => (
            <TableRow key={chef.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={chef.profile_image_url || ""} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(chef.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{chef.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {chef.profile?.first_name && chef.profile?.last_name
                        ? `${chef.profile.first_name} ${chef.profile.last_name}`
                        : chef.contact_email || "No contact info"}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {chef.specialties && chef.specialties.length > 0 ? (
                    chef.specialties.slice(0, 3).map((specialty, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs"
                      >
                        {specialty}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-sm">No specialties</span>
                  )}
                  {chef.specialties && chef.specialties.length > 3 && (
                    <span className="text-muted-foreground text-xs">+{chef.specialties.length - 3} more</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {chef.rating ? (
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="ml-1">{chef.rating.toFixed(1)}</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">Not rated</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <ChefHat className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>{chef.total_recipes || 0}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm" className="h-8" onClick={() => onView(chef.id)}>
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button variant="outline" size="sm" className="h-8" onClick={() => onEdit(chef.id)}>
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-red-600" onClick={() => onDelete(chef.id)}>
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ChefTable;
