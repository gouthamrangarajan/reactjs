### Next.js Jest Testing 101

- [Next.Js Testing official information](https://nextjs.org/docs/testing)
- [github example](https://github.com/vercel/next.js/tree/canary/examples/with-jest)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet/)
- [Jest js](https://jestjs.io/docs/mock-functions)

#### Sample test for input text filter on datatable

```js
describe("test search", () => {
  it("verify data", async () => {
    render(
      <Datatable
        records={[
          {
            id: 1,
            name: "Goutham Rangarajan",
            username: "GouthamRangarajan",
            email: "rgouthamraja@yahoo.com",
            website: "https://portfolio-gouthamrangarajan.netlify.app/",
          },
        ]}
      ></Datatable>
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "goutham" },
    });
    let td = screen.queryByText("Goutham Rangarajan");
    expect(td).toBeInTheDocument();
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "scott" },
    });
    td = screen.queryByText("Goutham Rangarajan");
    expect(td).toBeNull();
  });
});
```

#### Sample test for api calls

```js
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
```
