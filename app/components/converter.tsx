import { fetchRates } from "@/lib/api"
import Converter from "@/components/converter"

export default async function ConverterWidget() {
  const { rates } = await fetchRates()

  return <Converter rates={rates} />
}
