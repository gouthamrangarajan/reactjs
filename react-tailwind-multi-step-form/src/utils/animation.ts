export const slideDown = {
    initial: { opacity: 0, y: '-100%' },
    animate: {
        opacity: 1, y: 0,
        transition: { duartion: 1, type: 'spring', stiffness: 200, damping: 10, bounce: 0.25 }
    }
}
export const slideLeft = {
    initial: { opacity: 0, x: 10 },
    animate: {
        opacity: 1, x: 0,
        transition: { duration: 0.3, ease: "easeInOut" }
    },
    exit: {
        opacity: 0, x: -10
    }
}
export const slideRight = {
    initial: { opacity: 0, x: -10 },
    animate: {
        opacity: 1, x: 0,
        transition: { duration: 0.3, ease: "easeInOut" }
    },
    exit: {
        opacity: 0, x: 10
    }
}