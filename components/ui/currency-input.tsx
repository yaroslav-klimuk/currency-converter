import * as React from "react"

import { cn } from "@/lib/utils"
import { Flag } from "@/components/ui/flag"
import { Input } from "@/components/ui/input"

export interface CurrencyInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  countryCode: string
  flagSize?: number
  containerClassName?: string
  flagClassName?: string
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    { countryCode, flagSize, containerClassName, flagClassName, ...props },
    ref
  ) => {
    return (
      <div className={cn("relative flex items-center", containerClassName)}>
        <Flag
          countryCode={countryCode}
          className={cn("absolute left-2", flagClassName)}
          size={flagSize}
        />
        <Input
          ref={ref}
          className="h-14 pl-11 text-base"
          type="number"
          inputMode="numeric"
          {...props}
        />
      </div>
    )
  }
)

CurrencyInput.displayName = "CurrencyInput"

export { CurrencyInput }
