import { CurrencyCode, Rate, RatesResponse } from "@/types/currency"
import Converter from "@/components/converter"

const defaultCurrecnies: CurrencyCode[] = ["USD", "EUR", "PLN", "BYN"]

const fetchRates = async (): Promise<RatesResponse> => {
  const response = await fetch(
    "https://api.currencyapi.com/v3/latest?currencies=USD,EUR,PLN,BYN",
    {
      headers: {
        apiKey: process.env.CURRENCY_API_KEY!,
      },
    }
  )
  const { data } = await response.json()

  return {
    rates: data,
  }
}

export default async function IndexPage() {
  const rates = await fetchRates()
  const normalizedRates = Object.values(rates.rates).reduce(
    (acc, { code, value }) => {
      return { ...acc, [code]: value }
    },
    {} as Rate
  )

  return (
    <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Currency Converter
      </h1>
      <div className="flex flex-col gap-4">
        <Converter
          defaultCurrecnies={defaultCurrecnies}
          rates={normalizedRates}
        />
      </div>
    </section>
  )
}
