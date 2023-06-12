### Next RSC 101

#### simeple code to play around React Server Components

- code in pages.tsx

```jsx
<UserTableContainer>
  <span className="text-xl font-medium text-green-600">Users</span>
  <UserTableSearch></UserTableSearch>
  <UserTableSearchResults search={user}></UserTableSearchResults>
</UserTableContainer>
```

- UserTableContainer is component with "use client"
- code in UserTableSearch.tsx

```jsx
async function search(data: FormData) {
  "use server";
  const { search } = Object.fromEntries(data.entries());
  if (search) redirect(`/?user=${search.toString().trim()}`);
  else redirect(`/`);
}
return (
  <form
    className="mt-2 w-full rounded border-2 border-indigo-600 px-3 py-1 transition duration-300 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-indigo-50"
    action={search}
  >
    <UserTableSearchInput />
  </form>
);
```

- UserTableSearchResults.tsx takes the user as props, filters and displays in table format
- UserTableSearchInput.tsx is a component with "use client", stores value in input based on search params

![Screenshot](https://github.com/gouthamrangarajan/reactjs/tree/main/next-rsc-101/react_rsc.gif)
