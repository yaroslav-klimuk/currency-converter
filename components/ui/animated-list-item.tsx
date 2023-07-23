import { PropsWithChildren, forwardRef } from "react"
import { motion } from "framer-motion"

const AnimatedListItem = forwardRef<HTMLDivElement, PropsWithChildren<{}>>(
  ({ children }, ref) => {
    return (
      <motion.div
        layout
        ref={ref}
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: "auto",
          opacity: 1,
          transition: {
            type: "spring",
            bounce: 0,
            duration: 0.25,
            opacity: { delay: 0.05 },
          },
        }}
        exit={{ height: 0, opacity: 0 }}
        transition={{
          type: "spring",
          bounce: 0,
          duration: 0.6,
          opacity: { duration: 0.12 },
        }}
      >
        {children}
      </motion.div>
    )
  }
)

AnimatedListItem.displayName = "AnimatedCurrencyInput"

export { AnimatedListItem }
