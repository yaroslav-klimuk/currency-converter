"use client"

import { useEffect, useState } from "react"
import countriesCodes from "@/helpers/countriesCodes.json"
import { AnimatePresence } from "framer-motion"

import { CurrencyCode, Rate } from "@/types/currency"
import { AnimatedListItem } from "@/components/ui/animated-list-item"
import { CurrencyInput } from "@/components/ui/currency-input"
import { MotionButton } from "@/components/ui/motion-button"
import CurrenciesList from "@/components/currencies-list"
import { Icons } from "@/components/icons"

interface ConverterProps {
  rates: Rate
  availableCurrencies: CurrencyCode[]
  selectedCurrecnies: CurrencyCode[]
  setCurrency: (currency: CurrencyCode) => void
}

export default function Converter({
  rates,
  availableCurrencies,
  selectedCurrecnies,
  setCurrency,
}: ConverterProps) {
  const [state, setState] = useState<Rate>({} as Rate)

  useEffect(() => {
    setState(rates)
  }, [rates])

  const convertCurrencies = (currencyCode: CurrencyCode, value: string) => {
    setState({ ...state, [currencyCode]: value ? value : "" })

    const filteredCurrnecies = Object.keys(state).filter(
      (key) => key !== currencyCode
    )

    const convertedCurrencies = filteredCurrnecies.reduce((acc, key) => {
      const convertedValue =
        (Number(value) * rates[key as keyof Rate]) / rates[currencyCode]
      return { ...acc, [key]: convertedValue.toFixed(2) }
    }, {})

    setState((prev) => ({ ...prev, ...convertedCurrencies }))
  }

  return (
    <>
      <AnimatePresence initial={false} mode="popLayout">
        {selectedCurrecnies.map((currencyCode) => (
          <AnimatedListItem key={currencyCode}>
            <CurrencyInput
              size={20}
              countryCode={countriesCodes[currencyCode]}
              value={state[currencyCode] || ""}
              aria-label={`${currencyCode} currency input`}
              onChange={(event) =>
                convertCurrencies(currencyCode, event.target.value)
              }
            />
          </AnimatedListItem>
        ))}
      </AnimatePresence>

      <CurrenciesList
        currencies={availableCurrencies}
        selectedCurrencies={selectedCurrecnies}
        onSelectCurrency={setCurrency}
      >
        <MotionButton layout variant="outline" aria-label="add currency">
          <Icons.plus size={18} />
        </MotionButton>
      </CurrenciesList>
    </>
  )
}
