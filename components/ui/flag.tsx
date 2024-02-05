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

export function Flag({ countryCode, size = 22, className }: FlagProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  return (
    <div
      className={cn("flex", className)}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {!isLoaded && (
        <Skeleton
          circle
          width={`${size}px`}
          height={`${size}px`}
          containerClassName={cn("flex items-center")}
        />
      )}
      <Image
        // src={`https://flagicons.lipis.dev/flags/1x1/${countryCode.toLowerCase()}.svg`}
        src={`https://hatscripts.github.io/circle-flags/flags/${countryCode.toLowerCase()}.svg`}
        alt={countryCode}
        width={size}
        height={size}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        className={`rounded-full border ${isLoaded ? "opacity-100" : "opacity-0"}`}
        onLoadingComplete={() => setIsLoaded(true)}
      />
    </div>
  )
}
