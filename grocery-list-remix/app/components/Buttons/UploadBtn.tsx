import { useRef, useState } from "react";
import ArrowUpTrayIcon from "@heroicons/react/24/solid/ArrowUpTrayIcon";
import { motion } from "framer-motion";
import { useFetcher } from "@remix-run/react";
import { scaleVariants } from "~/utils/helpers";

export default function UploadBtn() {
  const [formAction, setFormAction] = useState("/");
  const fetcher = useFetcher();
  const fileEl = useRef<HTMLInputElement>(null);
  const formEl = useRef<HTMLFormElement>(null);
  const fileChanged = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let fl = ev.target.files?.[0];
    if (fl && fl.type == "text/plain") {
      var fr = new FileReader();
      fr.onload = () => {
        setFormAction(`/?data=${fr.result as string}`);
        setTimeout(() => {
          fetcher.submit(formEl.current, {
            method: "PUT",
          });
          if (formEl.current) formEl.current.reset();
        });
      };
      fr.readAsText(fl);
    }
  };
  return (
    <>
      <motion.div
        variants={scaleVariants}
        initial="initial"
        exit="initial"
        animate="animate"
        key={"upload_button"}
      >
        <button
          className="appearance-none rounded-full bg-purple-600 p-1 font-semibold text-white shadow-2xl outline-none transition-all duration-300 hover:bg-opacity-80 focus:ring-1 focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-purple-50"
          onClick={() => {
            if (fileEl.current) fileEl.current.click();
          }}
        >
          <ArrowUpTrayIcon className="h-6 w-6"></ArrowUpTrayIcon>
        </button>
      </motion.div>
      <fetcher.Form method="PUT" ref={formEl} action={formAction}>
        <input
          type="file"
          style={{ display: "none" }}
          accept="text/plain"
          ref={fileEl}
          onChange={fileChanged}
          name="file"
        />
      </fetcher.Form>
    </>
  );
}
