import * as React from "react"

import { cn } from "@/lib/utils"
import { Flag } from "@/components/ui/flag"
import { Input } from "@/components/ui/input"

interface CurrencyInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  countryCode: string
  size?: number
  flagClassName?: string
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ countryCode, size, flagClassName, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <Flag
          countryCode={countryCode}
          className={cn("absolute left-2 h-5 w-5", flagClassName)}
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
