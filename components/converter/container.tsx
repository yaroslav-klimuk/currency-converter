import { PropsWithChildren } from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface ContainerProps {
  className?: string
}

export default function Container({
  className,
  children,
}: PropsWithChildren<ContainerProps>) {
  return (
    <motion.div
      layout
      className={cn(
        "bg-background relative flex min-h-[600px] w-full max-w-[500px] flex-col rounded-xl border shadow-md",
        className
      )}
    >
      {children}
      <div className="mt-auto border-t p-3">footer</div>
    </motion.div>
  )
}
