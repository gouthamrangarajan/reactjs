import { motion } from "framer-motion";
import Footer from "./components/Footer";
import Header from "./components/Header";
import QRGenerator from "./components/QRGenerator";
import { staggerParent } from "./helpers/animationVariants";

function App() {
  return (
    <div className="h-screen w-screen overflow-x-hidden bg-gradient-to-r from-sky-500 to-indigo-500">
      <Header></Header>
      <motion.div
        variants={staggerParent}
        initial="initial"
        animate="animate"
        layout="position"
      >
        <QRGenerator></QRGenerator>
        <Footer></Footer>
      </motion.div>
    </div>
  );
}

export default App;
