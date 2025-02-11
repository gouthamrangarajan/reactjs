import { Search } from "lucide-react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRef } from "react";

export default function FilterProjects({
  filters,
  category,
  onCategoryChange,
  searchTxt,
  onSearchTxtChange,
}: {
  filters: string[];
  category: string | null;
  onCategoryChange: (value: string) => void;
  searchTxt: string;
  onSearchTxtChange: (value: string) => void;
}) {
  const searchTimeout = useRef<number>(null);
  const onSearchTxtChangeDebounced = (value: string) => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => {
      onSearchTxtChange(value);
    }, 300);
  };
  return (
    <>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
        <Input
          placeholder="Search projects..."
          defaultValue={searchTxt}
          onChange={(e) => onSearchTxtChangeDebounced(e.currentTarget.value)}
          className="border-gray-700 bg-gray-800/50 pl-9"
        />
      </div>
      <Select
        value={category || ""}
        onValueChange={(value) => {
          onCategoryChange(value);
        }}
      >
        <SelectTrigger className="border-gray-700 bg-gray-800/50">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {filters.map((filter) => (
            <SelectItem value={filter} key={filter}>
              {filter}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
