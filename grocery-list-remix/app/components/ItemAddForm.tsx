import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { useFetcher } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { addFormVariants } from "~/utils/helpers";

export default function ItemAddForm({
  closeFormAction,
}: {
  closeFormAction: () => void;
}) {
  const fetcher = useFetcher();
  const elToFocus = useRef<HTMLInputElement>(null);
  const firstFocusableEl = useRef<HTMLButtonElement>(null);
  const lastFocusableEl = useRef<HTMLButtonElement>(null);
  const timeout = useRef<number>();
  const [showForm, setShowForm] = useState(true);
  useEffect(() => {
    if (elToFocus.current) elToFocus.current.focus();
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);
  const close = () => {
    setShowForm(false);
    timeout.current = window.setTimeout(() => {
      closeFormAction();
    }, 300);
  };
  const keyDown = (ev: KeyboardEvent<HTMLDivElement>) => {
    if (ev.key === "Tab") {
      if (ev.shiftKey) {
        if (document.activeElement === firstFocusableEl.current) {
          ev.preventDefault();
          lastFocusableEl.current?.focus();
        }
      } else if (document.activeElement === lastFocusableEl.current) {
        ev.preventDefault();
        firstFocusableEl.current?.focus();
      }
    }
  };
  return createPortal(
    <div
      className=" fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/50 transition duration-300"
      onClick={close}
      onKeyDown={keyDown}
    >
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="z-10 flex w-11/12 flex-col rounded-xl bg-white px-4 py-2 shadow-2xl md:w-8/12 lg:w-3/12 lg:px-6 lg:py-4"
            variants={addFormVariants}
            initial="initial"
            exit="initial"
            animate="animate"
            onClick={(ev) => {
              ev.stopPropagation();
            }}
          >
            <div className="flex items-start justify-between border-b-2 border-gray-300">
              <span className="text-lg font-semibold text-green-600">
                Add Item
              </span>
              <button
                className="-mr-3 -mt-1 appearance-none rounded-full bg-gray-600 p-1 text-white outline-none transition-all duration-300 hover:bg-opacity-90 focus:ring-1 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-50 lg:-mt-3"
                onClick={close}
                ref={firstFocusableEl}
              >
                <XMarkIcon className="h-4 w-4"></XMarkIcon>
              </button>
            </div>
            <fetcher.Form method="POST" className="mt-6 flex flex-col gap-6">
              <input
                type="text"
                placeholder="Item e.g Apple"
                name="name"
                className="appearance-none border-b-2 border-gray-300 py-1 outline-none transition-colors duration-300 placeholder:italic placeholder:text-gray-600 focus:border-green-600"
                ref={elToFocus}
              />

              <input
                type="number"
                placeholder="Quantity e.g 2"
                className="appearance-none border-b-2 border-gray-300 py-1 outline-none transition-colors duration-300 placeholder:italic placeholder:text-gray-600 focus:border-green-600"
                name="quantity"
              />
              <button
                type="submit"
                name="action"
                value="add"
                className="flex appearance-none justify-center rounded bg-green-600 px-3 py-1 uppercase text-white outline-none transition-all duration-300 hover:bg-opacity-80 focus:ring-1 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                ref={lastFocusableEl}
              >
                <span>Submit</span>
              </button>
            </fetcher.Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
