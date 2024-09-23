import { FC, MouseEventHandler, ReactNode } from "react"

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
  return (
    <ContextMenu>
      <ContextMenuTrigger disabled={disabled}>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          className="cursor-pointer p-3 text-base md:px-2 md:py-1.5"
          onClick={onEditModeClick}
        >
          <Icons.shuffle size={18} className="mr-2" />
          Reorder
        </ContextMenuItem>
        <ContextMenuItem
          disabled={isDeleteDisabled}
          className="text-destructive focus:text-destructive cursor-pointer p-3 text-base md:px-2 md:py-1.5"
          onClick={onDeleteClick}
        >
          <Icons.trash size={18} className="mr-2" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default InputContextMenu
