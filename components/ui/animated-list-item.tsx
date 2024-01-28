import { FC } from "react"
import { HTMLMotionProps, motion } from "framer-motion"

interface Props extends HTMLMotionProps<"div"> {}

const AnimatedListItem: FC<Props> = ({ children, ...props }) => {
  return (
    <motion.div
      layout
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: "auto",
        opacity: 1,
        transition: {
          type: "spring",
          bounce: 0,
          duration: 0.4,
          opacity: { delay: 0.1 },
        },
      }}
      exit={{
        height: 0,
        opacity: 0,
        transition: {
          type: "spring",
          bounce: 0,
          duration: 0.5,
          opacity: { duration: 0.15 },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

AnimatedListItem.displayName = "AnimatedCurrencyInput"

export { AnimatedListItem }
