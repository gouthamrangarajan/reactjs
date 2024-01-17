import type { MetaFunction } from "@remix-run/node";
import { actionFn, loaderFn } from "./loaderAndAction";
import { Link, useLoaderData, useSubmit } from "@remix-run/react";
import { Grocery_Item_Status, type Grocery_Item } from "~/utils/models/grocery";
import ItemCardsContainer from "~/components/ItemCardsContainer";
import ItemsOrderChange from "~/components/ItemsOrderChange";
import ItemActions from "~/components/ItemActions";

export const meta: MetaFunction = () => {
  return [
    { title: "Grocery List" },
    { name: "description", content: "Grocery List" },
  ];
};

export const clientLoader = loaderFn;
export const clientAction = actionFn;

export default function Index() {
  let groceryItems = useLoaderData() as Array<Grocery_Item>;
  let toBuyItems = groceryItems.filter(
    (el) => el.status == Grocery_Item_Status.TO_BUY,
  );
  let boughtItems = groceryItems.filter(
    (el) => el.status == Grocery_Item_Status.BOUGHT,
  );
  let submit = useSubmit();
  let submitToAction = ({
    name,
    newStatus,
    status,
  }: {
    name: string;
    newStatus: Grocery_Item_Status;
    status: Grocery_Item_Status;
  }) => {
    if (status != newStatus) {
      submit(null, {
        method: "POST",
        action: `/?name=${name}&status=${status}`,
      });
    }
  };
  return (
    <div className="flex min-h-full w-screen flex-col items-center justify-center gap-3 overflow-x-hidden px-3 py-1 pb-12 lg:h-full lg:pb-0">
      <div className="grid flex-shrink-0 grid-cols-1 items-center justify-center gap-3 lg:grid-cols-2 ">
        <ItemCardsContainer
          header={
            <span className="pl-5 text-xl font-semibold text-fuchsia-600">
              Item(s) To Buy
            </span>
          }
          items={toBuyItems}
          type={Grocery_Item_Status.TO_BUY}
          onDrop={(data) => {
            submitToAction(data);
          }}
        ></ItemCardsContainer>
        <ItemCardsContainer
          header={
            <span className="pl-5 text-xl font-semibold text-red-600">
              Item(s) Bought
            </span>
          }
          items={boughtItems}
          type={Grocery_Item_Status.BOUGHT}
          onDrop={(data) => {
            submitToAction(data);
          }}
        ></ItemCardsContainer>
      </div>
      <div className="mx-auto flex w-full max-w-xl justify-center lg:justify-end ">
        <ItemsOrderChange></ItemsOrderChange>
      </div>
      <div className="flex w-full justify-center lg:mt-24">
        <Link
          to="/about"
          className="mr-14 appearance-none border-b-2 border-transparent text-lg text-gray-700 outline-none transition-all duration-300 hover:opacity-90 focus:border-green-700"
        >
          About
        </Link>
      </div>
      <ItemActions></ItemActions>
    </div>
  );
}
