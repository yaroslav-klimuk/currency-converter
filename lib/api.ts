import { RatesResponse } from "@/types/currency"

export const fetchRates = async (): Promise<RatesResponse> => {
  const response = await fetch(
    "https://api.currencyapi.com/v3/latest?currencies=USD,EUR,PLN,BYN,CZK",
    {
      headers: {
        apiKey: process.env.CURRENCY_API_KEY!,
      },
    }
  )
  const { data } = await response.json()

  const quota = response.headers.get("x-ratelimit-limit-monthly-month")
  const remaining = response.headers.get("x-ratelimit-remaining-quota-month")
  console.log("remaining: ", remaining)
  return {
    rates: data,
    remainingQuota: (Number(remaining) / Number(quota)) * 100,
  }
}
