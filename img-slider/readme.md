### React Image Slider

Sample Image Slider using Vite, React & Tailwind CSS

#### Highlights

- [Vite JS](https://vitejs.dev/)
- [React Js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Hero Icons](https://heroicons.com/)

#### Code Contents

1. For Vite, React & Tailwind CSS setup check\
   https://github.com/gouthamrangarajan/reactjs/tree/main/react-tailwind-101

2. package.json

```json
  "dependencies": {
    "@heroicons/react": "^1.0.4",
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

3. useState to hold currentIndex of Slider Image

```javascript
const [currentIndex, setCurrentIndex] = useState(0);
const [isPlaying, setPlaying] = useState(false);
```

4. setTimeout + useEffect currentIndex dependency to change currentIndex

```javascript
useEffect(() => {
  let timeout = null;
  if (isPlaying && imgs.length > 0) {
    timeout = setTimeout(() => {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % imgs.length);
    }, TIMER);
  }
  return () => {
    if (timeout) clearTimeout(timeout);
  };
}, [imgs, currentIndex, isPlaying]);
```

5. Transition using Tailwind CSS classes and translateX images to achieve slide

```jsx
<div
  className="flex absolute top-0 left-0 transition-transform duration-1000"
  style={{
    transform: `translateX(-${getTranslateX(currentIndex, width)})`,
  }}
>
  {imgs.map((el) => (
    <div style={{ width: width, height: height }} key={el.id}>
      <Image key={el.id} {...el} height={height} width={width}></Image>
    </div>
  ))}
</div>
```

#### Screenshots

![Screenshot1](https://github.com/gouthamrangarajan/reactjs/blob/main/img-slider/Screenshot1.PNG)
![Screenshot2](https://github.com/gouthamrangarajan/reactjs/blob/main/img-slider/Screenshot2.PNG)
![Screenshot3](https://github.com/gouthamrangarajan/reactjs/blob/main/img-slider/Screenshot3.PNG)
![Screenshot6](https://github.com/gouthamrangarajan/reactjs/blob/main/img-slider/Screenshot6.PNG)
