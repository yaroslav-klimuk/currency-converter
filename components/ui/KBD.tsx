import { ComponentType, PropsWithChildren } from "react"

interface Props {}

const KBD: ComponentType<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <kbd className="text-foreground bg-kbd inline-flex size-5 h-5 min-w-5 shrink-0 select-none items-center justify-center whitespace-nowrap rounded-sm p-1 font-sans text-xs">
      {children}
    </kbd>
  )
}

export default KBD
