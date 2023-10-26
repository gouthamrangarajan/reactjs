export const slideUp = {
  initial: { y: "-2rem", opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 7,
      stiffness: 50,
    },
  },
};
