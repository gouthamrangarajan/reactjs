import { userType } from "./model";
let cacheData: userType[] | null = null;

export default async function getUserData() {
  if (cacheData) return cacheData;
  await delay(3000);
  const userData: userType[] = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  ).then((resp) => resp.json());
  cacheData = userData;
  return userData;
}

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
}
