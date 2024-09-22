import { FC, RefObject, useRef } from "react"
import { motion, MotionProps, PanInfo } from "framer-motion"
import { useOnClickOutside } from "usehooks-ts"

import { Currency, CurrencyCode } from "@/types/currency"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  CurrencyInput,
  CurrencyInputProps,
} from "@/components/ui/currency-input"
import { Icons } from "@/components/icons"

interface DraggableInputProps extends CurrencyInputProps {
  draggable: boolean
  isDragged: boolean
  dragConstraints?: RefObject<HTMLElement>
  motionProps?: MotionProps
  onRemove?: (currency: Currency) => void
  setIsDragged: (currencyCode: CurrencyCode, isDragged: boolean) => void
}

const DraggableInput: FC<DraggableInputProps> = ({
  draggable,
  isDragged,
  currency,
  dragConstraints,
  disabled,
  motionProps,
  onRemove,
  setIsDragged,
  ...props
}) => {
  const ref = useRef(null)

  const onRemoveClick = () => {
    if (onRemove) {
      setIsDragged(currency.currencyCode, false)
      setTimeout(() => onRemove(currency), 70)
    }
  }

  const handleDragEnd = (info: PanInfo) => {
    const offset = info.offset.x
    const threshold = -50
    setIsDragged(currency.currencyCode, offset < threshold)
  }

  const handleOutsideClick = () => {
    setIsDragged(currency.currencyCode, false)
  }

  useOnClickOutside(ref, handleOutsideClick)

  return (
    <motion.div
      ref={ref}
      className={cn(
        "z-10 w-full overflow-hidden",
        disabled && "pointer-events-none"
      )}
      {...motionProps}
    >
      <motion.div
        className="relative flex items-center justify-between p-1"
        drag={draggable && "x"}
        dragDirectionLock
        dragConstraints={{ left: isDragged ? -68 : 0, right: 0 }}
        dragElastic={{ left: 0.3, right: 0.01 }}
        onDragEnd={(_, info) => handleDragEnd(info)}
        animate={{
          x: isDragged ? -68 : 0,
        }}
        transition={{ type: "tween", duration: 0.2 }}
      >
        <CurrencyInput currency={currency} disabled={disabled} {...props} />
        <Button
          tabIndex={isDragged ? 0 : -1}
          variant="destructive"
          className="absolute right-[-60px] h-[66px] rounded-lg"
          onClick={onRemoveClick}
        >
          <Icons.trash />
        </Button>
      </motion.div>
    </motion.div>
  )
}

DraggableInput.displayName = "DraggableInput"

export { DraggableInput, type DraggableInputProps }
