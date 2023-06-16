export default function UserTableSearchResults({
  data,
}: {
  data: Array<{
    id: number;
    name: string;
    email: string;
    username: string;
    website: string;
  }>;
}) {
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
        {data.map((user) => (
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
