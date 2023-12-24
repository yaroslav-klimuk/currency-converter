"use client"

import { useEffect, useState } from "react"
import countriesCodes from "@/helpers/countriesCodes.json"
import { AnimatePresence } from "framer-motion"
import Skeleton from "react-loading-skeleton"
import { useIsClient, useLocalStorage } from "usehooks-ts"

import "react-loading-skeleton/dist/skeleton.css"
import { CurrencyCode, Rate } from "@/types/currency"
import { AnimatedListItem } from "@/components/ui/animated-list-item"
import { CurrencyInput } from "@/components/ui/currency-input"
import { MotionButton } from "@/components/ui/motion-button"
import CurrenciesList from "@/components/currencies-list"
import { Icons } from "@/components/icons"

interface ConverterProps {
  rates: Rate
}

const defaultCurrecnies: CurrencyCode[] = ["USD", "EUR", "PLN", "BYN"]

export default function Converter({ rates }: ConverterProps) {
  const isClient = useIsClient()
  const [state, setState] = useState<Rate>({} as Rate)
  const [currencies, setCurrnecies] = useLocalStorage<CurrencyCode[]>(
    "currencies",
    defaultCurrecnies
  )

  const availableCurrencies = rates
    ? (Object.keys(rates) as CurrencyCode[])
    : []

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
        (Number(value) / rates[currencyCode]) * rates[key as keyof Rate]
      return { ...acc, [key]: convertedValue.toFixed(2) }
    }, {})

    setState((prev) => ({ ...prev, ...convertedCurrencies }))
  }

  const currencyChangeHandler = (currency: CurrencyCode) => {
    setCurrnecies((prev) => {
      const index = prev.indexOf(currency)
      if (index === -1) {
        return [...prev, currency]
      }
      if (currencies.length < 3) {
        return prev
      }
      return prev.filter((item) => item !== currency)
    })
  }

  if (!isClient) {
    return (
      <Skeleton
        containerClassName="flex flex-col gap-4"
        width={230}
        height={48}
        count={5}
        inline
      />
    )
  }

  return (
    <>
      <AnimatePresence initial={false} mode="popLayout">
        {currencies.map((currencyCode) => (
          <AnimatedListItem key={currencyCode}>
            <CurrencyInput
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
        selectedCurrencies={currencies}
        onSelectCurrency={currencyChangeHandler}
      >
        <MotionButton layout variant="outline" aria-label="add currency">
          <Icons.plus size={18} />
        </MotionButton>
      </CurrenciesList>
    </>
  )
}
