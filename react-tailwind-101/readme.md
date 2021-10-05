### Vite, React & Tailwind CSS

Sample React Js app using Vite Js & Tailwind CSS

#### Highlights

- [Vite JS](https://vitejs.dev/)
- [React Js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Context Api](https://reactjs.org/docs/context.html)
- [React Suspense](https://reactjs.org/docs/concurrent-mode-suspense.html)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)

#### Code Contents

1. vite.config.js for setup

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
});
```

2. React Hooks to fetch data and store in state

```javascript
const useApi = (url) => {
  ...
  useEffect(async () => {
      ...
      const rwDt = await fetch(url);
      const jsonDt = await rwDt.json();
      setData(jsonDt);
   ...
  }, [url]);
...
```

3. Code splitting, React lazy and Suspense

```jsx
const UsersTable = lazy(() => import("./pages/UsersTable"));
const Modal = lazy(() => import("./pages/Modal"));
const Form = lazy(() => import("./pages/Form"));
...
 <Route exact path="/users">
    <Suspense fallback={<Loader></Loader>}>
        <UsersTable></UsersTable>
    </Suspense>
</Route>
<Route exact path="/modal">
    <Suspense fallback={<Loader></Loader>}>
        <Modal></Modal>
    </Suspense>
</Route>
```

4. Tailwind css classes

```css
index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```jsx
<div
  className="flex rounded-lg border-2 border-blue-500 focus-within:border-transparent
             transition-all duration-300 ease-in focus-within:ring-2 focus-within:ring-blue-500"
>
  <select
    className="appearance-none outline-none py-1 px-3 flex-1 rounded-lg"
    onInput={({ target }) => {
      updateFormData("select", target.value);
    }}
  >
    {["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"].map((el) => (
      <option key={el}>{el}</option>
    ))}
  </select>
  <div className="relative">
    <FaAngleDown className="w-4 h-4 text-gray-600 absolute top-0 right-0 mr-2 mt-2"></FaAngleDown>
  </div>
</div>
```

![select](https://github.com/gouthamrangarajan/reactjs/blob/main/react-tailwind-101/Select.PNG)

- package.json

```javascript
 "dependencies": {
    "framer-motion": "^4.1.17",
    "install": "^0.13.0",
    "react": "^17.0.0",
    "react-dom": "^17.0.0",
    "react-icons": "^4.2.0",
    "react-router-dom": "^5.3.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^1.0.0",
    "autoprefixer": "^10.3.5",
    "postcss": "^8.3.7",
    "tailwindcss": "^2.2.15",
    "vite": "^2.5.4"
  }
```

- tailwind.config.js

```javascript
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
```

- postcss.config.js

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

5. Sample UI Screenshots\
   ![Screenshot1](https://github.com/gouthamrangarajan/reactjs/blob/main/react-tailwind-101/Screenshot1.PNG)\
   ![Screenshot2](https://github.com/gouthamrangarajan/reactjs/blob/main/react-tailwind-101/Screenshot2.PNG)
