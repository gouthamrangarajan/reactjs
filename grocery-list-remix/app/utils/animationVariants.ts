export const slideUpParentVariants = {
  initial: { opacity: 0, y: 100 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 7,
      stiffness: 50,
      staggerChildren: 0.07,
      delayChildren: 0.3,
    },
  },
};
export const slideUpChildrenVariants = {
  initial: { opacity: 0, y: 100 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 7,
      stiffness: 50,
    },
  },
};
export const slideRightParentVariants = {
  initial: { opacity: 0, x: -100 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 7,
      stiffness: 50,
      staggerChildren: 0.07,
      delayChildren: 0.3,
    },
  },
};
export const slideRightChildrenVariants = {
  initial: { opacity: 0, x: -100 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 7,
      stiffness: 50,
    },
  },
};

export const slideLeftParentVariants = {
  initial: { opacity: 0, x: 100 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 7,
      stiffness: 50,
      staggerChildren: 0.07,
      delayChildren: 0.3,
    },
  },
};
export const slideLeftChildrenVariants = {
  initial: { opacity: 0, x: 100 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 7,
      stiffness: 50,
    },
  },
};

export const scaleVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", damping: 9, stiffness: 50 },
  },
};

export const addFormVariants = {
  initial: { opacity: 0, y: 100 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 9, stiffness: 50 },
  },
};
