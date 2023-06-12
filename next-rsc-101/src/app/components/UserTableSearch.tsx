import { redirect } from "next/navigation";
import UserTableSearchInput from "./UserTableSearchInput";

export default function UserTableSearch() {
  async function search(data: FormData) {
    "use server";
    const { search } = Object.fromEntries(data.entries());
    if (search) redirect(`/?user=${search.toString().trim()}`);
    else redirect(`/`);
  }
  return (
    <form
      className="mt-2 w-full rounded border-2 border-indigo-600 px-3 py-1 transition duration-300 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-indigo-50"
      action={search}
    >
      <UserTableSearchInput />
    </form>
  );
}
