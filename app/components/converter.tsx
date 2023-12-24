import { SkeletonTheme } from "react-loading-skeleton"

import { fetchRates } from "@/lib/api"
import { MotionDiv } from "@/components/ui/motion-div"
import Converter from "@/components/converter"

export default async function ConverterWidget() {
  const { rates } = await fetchRates()

  return (
    <SkeletonTheme
      baseColor="hsl(var(--muted))"
      highlightColor="hsl(210 50% 99%)"
    >
      <MotionDiv layout className={"relative flex flex-col gap-4"}>
        <Converter rates={rates} />
      </MotionDiv>
    </SkeletonTheme>
  )
}
