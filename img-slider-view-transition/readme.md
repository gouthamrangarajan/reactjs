### React Image Slider

Sample Image Slider using React & Browser View Transition Api

#### Code Highlights

- Code for currentIndex change (check document.startViewTransition)

```jsx
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexImg = imgs[currentIndex];
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        key={currentIndexImg.id}
        src={currentIndexImg.url}
        alt={currentIndexImg.text}
        height={height}
        width={width}
        className="object-cover w-full h-full"
      />
      <div className="absolute top-10 w-full flex items-center justify-center slider-text">
        <p className="w-11/12 lg:w-[28rem] py-2 px-4 shadow rounded bg-white text-gray-600">
          {currentIndexImg.text}
        </p>
      </div>
      <SliderControls
        noOfItems={imgs.length}
        goToItem={(idx) => {
          if (idx !== currentIndex) {
            /*@ts-ignore*/
            document.startViewTransition(() => {
              setCurrentIndex(idx);
            });
          }
        }}
      ></SliderControls>
    </div>
```

- code for SliderControls

```jsx
<div className="absolute bottom-10 left-0 w-full flex justify-center items-center gap-2 flex-wrap slider-controls">
  {Array.from({ length: noOfItems }, (_, idx) => (
    <button
      onClick={() => goToItem(idx)}
      key={`button_${idx}`}
      aria-label={`Go To Image ${idx + 1}`}
      className="rounded-full w-3 h-3 bg-gray-100 transition duration-300 focus:ring-1 focus:ring-gray-100 focus:ring-offset-2 focus:ring-offset-gray-600"
    ></button>
  ))}
</div>
```

- css changes

```css
.slider-controls {
  view-transition-name: slider-controls;
}
.slider-text {
  view-transition-name: slider-text;
}

@keyframes slide-from-right {
  from {
    transform: translateX(100%);
  }
}

@keyframes slide-to-left {
  to {
    transform: translateX(-100%);
  }
}

::view-transition-old(root) {
  animation: 1000ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
}

::view-transition-new(root) {
  animation: 1000ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
}

::view-transition-old(slider-text),
::view-transition-new(slider-text) {
  height: 100%;
  transition: height 1000ms ease-in;
}

::view-transition-old(slider-controls),
::view-transition-new(slider-controls) {
  transition: none;
}
```

#### Links to check

- ![MDN link](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
- ![Chrome Developer Docs](https://developer.chrome.com/docs/web-platform/view-transitions/)

#### Screenshots

![Screenshot1](https://github.com/gouthamrangarajan/reactjs/blob/main/img-slider-view-transition/Screenshot1.png)
![Screenshot2](https://github.com/gouthamrangarajan/reactjs/blob/main/img-slider-view-transition/Screenshot2.png)
![Screenshot3](https://github.com/gouthamrangarajan/reactjs/blob/main/img-slider-view-transition/Screenshot3.png)
