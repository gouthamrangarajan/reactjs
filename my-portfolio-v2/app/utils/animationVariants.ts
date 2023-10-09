export const staggerParent = {
  hidden: {
    opacity: 0,
    y: "2rem",
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      staggerChildren: 0.3,
    },
  },
};
export const staggerChild = {
  hidden: {
    opacity: 0,
    y: "2rem",
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 7,
      stiffness: 50,
    },
  },
};
export const fade = {
  hidden: {
    opacity: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.3
    }
  },
  show: {
    opacity: 1,
    transition: {
      ease: "easeInOut",
      duration: 0.3
    }
  }
}
export const headerTextParent = {
  hidden: { y: "-2rem", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
      staggerChildren: 0.3,
      staggerDirection: -1
    },
  },
};
export const headerTextChild = {
  hidden: { opacity: 0, y: "-2rem" },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 7,
      stiffness: 50,
    }
  },
};
