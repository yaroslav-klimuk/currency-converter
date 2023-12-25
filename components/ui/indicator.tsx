import { PropsWithChildren } from "react"

export type IndicatorState = "success" | "warning" | "error" | "default"

export type IndicatorColors = Record<IndicatorState, string>

export interface IndicatorProps {
  state: IndicatorState
  indicatorColors?: IndicatorColors
}

export function Indicator({
  state = "default",
  indicatorColors,
  children,
}: PropsWithChildren<IndicatorProps>) {
  const statusColors: IndicatorColors = {
    success: "bg-green-300",
    error: "bg-red-400",
    warning: "bg-orange-300",
    default: "bg-gray-300",
  }

  const color = indicatorColors?.[state] || statusColors[state]

  return (
    <div className="flex items-center">
      <div className={`mr-2 h-2.5 w-2.5 rounded-full ${color}`} />
      {children && <span className="pr-1 text-sm font-medium">{children}</span>}
    </div>
  )
}
