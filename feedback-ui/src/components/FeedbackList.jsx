import FeedbackCard from "./FeedbackCard";

const FeedbackList = ({ items }) => {
  return (
    <div
      className="text-white text-lg flex flex-col space-y-4
                items-center w-full pt-4 overflow-y-auto scrollbar-thin
                scrollbar-track-purple-50 scrollbar-thumb-purple-300 scrollbar-thumb-rounded-md"
    >
      {items.map((item) => (
        <FeedbackCard item={item} key={item.id}></FeedbackCard>
      ))}
    </div>
  );
};
export default FeedbackList;
