import { type V2_MetaFunction, type LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { z } from "zod";
import UserTableContainer from "~/components/UserTableContainer";
import UserTableSearch from "~/components/UserTableSearch";
import UserTableSearchResults from "~/components/UserTableSearchResults";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Remix-vs-Next-RSC" },
    {
      name: "description",
      content:
        "Sample to use same components from Next RSC 101 and check how they differ",
    },
  ];
};

export async function loader({ request }: LoaderArgs) {
  let respRaw = await fetch("https://jsonplaceholder.typicode.com/users");
  let respJson = await respRaw.json();
  const usersSchema = z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      username: z.string(),
      email: z.string(),
      website: z.string(),
    })
  );
  let users = usersSchema.parse(respJson);
  const url = new URL(request.url);
  let search = url.searchParams.get("user") || "";
  if (search) {
    search = search.toLowerCase();
    users = users.filter(
      (el) =>
        el.name.toLowerCase().includes(search) ||
        el.username.toLowerCase().includes(search) ||
        el.email.toLowerCase().includes(search) ||
        el.website.toLowerCase().includes(search)
    );
  }
  return json({ data: users });
}

export default function Index() {
  const loaderData = useLoaderData() as {
    data: Array<{
      id: number;
      name: string;
      email: string;
      username: string;
      website: string;
    }>;
  };
  return (
    <main className=" flex min-h-screen flex-col  items-center px-4 py-2 pt-24">
      <UserTableContainer>
        <span className="text-xl font-medium text-green-600">Users</span>
        <UserTableSearch></UserTableSearch>
        <UserTableSearchResults
          data={loaderData?.data || []}
        ></UserTableSearchResults>
      </UserTableContainer>
    </main>
  );
}
