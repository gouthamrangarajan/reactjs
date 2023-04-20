import { memo, useRef, useState } from "react";
import ArrowUpTrayIcon from "@heroicons/react/24/solid/ArrowUpTrayIcon";
import { useFetcher } from "react-router-dom";
import { motion } from "framer-motion";

const UploadBtn = () => {
  const [formAction, setFormAction] = useState("/");
  const fetcher = useFetcher();
  const fileEl = useRef<HTMLInputElement>(null);
  const formEl = useRef<HTMLFormElement>(null);
  const fileChanged = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let fl = ev.target.files?.[0];
    if (fl) {
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
      <motion.button
        layout="position"
        key={"upload_button"}
        className="appearance-none outline-none rounded-full shadow-2xl bg-purple-600 text-white hover:bg-opacity-80 transition-all duration-300 focus:ring-1 focus:ring-offset-2 focus:ring-purple-600 focus:ring-offset-purple-50 p-1 font-semibold"
        onClick={() => {
          if (fileEl.current) fileEl.current.click();
        }}
      >
        <ArrowUpTrayIcon className="w-7 h-7"></ArrowUpTrayIcon>
      </motion.button>
      <fetcher.Form method="PUT" ref={formEl} action={formAction}>
        <input
          type="file"
          style={{ display: "none" }}
          accept="application/json"
          ref={fileEl}
          onChange={fileChanged}
          name="file"
        />
      </fetcher.Form>
    </>
  );
};

export default memo(UploadBtn);
