export const staggerParent = {
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.3,
      delayChildren: 0.3,
    },
  },
  initial: {
    y: "1rem",
    opacity: 0,
  },
};
export const staggerChild = {
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 5,
      duration: 0.3,
    },
  },
  initial: {
    y: "1rem",
    opacity: 0,
  },
};

export const slideDown = {
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 50, damping: 5, duration: 0.3 },
  },
  initial: {
    y: "-100%",
    opacity: 0,
  },
};
export const fade = {
  animate: {
    opacity: 1,
    transition: { duation: 0.3 },
  },
  initial: {
    opacity: 0,
  },
};
