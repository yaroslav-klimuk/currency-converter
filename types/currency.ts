import currencies from "@/helpers/currencies"

export type Currency = (typeof currencies)[number]
export type CurrencyCode = (typeof currencies)[number]["currencyCode"]
export type CountryCode = (typeof currencies)[number]["countryCode"]

export type Rate = Record<CurrencyCode, number>

export type RatesData = {
  rates: Rate
  remainingQuota: number
}

export type RatesResponse = {
  data: {
    [key in CurrencyCode]: {
      code: CurrencyCode
      value: number
    }
  }
}
