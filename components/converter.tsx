"use client"

import { useEffect, useState } from "react"
import countriesCodes from "@/helpers/countriesCodes.json"

import { CurrencyCode, Rate } from "@/types/currency"
import { CurrencyInput } from "@/components/ui/currency-input"

interface ConverterProps {
  defaultCurrecnies: CurrencyCode[]
  rates: Rate
}

export default function Converter({
  defaultCurrecnies,
  rates,
}: ConverterProps) {
  const [state, setState] = useState<Rate>({} as Rate)

  useEffect(() => {
    setState(rates)
  }, [rates])

  const convertCurrencies = (currencyCode: CurrencyCode, value: string) => {
    setState({ ...state, [currencyCode]: !value ? '' : value })
    const filteredCurrnecies = Object.keys(state).filter(
      (key) => key !== currencyCode
    )
    const convertedCurrencies = filteredCurrnecies.reduce(
      (acc, key) => {
        const convertedValue =
          (Number(value) * rates[key as keyof Rate]) / rates[currencyCode]
        return { ...acc, [key]: convertedValue.toFixed(2) }
      },
      {}
    )
    setState((prev) => ({ ...prev, ...convertedCurrencies }))
  }

  return (
    <>
      {defaultCurrecnies.map((currencyCode) => (
        <CurrencyInput
          key={currencyCode}
          countryCode={countriesCodes[currencyCode]}
          value={state[currencyCode] || ""}
          onChange={(event) =>
            convertCurrencies(currencyCode, event.target.value)
          }
        />
      ))}
    </>
  )
}
