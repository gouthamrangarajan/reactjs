import { ActionFunction, LoaderFunction } from "react-router-dom";
import { Grocery_Item_Status, type Grocery_Item } from "./models/grocery";

export const loader: LoaderFunction = async ({
  request,
}): Promise<Array<Grocery_Item>> => {
  const items = window.localStorage.getItem("grocery");
  // Parse stored json or if none return initialValue
  let ret: Array<Grocery_Item> = items ? JSON.parse(items) : [];
  if (!items) window.localStorage.setItem("grocery", JSON.stringify(ret));
  let { sort } = Object.fromEntries(
    new URL(request.url).searchParams
  ) as unknown as { sort: string };
  if (!sort) sort = "name";
  sort = sort.toLowerCase();
  ret = ret.sort((a, b) => {
    let sortRet = a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
    if (sort == "date") {
      if (a.status == Grocery_Item_Status.TO_BUY)
        sortRet = a.add_date && b.add_date && a.add_date > b.add_date ? -1 : 1;
      else
        sortRet =
          a.bought_date && b.bought_date && a.bought_date > b.bought_date
            ? -1
            : 1;
    }
    return sortRet;
  });
  return new Promise((res, _) => setTimeout(() => res(ret), 250));
};

export const action: ActionFunction = async ({ params, request }) => {
  let items = JSON.parse(
    window.localStorage.getItem("grocery") as string
  ) as Array<Grocery_Item>;
  let frmData = await request.formData();
  let actionData = Object.fromEntries(frmData);
  switch (request.method) {
    case "DELETE": {
      items.splice(0);
      break;
    }
    case "PUT": {
      items = JSON.parse(
        new URL(request.url).search.replace("?data=", "").replaceAll("%22", '"')
      ) as Array<Grocery_Item>;
      break;
    }
    case "POST": {
      const kys = Object.keys(actionData);
      let action = kys.includes("remove")
        ? "remove"
        : kys.includes("add")
        ? "add"
        : "move";
      let urlData = Object.fromEntries(
        new URL(request.url).searchParams
      ) as unknown as Grocery_Item;
      switch (action) {
        case "remove": {
          let idx = items.findIndex(
            (el) => el.name == urlData.name && el.status == urlData.status
          );
          if (idx > -1) items.splice(idx, 1);
          break;
        }
        case "add": {
          let newDt = actionData as unknown as Grocery_Item;
          newDt.name = newDt.name.trim();
          newDt.quantity = parseFloat(newDt.quantity.toString());
          if (newDt.name && newDt.quantity > 0) {
            let ft = items.filter(
              (el) =>
                el.name.toLowerCase().trim() ==
                  newDt.name.toLowerCase().trim() &&
                el.status == Grocery_Item_Status.TO_BUY
            )[0];
            if (ft) ft.quantity += newDt.quantity;
            else {
              newDt.status = Grocery_Item_Status.TO_BUY;
              newDt.add_date = new Date().toISOString();
              items.push(newDt);
            }
          }
          break;
        }
        case "move": {
          let ft = items.filter(
            (el) => el.name == urlData.name && el.status == urlData.status
          )[0];
          ft.status =
            ft.status == Grocery_Item_Status.TO_BUY
              ? Grocery_Item_Status.BOUGHT
              : Grocery_Item_Status.TO_BUY;
          if (ft.status == Grocery_Item_Status.BOUGHT)
            ft.bought_date = new Date().toISOString();
          else {
            ft.bought_date = undefined;
            ft.add_date = new Date().toISOString();
          }
          break;
        }
      }
      break;
    }
  }

  window.localStorage.setItem("grocery", JSON.stringify(items));
  return null;
};
