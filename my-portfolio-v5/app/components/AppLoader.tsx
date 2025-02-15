import { motion } from "motion/react";
import { useFetchers, useNavigation } from "react-router";

export default function AppLoader() {
  const show =
    useNavigation().state != "idle" ||
    useFetchers().find((fetcher) => fetcher.state != "idle") != undefined;

  if (!show) {
    return <></>;
  }
  return (
    <motion.div
      className="absolute left-0 top-0 h-1 w-full origin-left bg-gray-100"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1,
      }}
    ></motion.div>
  );
}
