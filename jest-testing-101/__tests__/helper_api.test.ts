import { GET_USERS_DATA } from "@/helpers/api";

it("success get users data", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve([]) })
  ) as unknown as () => Promise<Response>;

  let dt = await GET_USERS_DATA();
  expect(dt.length).toBe(0);
});

it("failure get users data", async () => {
  global.fetch = jest.fn(() =>
    Promise.reject({ json: () => Promise.resolve([]) })
  ) as unknown as () => Promise<Response>;

  let dt = await GET_USERS_DATA();
  expect(dt).toBe("Error calling jsonplaceholder api");
});
