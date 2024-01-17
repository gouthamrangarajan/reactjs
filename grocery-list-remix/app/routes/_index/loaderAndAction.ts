import { ActionFunction, LoaderFunction } from "react-router-dom";
import {
  Grocery_Item_Status,
  type Grocery_Item,
} from "../../utils/models/grocery";
import localforage from "localforage";
// import { sendMessage } from "../hooks/usePartyKit";

export const loaderFn: LoaderFunction = async ({
  request,
}): Promise<Array<Grocery_Item>> => {
  let ret: Array<Grocery_Item> = [];
  try {
    const items = (await localforage.getItem("grocery")) as Array<Grocery_Item>;
    if (items) ret = items;
  } catch (err) {
    console.log(`Error accessing localforage: ${err}`);
  }
  let { sort } = Object.fromEntries(
    new URL(request.url).searchParams,
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

  return ret;
};

export const actionFn: ActionFunction = async ({ params, request }) => {
  let items: Array<Grocery_Item> = [];
  try {
    const localforageItems = (await localforage.getItem(
      "grocery",
    )) as Array<Grocery_Item>;
    if (localforageItems) items = localforageItems;
  } catch (err) {
    console.log(`Error accessing localforage: ${err}`);
  }
  let frmData = await request.formData();
  switch (request.method) {
    case "DELETE": {
      items.splice(0);
      break;
    }
    case "PUT": {
      items = JSON.parse(
        new URL(request.url).search
          .replace("?data=", "")
          .replaceAll("%22", '"')
          .replaceAll("%20", " "),
      ) as Array<Grocery_Item>;
      break;
    }
    case "POST": {
      let action = frmData.get("action");
      if (!action) action = "move";
      let urlData = Object.fromEntries(
        new URL(request.url).searchParams,
      ) as unknown as Grocery_Item;
      switch (action) {
        case "remove": {
          let idx = items.findIndex(
            (el) => el.name == urlData.name && el.status == urlData.status,
          );
          if (idx > -1) items.splice(idx, 1);
          break;
        }
        case "add": {
          frmData.append("status", Grocery_Item_Status.TO_BUY.toString());
          let actionData = Object.fromEntries(frmData);
          let newDt = actionData as unknown as Grocery_Item;
          newDt.name = newDt.name.trim();
          newDt.quantity = parseFloat(newDt.quantity.toString());
          if (newDt.name && newDt.quantity > 0) {
            let ft = items.filter(
              (el) =>
                el.name.toLowerCase().trim() ==
                  newDt.name.toLowerCase().trim() &&
                el.status == Grocery_Item_Status.TO_BUY,
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
        case "move":
          {
            let ft = items.filter(
              (el) => el.name == urlData.name && el.status == urlData.status,
            )[0];
            let otherStatusEl = items.filter(
              (el) => el.name == urlData.name && el.status != urlData.status,
            )[0];

            if (otherStatusEl) {
              otherStatusEl.quantity = otherStatusEl.quantity + ft.quantity;
              let idx = items.findIndex(
                (item) => item.name == ft.name && item.status == ft.status,
              );
              if (idx > -1) items.splice(idx, 1);
              ft = otherStatusEl;
            } else
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
          }
          break;
      }

      break;
    }
  }

  await localforage.setItem("grocery", items);
  // sendMessage(JSON.stringify(items));
  return null;
};
