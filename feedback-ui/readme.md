### React Feedback UI

Sample Feedback UI using Vite, React & Tailwind CSS

![Screenshot](https://github.com/gouthamrangarajan/reactjs/blob/main/feedback-ui/Screenshot1.PNG)\

#### Highlights

- [Vite JS](https://vitejs.dev/)
- [React Js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI](https://headlessui.dev/)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Framer Motion](https://www.framer.com/motion/)

#### Code Contents

1. For Vite, React & Tailwind CSS setup check\
   https://github.com/gouthamrangarajan/reactjs/tree/main/react-tailwind-101

2. package.json

```json
 "dependencies": {
    "@headlessui/react": "^1.4.1",
    "framer-motion": "^4.1.17",
    "react": "^17.0.0",
    "react-dom": "^17.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^1.0.0",
    "autoprefixer": "^10.3.7",
    "postcss": "^8.3.9",
    "tailwind-scrollbar": "^1.3.1",
    "tailwindcss": "^2.2.17",
    "vite": "^2.6.4"
  }
```

3. Radio Group from Headless UI to represent rating system

- https://headlessui.dev/react/radio-group#basic-example
- RadioGroup

```jsx
<RadioGroup
  value={rating}
  onChange={setRating}
  className="flex flex-col space-y-2 lg:space-y-4 w-full  overflow-x-auto md:overflow-x-visible scrollbar-none"
>
```

- RadioGroup.Label

```jsx
<RadioGroup.Label className="text-gray-700 text-md sm:text-lg text-center">
  How likely are you to recommend UI <br /> Design Daily to your colleagues?
</RadioGroup.Label>
```

- RadioGroup.Option\
  gets active & checked render props for styling options

```jsx
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
      <RadioGroup.Option
        value={el}
        key={el}
        className="appearance-none outline-none"
      >
        {({ active, checked }) => (
          <span
            className={`appearance-none outline-none rounded-full text-gray-700 transition duration-300
                                 py-1 hover:bg-pink-200
                                 ${el < 10 ? "px-3" : "px-2"}
                  ${checked ? "bg-pink-300 " : "bg-purple-50"}
                  ${
                    active
                      ? "ring-2 ring-pink-400 ring-offset-2 ring-offset-pink-100"
                      : ""
                  }
                `}
          >
            {el}
          </span>
        )}
```
