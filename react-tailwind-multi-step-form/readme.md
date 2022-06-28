### Multi step form using React, Tailwind CSS & Framer Motion
#### Features
- Form elements like input and button using tailwind css utility class (transition, ring etc.)
- Step indicator using Framer Motion Layout Animation

- Layout Animation for step indicator
```jsx
{[1, 2, 3].map(el => (
<div className="flex flex-col w-1/3 justify-center items-center space-y-1 " key={el}>
    <div className="h-2 w-full bg-gray-300 rounded-full relative">
        {step == el && <motion.div className="h-full w-full bg-purple-600 rounded-full absolute top-0 left-0"
            layoutId="indicator" key={el}>
        </motion.div>
        }
    </div>
...
```
#### Screenshot
![Screenshot](https://github.com/gouthamrangarajan/reactjs/blob/main/react-tailwind-multi-step-form/screenshot.gif)