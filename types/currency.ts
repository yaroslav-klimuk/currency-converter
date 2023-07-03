import countriesCodes from "@/helpers/countriesCodes.json"

export type CurrencyCode = keyof typeof countriesCodes

export type Rate = {
  [key in CurrencyCode]: number
}

export type RatesResponse = {
  rates: {
    [key in CurrencyCode]: {
      code: CurrencyCode
      value: number
    }
  }
}
