"use client";
import { type FormEvent } from "react";
import UserTableSearchInput from "./UserTableSearchInput";
import { useRouter } from "next/navigation";

export default function UserTableSearch() {
  const router = useRouter();
  const formSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const { search } = Object.fromEntries(
      new FormData(ev.target as HTMLFormElement).entries()
    );
    if (search) router.push(`/?user=${search.toString().trim()}`);
    else router.push(`/`);
  };

  return (
    <form
      className="mt-2 w-full rounded border-2 border-indigo-600 px-3 py-1 transition duration-300 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-indigo-50"
      onSubmit={formSubmit}
    >
      <UserTableSearchInput />
    </form>
  );
}
