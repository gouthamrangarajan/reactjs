export const staggerParent = {
  inactive: {
    opacity: 0,
    y: "2rem",
  },
  active: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.4,
    },
  },
};
export const staggerChild = {
  inactive: {
    opacity: 0,
    y: "2rem",
  },
  active: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 7,
      stiffness: 50,
    },
  },
};
