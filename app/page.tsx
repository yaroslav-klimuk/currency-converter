import { Rate } from "@/types/currency"
import { fetchRates } from "@/lib/api"
import ConverterPage from "@/app/converter/page"

export default async function IndexPage() {
  const ratesResponse = await fetchRates()

  const normalizedRates = Object.values(ratesResponse.rates).reduce(
    (acc, { code, value }) => {
      return { ...acc, [code]: value.toFixed(2) }
    },
    {} as Rate
  )

  return (
    <ConverterPage
      rates={normalizedRates}
      remaningQuota={ratesResponse.remainingQuota}
    />
  )
}
