
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ChefSearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const ChefSearchBar = ({ searchQuery, setSearchQuery }: ChefSearchBarProps) => {
  return (
    <div className="flex items-center space-x-2 mb-6">
      <Search className="h-5 w-5 text-muted-foreground" />
      <Input
        placeholder="Search chefs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-sm"
      />
    </div>
  );
};

export default ChefSearchBar;
