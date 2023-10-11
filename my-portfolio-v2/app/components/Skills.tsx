import { type skillsArrayType } from "~/utils/schema";

export default function Skills({ data }: { data: skillsArrayType }) {
  return (
    <div className="w-full">
      <div className="flex w-full flex-shrink-0 flex-col">
        <span className="w-full text-center text-3xl font-semibold italic tracking-widest text-sky-700">
          Skills
        </span>
        <div className="mx-auto flex max-w-6xl flex-shrink-0 flex-wrap items-center justify-center gap-4 px-3 py-1">
          {data.map((el, ind) => (
            <div
              className={`rounded-xl p-1 ${getSlideUpAnimateClass(ind)} 
                                                ${
                                                  [
                                                    "NextJs",
                                                    "Azure Functions",
                                                    "Remix",
                                                  ].includes(el.name)
                                                    ? "h-32 w-32 pt-8"
                                                    : "h-24 w-24"
                                                }`}
              key={el.name}
            >
              <img
                src={el.imgSrc}
                key={el.name}
                alt={el.name}
                className="cursor-pointer rounded-xl object-contain"
                title={el.name}
              ></img>
            </div>
          ))}
          <span
            className={`rounded bg-sky-600 px-3 py-1 font-semibold text-white ${getSlideUpAnimateClass(
              15,
            )}`}
            key="more"
          >
            AND MANY MORE...
          </span>
        </div>
      </div>
    </div>
  );
}
function getSlideUpAnimateClass(ind: number) {
  switch (ind) {
    case 0:
      return ``;
    case 1:
      return `animate-[slide-up_0.6s_ease-in-out]`;
    case 2:
      return `animate-[slide-up_0.7s_ease-in-out]`;
    case 3:
      return `animate-[slide-up_0.8s_ease-in-out]`;
    case 4:
      return `animate-[slide-up_0.9s_ease-in-out]`;
    case 5:
      return `animate-[slide-up_1.0s_ease-in-out]`;
    case 6:
      return `animate-[slide-up_1.1s_ease-in-out]`;
    case 7:
      return `animate-[slide-up_1.2s_ease-in-out]`;
    case 8:
      return `animate-[slide-up_1.3s_ease-in-out]`;
    case 9:
      return `animate-[slide-up_1.4s_ease-in-out]`;
    case 10:
      return `animate-[slide-up_1.5s_ease-in-out]`;
    case 11:
      return `animate-[slide-up_1.6s_ease-in-out]`;
    case 12:
      return `animate-[slide-up_1.7s_ease-in-out]`;
    case 13:
      return `animate-[slide-up_1.8s_ease-in-out]`;
    case 14:
      return `animate-[slide-up_1.9s_ease-in-out]`;
    case 15:
      return `animate-[slide-up_2.0s_ease-in-out]`;
    default:
      return `animate-[slide-up_2.1s_ease-in-out]`;
  }
}
