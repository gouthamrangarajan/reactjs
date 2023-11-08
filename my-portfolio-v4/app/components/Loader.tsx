import { useFetchers, useLocation, useNavigation } from "@remix-run/react";
import { motion } from "framer-motion";

export default function Loader({ loading = false }: { loading?: boolean }) {
  const navigation = useNavigation();
  const location = useLocation();
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
      initial={{
        transformOrigin: "left",
      }}
      animate={{
        scaleX: ["0", "100%"],
        transformOrigin: "left",
        transition: {
          repeat: Infinity,
          repeatDelay: 0.3,
          duration: 3,
          ease: "easeIn",
        },
      }}
      className={`absolute left-0 top-0 z-20 h-1 w-full ${
        location.pathname == "/contact" ? "bg-slate-700" : "bg-slate-100"
      }`}
    ></motion.div>
  );
}
