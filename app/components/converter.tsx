import { Rate } from "@/types/currency"
import { fetchRates } from "@/lib/api"
import { MotionDiv } from "@/components/ui/motion-div"
import Converter from "@/components/converter"

export default async function ConverterWidget() {
  const { rates } = await fetchRates()

  return (
    <MotionDiv layout className={"relative flex flex-col gap-4"}>
      <Converter rates={rates} />
    </MotionDiv>
  )
}
