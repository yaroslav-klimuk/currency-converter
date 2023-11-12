import countriesCodes from "@/helpers/countriesCodes.json"

import { Rate, RatesData, RatesResponse } from "@/types/currency"

export const fetchRates = async (): Promise<RatesData> => {
  const currencies = Object.keys(countriesCodes).join(",")
  const response = await fetch(
    `https://api.currencyapi.com/v3/latest?currencies=${currencies}`,
    {
      headers: {
        apiKey: process.env.CURRENCY_API_KEY!,
      },
    }
  )

  const { data } = (await response.json()) as RatesResponse

  const normalizedRates = Object.values(data || {}).reduce(
    (acc, { code, value }) => {
      return { ...acc, [code]: value.toFixed(2) }
    },
    {} as Rate
  )

  const quota = response.headers.get("x-ratelimit-limit-quota-month")
  const remaining = response.headers.get("x-ratelimit-remaining-quota-month")

  return {
    rates: normalizedRates,
    remainingQuota: (Number(remaining) / Number(quota)) * 100,
  }
}
