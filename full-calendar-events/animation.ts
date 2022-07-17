export const moveNext = {
    initial: { opacity: 0, transform: 'translateX(5px)' },
    animate: { opacity: 1, transform: 'translateX(0)', transition: { duration: 0.3, ease: 'easeInOut' } }
}
export const movePrev = {
    initial: { opacity: 0, transform: 'translateX(-5px)' },
    animate: { opacity: 1, transform: 'translateX(0)', transition: { duration: 0.3, ease: 'easeInOut' } }
}

export const eventAnimate = {
    initial: { scale: 1.1 },
    animate: { scale: 1, transition: { duration: 0.3, ease: 'easeInOut' } }
}