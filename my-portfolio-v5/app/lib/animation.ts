export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 7, stiffness: 50 },
  },
};

export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};
