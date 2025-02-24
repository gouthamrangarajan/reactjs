export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 7, stiffness: 50 },
  },
};

export const fadeIn2 = {
  initial: { opacity: 0, y: 5 },
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

export const stagger2 = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const fetcherResultMessage = {
  initial: {
    opacity: 0,
    scaleY: 0,
    transformOrigin: "top",
  },
  exit: {
    opacity: 0,
    scaleY: 0,
    transformOrigin: "top",
    transition: { duration: 0.2, ease: "easeInOut" },
  },
  animate: {
    opacity: 1,
    scaleY: 1,
    transformOrigin: "top",
    transition: {
      type: "spring",
      damping: 9,
      stiffness: 50,
    },
  },
};
