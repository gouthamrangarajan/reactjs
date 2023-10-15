import SearchIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { useFetcher } from "@remix-run/react";
import { useEffect, useRef } from "react";

export default function Search() {
  const fetcher = useFetcher();
  const timeout = useRef<number>();
  const debouncedSubmit = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    ev.preventDefault();
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => {
      fetcher.submit((ev.target as HTMLInputElement).form);
    }, 300);
  };
  useEffect(() => {
    return () => {
      window.clearTimeout(timeout.current);
    };
  }, []);
  return (
    <fetcher.Form
      className="flex items-center rounded-md bg-white px-3 py-1
  text-gray-700 transition duration-300 focus-within:ring-2 
  focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-gray-700"
      method="GET"
    >
      <input
        type="text"
        className="order-2 flex-1 appearance-none bg-transparent outline-none lg:order-1 lg:w-64"
        name="search"
        onKeyUp={(ev) => {
          debouncedSubmit(ev);
        }}
      />
      <SearchIcon className="order-1 h-6 w-6 lg:order-2"></SearchIcon>
    </fetcher.Form>
  );
}
