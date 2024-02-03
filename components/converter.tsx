"use client"

import { useEffect, useState } from "react"
import supportedCurrencies from "@/helpers/currencies"
import { AnimatePresence, motion } from "framer-motion"
import Skeleton from "react-loading-skeleton"
import { useIsClient, useLocalStorage } from "usehooks-ts"

import { Currency, CurrencyCode, Rate } from "@/types/currency"
import { cn } from "@/lib/utils"
import { AnimatedListItem } from "@/components/ui/animated-list-item"
import { CurrencyInput } from "@/components/ui/currency-input"
import { MotionButton } from "@/components/ui/motion-button"
import CurrenciesList from "@/components/currencies-list"
import { Icons } from "@/components/icons"

interface ConverterProps {
  rates: Rate
  className?: string
}

const defaultCurrecnies: Currency[] = [
  {
    currencyCode: "USD",
    currencyName: "US Dollar",
    countryCode: "US",
  },
  {
    currencyCode: "EUR",
    currencyName: "Euro",
    countryCode: "EU",
  },
  {
    currencyCode: "GBP",
    currencyName: "British Pound",
    countryCode: "GB",
  },
]

const MAX_LENGTH = 10

export default function Converter({ rates, className }: ConverterProps) {
  const isClient = useIsClient()
  const [state, setState] = useState<Rate>({} as Rate)
  const [currencies, setCurrnecies] = useLocalStorage<Currency[]>(
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

      const formattedValue = convertedValue.toFixed(2).toString()

      let trimmedValue =
        formattedValue.length > MAX_LENGTH
          ? formattedValue.slice(0, MAX_LENGTH)
          : formattedValue

      if (trimmedValue.endsWith(".")) {
        trimmedValue = trimmedValue.slice(0, -1)
      }

      return { ...acc, [key]: trimmedValue }
    }, {})

    setState((prev) => ({ ...prev, ...convertedCurrencies }))
  }

  const currencyChangeHandler = (currency: CurrencyCode) => {
    setCurrnecies((prev) => {
      const currencyIndex = prev.findIndex(
        (item) => item.currencyCode === currency
      )

      if (currencyIndex === -1) {
        const newCurrency = supportedCurrencies.find(
          (item) => item.currencyCode === currency
        )
        return newCurrency ? [...prev, newCurrency] : prev
      }

      return prev.filter((item) => item.currencyCode !== currency)
    })
  }

  if (!isClient) {
    return (
      <motion.div layout className={cn("flex flex-col", className)}>
        <Skeleton
          containerClassName="flex flex-col"
          className="mb-4"
          width={253}
          height={56}
          count={5}
          inline
        />
      </motion.div>
    )
  }

  return (
    <motion.div
      layout
      className={cn(
        "bg-background relative flex w-full max-w-[400px] flex-col rounded-xl border p-10 shadow-md",
        className
      )}
    >
      <h2 className="pb-5 text-2xl font-bold leading-tight tracking-tighter md:text-3xl">
        Converter
      </h2>
      <AnimatePresence initial={false} mode="popLayout">
        {currencies.map((currency) => (
          <AnimatedListItem key={currency.currencyCode}>
            <CurrencyInput
              currency={currency}
              value={state[currency.currencyCode] || ""}
              containerClassName="mb-4"
              aria-label={`${currency.currencyCode} currency input`}
              maxLength={MAX_LENGTH}
              onChange={(event) =>
                convertCurrencies(currency.currencyCode, event.target.value)
              }
            />
          </AnimatedListItem>
        ))}
      </AnimatePresence>

      <CurrenciesList
        currencies={supportedCurrencies}
        selectedCurrencies={currencies}
        onSelectCurrency={currencyChangeHandler}
      >
        <MotionButton
          layout
          variant="outline"
          size="lg"
          aria-label="add currency"
        >
          <Icons.plus size={18} />
        </MotionButton>
      </CurrenciesList>
    </motion.div>
  )
}
