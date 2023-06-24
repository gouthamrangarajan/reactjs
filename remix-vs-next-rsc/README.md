### Remix vs Next RSC 101

#### simple code to verify development difference between Next RSC & Remix

- [Next.js RSC](https://github.com/gouthamrangarajan/reactjs/tree/main/next-rsc-101) code

- code in \_index.tsx

```jsx
export async function loader({ request }: LoaderArgs) {
  ...
  let users = usersSchema.parse(respJson);
  const url = new URL(request.url);
  let search = url.searchParams.get("user") || "";
  if (search) {
    search = search.toLowerCase();
    users = users.filter(
      (el) =>
        el.name.toLowerCase().includes(search) ||
        el.username.toLowerCase().includes(search) ||
        el.email.toLowerCase().includes(search) ||
        el.website.toLowerCase().includes(search)
    );
  }
  return json({ data: users });
}
...
const loaderData = useLoaderData() as {
    data: Array<{
      id: number;
      name: string;
      email: string;
      username: string;
      website: string;
    }>;
  };
....
<UserTableContainer>
  <span className="text-xl font-medium text-green-600">Users</span>
  <UserTableSearch></UserTableSearch>
  <UserTableSearchResults
    data={loaderData?.data || []}
  ></UserTableSearchResults>
</UserTableContainer>
```

- code in UserTableSearch.tsx, this component uses Form component from Remix to submit search (form submit)

```jsx
return (
  <Form
    className="mt-2 w-full rounded border-2 border-indigo-600 px-3 py-1 transition duration-300 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-indigo-50"
    method="get"
  >
    <UserTableSearchInput />
  </Form>
);
```

- UserTableSearchResults.tsx takes the user data as props

##### highlights

- In both Nextjs with RSC & Remix the data fetch and filter logic runs in server
- Nextjs needs manual wiring to form action and redirect/router.push with search params
- Nextjs runs the search and sends the component as stream (not only data the whole component)
- Remix provides a Form component which automatically post to route action/form get to route loader
- Remix runs the search and sends only the data ( however in case of low network speed the whole form will be submitted and whole ui will be rendered)

##### screenshots , first one is remix and second one is next js +rsc (verify the input focus state during search)

![Screenshot](https://github.com/gouthamrangarajan/reactjs/blob/main/remix-vs-next-rsc/remix.gif)
![Screenshot](https://github.com/gouthamrangarajan/reactjs/blob/main/remix-vs-next-rsc/react_rsc.gif)
