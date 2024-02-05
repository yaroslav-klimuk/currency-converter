"use client"

import { useEffect, useState } from "react"
import supportedCurrencies from "@/helpers/currencies"
import { AnimatePresence, motion } from "framer-motion"
import Skeleton from "react-loading-skeleton"
import { useIsClient, useLocalStorage } from "usehooks-ts"

import { Currency, CurrencyCode, Rate } from "@/types/currency"
import { AnimatedListItem } from "@/components/ui/animated-list-item"
import { Button } from "@/components/ui/button"
import { CurrencyInput } from "@/components/ui/currency-input"
import CurrencySelectModal from "@/components/currency-select-modal"
import { Icons } from "@/components/icons"

import Container from "./container"

interface ConverterProps {
  rates: Rate
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

export default function Converter({ rates }: ConverterProps) {
  const isClient = useIsClient()
  const [state, setState] = useState<Rate>({} as Rate)
  const [currencies, setCurrencies] = useLocalStorage<Currency[]>(
    "currencies",
    defaultCurrecnies
  )
  const [isCurrenciesListOpen, setIsCurrenciesListOpen] = useState(false)

  const availableCurrencies = supportedCurrencies.filter((currency) => {
    return !currencies.some(
      (item) => item.currencyCode === currency.currencyCode
    )
  })

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

  const onSelectCurrency = (currency: Currency) => {
    setIsCurrenciesListOpen(false)
    setTimeout(() => setCurrencies((prev) => [...prev, currency]), 200)
  }

  const onOpenCurrenciesList = () => setIsCurrenciesListOpen(true)

  return (
    <>
      <Container>
        <div className="flex items-center justify-between border-b p-3">
          <div className="flex gap-2">
            <Button size="icon" variant="outline" className="size-8">
              <Icons.Settings size={20} />
            </Button>
            <Button size="icon" variant="outline" className="size-8">
              <Icons.pensil size={20} />
            </Button>
          </div>
          <Button
            variant="outline"
            className="h-8 px-2"
            disabled={availableCurrencies.length === 0}
            onClick={onOpenCurrenciesList}
          >
            <Icons.plus size={18} className="mr-1" />
            Add
          </Button>
        </div>

        <div className="flex flex-col px-4 pb-10 pt-4 sm:mx-auto sm:w-[70%]">
          <motion.h2
            layout
            className="pb-5 text-3xl font-bold leading-tight tracking-tighter"
          >
            Converter
          </motion.h2>

          {!isClient ? (
            <Skeleton
              containerClassName="flex flex-col"
              className="mb-4"
              width={"100%"}
              height={66}
              count={4}
              inline
            />
          ) : (
            <AnimatePresence initial={false} mode="popLayout">
              {currencies.map((currency) => (
                <AnimatedListItem key={currency.currencyName}>
                  <CurrencyInput
                    key={currency.currencyCode}
                    currency={currency}
                    value={state[currency.currencyCode] || ""}
                    containerClassName="mb-4"
                    aria-label={`${currency.currencyCode} currency input`}
                    maxLength={MAX_LENGTH}
                    onChange={(event) =>
                      convertCurrencies(
                        currency.currencyCode,
                        event.target.value
                      )
                    }
                  />
                </AnimatedListItem>
              ))}
            </AnimatePresence>
          )}
        </div>
      </Container>
      <CurrencySelectModal
        isOpen={isCurrenciesListOpen}
        onOpenChange={setIsCurrenciesListOpen}
        currencies={availableCurrencies}
        setCurrency={onSelectCurrency}
      />
    </>
  )
}
