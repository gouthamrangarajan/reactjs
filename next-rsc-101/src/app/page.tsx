import UserTableContainer from "./components/UserTableContainer";
import UserTableSearch from "./components/UserTableSearch";
import UserTableSearchResults from "./components/UserTableSearchResults";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = searchParams?.user?.toString().toLowerCase() || "";
  return (
    <main className="flex min-h-screen flex-col items-center  px-4 py-2 pt-24">
      <UserTableContainer>
        <span className="text-xl font-medium text-green-600">Users</span>
        <UserTableSearch></UserTableSearch>
        <UserTableSearchResults search={user}></UserTableSearchResults>
      </UserTableContainer>
    </main>
  );
}
