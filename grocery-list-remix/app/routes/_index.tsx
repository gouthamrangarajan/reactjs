import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Grocery List" },
    { name: "description", content: "Grocery List" },
  ];
};

export default function Index() {
  return (
    <div className="text-red-600 lg:font-normal font-semibold text-xl ">
      Welcome...
    </div>
  );
}
