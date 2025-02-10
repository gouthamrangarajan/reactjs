import { Search } from "lucide-react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function FilterProjects({
  filters,
  category,
  onCategoryChange,
}: {
  filters: string[];
  category: string | null;
  onCategoryChange: (value: string) => void;
}) {
  return (
    <>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
        <Input
          placeholder="Search projects..."
          // value={search}
          // onChange={(e) => setSearch(e.target.value)}
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
