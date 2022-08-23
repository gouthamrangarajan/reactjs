import { userType } from "./model";
let cacheData: userType[] | null = null;

export default async function getUserData() {
  if (cacheData) return cacheData;
  await delay(3000);
  let respData: userType[] = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  ).then((resp) => resp.json());
  let userData: userType[] = [];
  for (let i = 0; i < 10; i++) {
    respData.forEach((el) => {
      el.id = parseInt((Math.random() * 100000000).toFixed(0));
      userData.push(el);
    });
  }
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
