export default function HeaderText({
  classes = "",
  text,
  dark = false
}: {
  classes?: string;
  text: string;
  dark?: boolean;
}) {
  return (
    <div
      className={` bg-gradient-to-r  bg-clip-text text-transparent 
        ${dark ? "from-sky-700 to-sky-600 " : "from-sky-200 to-sky-400 "}
       ${classes}`}
      key={text}
    >
      {text}
    </div>
  );
}
