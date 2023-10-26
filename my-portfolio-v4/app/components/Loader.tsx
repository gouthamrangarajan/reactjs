import { useFetchers, useNavigation } from "@remix-run/react";
import { motion } from "framer-motion";

export default function Loader({ loading = false }: { loading?: boolean }) {
  const navigation = useNavigation();
  const fetchers = useFetchers();
  const show =
    navigation.state == "submitting" ||
    navigation.state == "loading" ||
    fetchers.findIndex(
      (ft) => ft.state == "submitting" || ft.state == "loading",
    ) > -1;
  if (!show && !loading) return <></>;
  return (
    <motion.div
      animate={{
        width: ["0%", "100%"],
        transition: {
          repeat: Infinity,
          repeatDelay: 0.3,
          duration: 3,
          ease: "easeIn",
        },
      }}
      className="absolute left-0 top-0 z-20 h-1 bg-slate-100"
    ></motion.div>
  );
}
