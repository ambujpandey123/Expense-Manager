// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"

function AnimateLogo({ children }) {
    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{
                y: [-2, 2],
                transition: {
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }
            }}
           
        >
            {children}
        </motion.div>
    )

}
function AnimateFromLeft({ children }) {
    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{
                x: 0, opacity: 1,
                transition: { duration: 1.5 }
            }}
        >
            {children}
        </motion.div>
    )
}
function AnimateFromRight({ children }) {
    return (
        <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{
                x: 0, opacity: 1,
                transition: { duration: 1.5 }

            }}
        >
            {children}
        </motion.div>
    )
}
function AnimateFromTop({ children }) {
    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{
                y: 0, opacity: 1,
                transition: { duration: 2 }
            }}
        >
            {children}
        </motion.div>
    )
}
function AnimateFromDown({ children }) {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{
                y: 0, opacity: 1,
                transition: { duration: 2}
            }}
        >
            {children}
        </motion.div>
    )   
}
function AnimateFromDownBtn({ children }) {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{
                y: 0, opacity: 1,
                transition: { duration: 2, delay: 0.5 }
            }}
            drag
            dragConstraints={{ top: 0, left: -10, right: 10, bottom: 0 }}
        >
            {children}
        </motion.div>
    )   
}
function AnimateFromDownTable({ children }) {
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{
                y: 0, opacity: 1,
                transition: { duration: 2 }
            }}
        >
            {children}
        </motion.div>
    )   
}
function AnimateScale({ children }) {
    return (
        <motion.div
            initial={{ scale: 0.6 }}
            animate={{
                scale: 1,
                transition: { duration: 2 }
            }}
        >
            {children}
        </motion.div>
    )
}
function AnimateScaleButton({ children }) {
    return (
        <motion.div
            initial={{ scale: 0.9 }}
            animate={{
                scale: [0.9, 1, 0.9],
                transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
             drag
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
            {children}
        </motion.div>
    )
}

export { AnimateLogo, AnimateFromLeft, AnimateFromRight, AnimateFromTop, AnimateFromDown, AnimateScale, AnimateScaleButton ,AnimateFromDownTable,AnimateFromDownBtn}