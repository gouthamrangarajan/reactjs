import { type skillsArrayType } from "~/utils/schema";

export default function Skills({ data }: { data: skillsArrayType }) {
  return (
    <div className="w-full pb-3 lg:pb-0">
      <div className="flex w-full flex-shrink-0 flex-col">
        <span className="w-full text-center text-3xl font-semibold italic tracking-widest text-sky-700">
          Skills
        </span>
        <div className="mx-auto flex max-w-6xl flex-shrink-0 flex-wrap items-center justify-center gap-4 px-3 py-1">
          {data.map((el, ind) => (
            <div
              className={`rounded-xl p-1 
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
            className={`rounded bg-sky-600 px-3 py-1 font-semibold text-white `}
            key="more"
          >
            AND MANY MORE...
          </span>
        </div>
      </div>
    </div>
  );
}
