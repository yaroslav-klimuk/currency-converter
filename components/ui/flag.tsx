import { useState } from "react"
import Image from "next/image"
import Skeleton from "react-loading-skeleton"

import "react-loading-skeleton/dist/skeleton.css"
import { cn } from "@/lib/utils"

export interface FlagProps {
  countryCode: string
  size?: number
  className?: string
}

export function Flag({ countryCode, size, className }: FlagProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  return (
    <div className={cn("flex", className)}>
      {!isLoaded && (
        <Skeleton
          circle
          width={size ? `${size}px` : "24px"}
          height={size ? `${size}px` : "24px"}
          containerClassName={cn("flex items-center")}
        />
      )}
      <Image
        src={`https://flagicons.lipis.dev/flags/1x1/${countryCode.toLowerCase()}.svg`}
        alt={countryCode}
        width={size ? size : 24}
        height={size ? size : 24}
        className={`rounded-full border ${isLoaded ? "opacity-100" : "opacity-0"}`}
        onLoadingComplete={() => setIsLoaded(true)}
      />
    </div>
  )
}
