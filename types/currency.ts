import countriesCodes from "@/helpers/countriesCodes.json"

export type CurrencyCode = keyof typeof countriesCodes

export type Rate = {
  [key in CurrencyCode]: number
}

export type RatesData = {
  rates: Rate
  remainingQuota: number
}

export type RatesResponse = {
  data: {
    [keyof in CurrencyCode]: {
      code: CurrencyCode
      value: number
    }
  }
}
