import { z } from "zod";

export default async function UserTableSearchResults({
  search,
}: {
  search: string;
}) {
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
  if(search)
      users=users.filter(el=>el.name.toLowerCase().includes(search)
              ||el.username.toLowerCase().includes(search)
              ||el.email.toLowerCase().includes(search)
              ||el.website.toLowerCase().includes(search)
              );
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="shadow">
          <th className="px-3 py-1 text-left font-medium text-gray-600">
            Name
          </th>
          <th className="px-3 py-1 text-left font-medium text-gray-600">
            User Name
          </th>
          <th className="px-3 py-1 text-left font-medium text-gray-600">
            Email
          </th>
          <th className="px-3 py-1 text-left font-medium text-gray-600">
            Website
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="animate-translate-y shadow">
            <td className="px-3 py-1">{user.name}</td>
            <td className="px-3 py-1">{user.username}</td>
            <td className="px-3 py-1">{user.email}</td>
            <td className="px-3 py-1">{user.website}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
