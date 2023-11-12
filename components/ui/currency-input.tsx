import * as React from "react"

import { cn } from "@/lib/utils"
import { Flag } from "@/components/ui/flag"
import { Input } from "@/components/ui/input"

export interface CurrencyInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  countryCode: string
  size?: number
  containerClassName?: string
  flagClassName?: string
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ countryCode, size, containerClassName, flagClassName, ...props }, ref) => {
    return (
      <div className={cn("relative flex items-center", containerClassName)}>
        <Flag
          countryCode={countryCode}
          className={cn("absolute left-2", flagClassName)}
          size={size}
        />
        <Input
          ref={ref}
          className="pl-10"
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
