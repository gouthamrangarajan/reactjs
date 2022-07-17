export const moveNext = {
    initial: { opacity: 0, transform: 'translateX(5px)' },
    animate: { opacity: 1, transform: 'translateX(0)', transition: { duration: 0.2, ease: 'easeInOut' } }
}
export const movePrev = {
    initial: { opacity: 0, transform: 'translateX(-5px)' },
    animate: { opacity: 1, transform: 'translateX(0)', transition: { duration: 0.2, ease: 'easeInOut' } }
}