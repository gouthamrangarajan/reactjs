import { motion } from "framer-motion";
const Layout = ({ children }) => {
  return (
    <motion.div
      className={`py-4 px-6 shadow-2xl bg-white rounded-lg flex flex-col space-y-4`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
export default Layout;
