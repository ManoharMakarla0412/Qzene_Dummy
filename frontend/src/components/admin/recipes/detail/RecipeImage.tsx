
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface RecipeImageProps {
  imageUrl: string | null;
  recipeName: string;
}

const RecipeImage = ({ imageUrl, recipeName }: RecipeImageProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recipe Image</CardTitle>
      </CardHeader>
      <CardContent>
        {imageUrl ? (
          <div className="aspect-square w-full overflow-hidden rounded-md border">
            <img
              src={imageUrl}
              alt={recipeName}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="aspect-square w-full overflow-hidden rounded-md border bg-muted flex items-center justify-center flex-col gap-2">
            <AlertTriangle className="h-12 w-12 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No image available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecipeImage;
