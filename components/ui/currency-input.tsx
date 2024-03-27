import * as React from "react"
import { ChangeEventHandler, FC, FocusEventHandler, useRef } from "react"

import { Currency } from "@/types/currency"
import { cn } from "@/lib/utils"
import { Flag } from "@/components/ui/flag"
import { Input } from "@/components/ui/input"

export interface CurrencyInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  currency: Currency
  containerClassName?: string
}

const CurrencyInput: FC<CurrencyInputProps> = ({
  currency,
  containerClassName,
  value,
  onChange,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    const input = event.target

    setTimeout(() => {
      const length = input.value.length
      input.setSelectionRange(length, length)
    }, 0)
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.target.value

    if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
      if (onChange) {
        onChange(event)
      }
    }
  }

  return (
    <div
      onClick={focusInput}
      className={cn(
        "bg-background focus-within:ring-ring ring-offset-background flex w-full cursor-pointer select-none items-center justify-between rounded-lg border p-4 transition-shadow focus-within:ring-2 focus-within:ring-offset-2",
        containerClassName
      )}
    >
      <div className="mr-1 flex shrink-0">
        <Flag countryCode={currency.countryCode} size={32} />
        <div className="ml-3 flex flex-col justify-center">
          <span className="text-nowrap pb-1 text-base leading-3">
            {currency.currencyName}
          </span>
          <span className="text-ring text-sm leading-3">
            {currency.currencyCode}
          </span>
        </div>
      </div>
      <Input
        ref={inputRef}
        value={value}
        className="size-auto min-w-3 max-w-[40%] shrink text-ellipsis rounded-none border-none p-0 text-right text-base focus-visible:ring-0 focus-visible:ring-offset-0"
        inputMode="numeric"
        placeholder="0"
        aria-label={`${currency.currencyCode} currency input`}
        onFocus={handleFocus}
        onChange={handleChange}
        {...props}
      />
    </div>
  )
}

CurrencyInput.displayName = "CurrencyInput"

export { CurrencyInput }
