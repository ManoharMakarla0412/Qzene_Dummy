
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface CategoriesSectionProps {
  category: string | null;
  tags: string[] | null;
}

const CategoriesSection = ({ category, tags }: CategoriesSectionProps) => {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">Categories & Tags</h3>
      <div className="space-y-2">
        {category && (
          <div>
            <span className="text-sm text-muted-foreground">Category:</span>
            <Badge variant="secondary" className="ml-2">{category}</Badge>
          </div>
        )}
        
        {Array.isArray(tags) && tags.length > 0 && (
          <div>
            <span className="text-sm text-muted-foreground">Tags:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {tags.map((tag, index) => (
                <Badge key={index} variant="outline">{tag}</Badge>
              ))}
            </div>
          </div>
        )}
        
        {(!category && (!Array.isArray(tags) || tags.length === 0)) && (
          <p className="text-muted-foreground">No categories or tags specified</p>
        )}
      </div>
      <Separator className="my-6" />
    </div>
  );
};

export default CategoriesSection;
