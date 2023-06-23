export default function SliderControls({
  noOfItems,
  goToItem,
}: {
  noOfItems: number;
  goToItem: (index: number) => void;
}) {
  return (
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
  );
}
