export const staggerParent = {
  inactive: {
    opacity: 0,
    y: "2rem",
  },
  active: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.5,
      duration: 0.3,
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
  },
};
