import { RadioGroup } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";

const FeedbackForm = ({ submit }) => {
  const [rating, setRating] = useState(10);
  const [comments, setComments] = useState("");
  const inpEl = useRef(null);
  const callSubmit = () => {
    if (comments.trim() != "") {
      submit({ feedback: comments.trim(), rating });
      setRating(10);
      inpEl.current.value = "";
      setComments("");
    }
  };
  return (
    <div className="card flex-col space-y-2 lg:space-y-4 w-full">
      <RadioGroup
        value={rating}
        onChange={setRating}
        className="flex flex-col space-y-2 lg:space-y-4 w-full  overflow-x-auto md:overflow-x-visible scrollbar-none"
      >
        <RadioGroup.Label className="text-gray-700 text-md sm:text-lg text-center">
          How likely are you to recommend UI <br /> Design Daily to your
          colleagues?
        </RadioGroup.Label>
        <div
          className="flex space-x-1 md:space-x-6 lg:space-x-5 xl:space-x-7 justify-center items-center
             h-10 transition-all duration-300"
        >
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
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      <div className="relative p-1 w-full">
        <div className="flex justify-between items-center w-full italic text-xs absolute -mt-4 text-gray-700">
          <span>Not likely at all</span>
          <span>Extremely likely</span>
        </div>
      </div>
      <div
        className="py-2 px-4 border-2 border-purple-500 focus-within:border-transparent  transition duration-300
             focus-within:ring-2 focus-within:ring-pink-300 focus-within:ring-offset-2 focus-within:ring-offset-pink-100
              rounded-lg flex space-x-1 items-center w-full"
      >
        <textarea
          className="outline-none appearance-none resize-none text-gray-700 flex-1 overflow-y-auto scrollbar-thin
          scrollbar-track-purple-50 scrollbar-thumb-purple-300 cursor-pointer"
          ref={inpEl}
          onKeyUp={(ev) => {
            if (ev.code == "Enter" && !ev.shiftKey) callSubmit();
            else setComments(ev.target.value);
          }}
          placeholder="Comments..."
        ></textarea>
        <button
          className={`appearance-none outline-none py-1 px-3 rounded-lg transition
             duration-300 bg-purple-600 text-white hover:opacity-90 focus:ring-2 focus:ring-purple-600
             focus:ring-offset-2 focus:ring-offset-purple-100 text-base
             ${
               comments.trim() == ""
                 ? "cursor-not-allowed bg-gray-700"
                 : "cursor-pointer"
             }
             `}
          disabled={comments.trim() == ""}
          title={comments.trim() == "" ? "Please fill in Comments..." : ""}
          onClick={() => {
            callSubmit();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;
