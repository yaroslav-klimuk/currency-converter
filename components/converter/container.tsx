import { PropsWithChildren } from "react"

import { cn } from "@/lib/utils"

interface ContainerProps {
  className?: string
}

export default function Container({
  className,
  children,
}: PropsWithChildren<ContainerProps>) {
  return (
    <div
      className={cn(
        "bg-background relative flex min-h-[500px] w-full max-w-[500px] flex-col rounded-xl border shadow-md",
        className
      )}
    >
      {children}
      <div className="mt-auto border-t p-3"></div>
    </div>
  )
}
