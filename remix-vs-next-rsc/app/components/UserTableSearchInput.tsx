import { useSearchParams } from "@remix-run/react";
import { useRef, useEffect } from "react";

export default function UserTableSearchInput() {
  const el = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();
  const searchTxt = searchParams.get("user") || "";
  useEffect(() => {
    if (el.current) el.current.value = searchTxt;
  }, [searchTxt]);
  return (
    <input
      className="w-full appearance-none outline-none placeholder:italic placeholder:text-gray-600"
      placeholder="Type & hit enter to search..."
      name="user"
      ref={el}
    />
  );
}
