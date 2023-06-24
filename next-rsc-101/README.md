### Next RSC 101

#### simple code to play around React Server Components

- code in pages.tsx

```jsx
<UserTableContainer>
  <span className="text-xl font-medium text-green-600">Users</span>
  <UserTableSearch></UserTableSearch>
  <Suspense fallback={<></>}>
    <UserTableSearchResults search={user}></UserTableSearchResults>
  </Suspense>
</UserTableContainer>
```

- UserTableContainer is a layout component, can be made client side by using "use client"
- UserTableSearch.tsx is a client component which uses UseRouter hook to set searchParams
- code in UserTableSearch.tsx

```jsx
const router = useRouter();
  const formSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const { search } = Object.fromEntries(
      new FormData(ev.target as HTMLFormElement).entries()
    );
    if (search) router.push(`/?user=${search.toString().trim()}`);
    else router.push(`/`);
};
return (
  <form
    className="mt-2 w-full rounded border-2 border-indigo-600 px-3 py-1 transition duration-300 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-indigo-50"
     onSubmit={formSubmit}
  >
    <UserTableSearchInput />
  </form>
);
```

- UserTableSearchInput.tsx is a component in UserTableSearch stores value in input based on search params
- UserTableSearchResults.tsx takes the searched user as props, filters and displays in table format 

##### screenshots

![Screenshot](https://github.com/gouthamrangarajan/reactjs/blob/main/next-rsc-101/react_rsc.gif)
![Screenshot](https://github.com/gouthamrangarajan/reactjs/blob/main/next-rsc-101/Screenshot1.png)
![Screenshot](https://github.com/gouthamrangarajan/reactjs/blob/main/next-rsc-101/Screenshot2.png)
