export interface userType {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
}

export const GET_USERS_DATA = async (): Promise<userType[] | string> => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    let dt = await res.json();
    dt = dt.map((el: any) => ({
      name: el.name,
      username: el.username,
      email: el.email,
      website: el.website,
    }));
    return dt;
  } catch (err) {
    console.log(err);
    return "Error calling jsonplaceholder api";
  }
};
