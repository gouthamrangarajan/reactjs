import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Grocery List" },
    { name: "description", content: "Grocery List" },
  ];
};

export default function Index() {
  return (
    <div className="text-xl text-blue-600 lg:font-semibold ">Welcome...</div>
  );
}
