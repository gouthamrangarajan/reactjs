export const modalVariants = {
  visible: {
    y: 0,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  hidden: { y: "-50vh" },
  exit: { y: "-50vh" },
};
