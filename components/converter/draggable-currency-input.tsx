import { FC, useRef } from "react"
import { motion, PanInfo, Variants } from "framer-motion"
import { useOnClickOutside } from "usehooks-ts"

import { Currency, CurrencyCode } from "@/types/currency"
import { Button } from "@/components/ui/button"
import {
  CurrencyInput,
  CurrencyInputProps,
} from "@/components/ui/currency-input"
import { Icons } from "@/components/icons"

interface DraggableCurrencyInputProps extends CurrencyInputProps {
  draggable: boolean
  isDragged: boolean
  onRemove?: (currency: Currency) => void
  setIsDragged: (currencyCode: CurrencyCode, isDragged: boolean) => void
}

const itemVariants: Variants = {
  initial: {
    height: 0,
    opacity: 0,
    marginBottom: 0,
  },
  visible: {
    height: "auto",
    opacity: 1,
    marginBottom: "0.75rem",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.6,
      opacity: { delay: 0.1 },
    },
  },
  hidden: {
    height: 0,
    opacity: 0,
    scale: 0.8,
    marginBottom: 0,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.6,
      opacity: { duration: 0.15 },
      scale: { duration: 0.2 },
    },
  },
}

const buttonVariants: Variants = {
  initial: {
    x: -20,
  },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.5,
    },
  },
  hidden: {
    x: -20,
  },
}

const DraggableCurrencyInput: FC<DraggableCurrencyInputProps> = ({
  draggable,
  isDragged,
  currency,
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

    if (offset < threshold) {
      setIsDragged(currency.currencyCode, true)
    } else {
      setIsDragged(currency.currencyCode, false)
    }
  }

  const handleOutsideClick = () => {
    setIsDragged(currency.currencyCode, false)
  }

  useOnClickOutside(ref, handleOutsideClick)

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="initial"
      animate="visible"
      exit="hidden"
      className="relative mb-3 box-border flex w-full items-center rounded-lg bg-transparent last:!mb-0"
      role="listitem"
    >
      <div className={"z-10 w-full overflow-hidden"}>
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
          <CurrencyInput currency={currency} disabled={isDragged} {...props} />
          <Button
            tabIndex={isDragged ? 0 : -1}
            variant="destructive"
            className="absolute right-[-60px] h-[66px] rounded-lg"
            onClick={onRemoveClick}
          >
            <Icons.trash />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

DraggableCurrencyInput.displayName = "DraggableCurrencyInput"

export default DraggableCurrencyInput
