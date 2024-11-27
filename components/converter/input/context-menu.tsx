import { FC, MouseEventHandler, ReactNode } from "react"
import Bowser from "bowser"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Icons } from "@/components/icons"

interface InputContextMenuProps {
  disabled: boolean
  isDeleteDisabled?: boolean
  onEditModeClick: MouseEventHandler<HTMLDivElement>
  onDeleteClick: MouseEventHandler<HTMLDivElement>
  children: ReactNode
}

const InputContextMenu: FC<InputContextMenuProps> = ({
  disabled,
  isDeleteDisabled,
  onEditModeClick,
  onDeleteClick,
  children,
}) => {
  const osName = Bowser.getParser(window.navigator.userAgent).getOSName()
  const isMac = osName === "macOS"

  return (
    <ContextMenu>
      <ContextMenuTrigger disabled={disabled}>{children}</ContextMenuTrigger>
      <ContextMenuContent className="min-w-40">
        <ContextMenuItem
          className="cursor-pointer select-none gap-2 p-3 text-sm md:px-2 md:py-1.5"
          onClick={onEditModeClick}
        >
          <span className="flex w-full items-center gap-2">
            <Icons.shuffle size={16} />
            Reorder
          </span>
        </ContextMenuItem>
        <ContextMenuItem
          disabled={isDeleteDisabled}
          className="text-destructive focus:text-destructive cursor-pointer select-none gap-2 p-3 text-sm md:px-2 md:py-1.5"
          onClick={onDeleteClick}
        >
          <span className="flex w-full items-center gap-2">
            <Icons.trash size={16} />
            Delete
          </span>
          <div className="ml-auto flex gap-0.5">
            <kbd className="text-foreground inline-flex h-5 min-w-5 shrink-0 select-none items-center justify-center whitespace-nowrap rounded-sm bg-neutral-200 p-1 font-sans text-xs">
              {isMac ? "⌘" : "CTRL"}{" "}
            </kbd>
            <kbd className="text-foreground inline-flex size-5 h-5 min-w-5 shrink-0 select-none items-center justify-center whitespace-nowrap rounded-sm bg-neutral-200 p-1 font-sans text-xs">
              ⌫
            </kbd>
          </div>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default InputContextMenu
