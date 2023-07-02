import Image from "next/image"

import { cn } from "@/lib/utils"

export interface FlagProps {
  countryCode: string
  size?: number
  className?: string
}

export function Flag({ countryCode, size, className }: FlagProps) {
  return (
    <Image
      src={`https://flagicons.lipis.dev/flags/1x1/${countryCode.toLowerCase()}.svg`}
      alt={countryCode}
      width={size ? size : 24}
      height={size ? size : 24}
      className={cn("rounded-full border", className)}
    />
  )
}
