import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

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
  const [srchTxtState, setSrchTxtState] = useState(searchTxt);
  return (
    <>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
        <Input
          placeholder="Search projects..."
          value={srchTxtState}
          onChange={(e) => {
            onSearchTxtChangeDebounced(e.currentTarget.value);
            setSrchTxtState(e.currentTarget.value);
          }}
          className="border-gray-700 bg-gray-800/50 pl-9"
        />
        <AnimatePresence>
          {srchTxtState && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                onSearchTxtChange("");
                setSrchTxtState("");
              }}
              className="absolute right-3 top-[30%] -translate-y-1/2 transform text-gray-300 transition-colors hover:text-gray-300"
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>
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
