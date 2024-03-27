"use client"

import { useEffect, useState } from "react"
import supportedCurrencies from "@/helpers/currencies"
import { AnimatePresence } from "framer-motion"
import Skeleton from "react-loading-skeleton"
import { useIsClient, useLocalStorage } from "usehooks-ts"

import { Currency, CurrencyCode, Rate } from "@/types/currency"
import { Button } from "@/components/ui/button"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import CurrencySelectModal from "@/components/currency-select-modal"
import { Icons } from "@/components/icons"

import Container from "./container"
import DraggableCurrencyInput from "./draggable-currency-input"

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
  const [dragged, setDragged] = useState<Record<CurrencyCode, boolean>>(
    currencies.reduce(
      (acc, currency) => ({ ...acc, [currency.currencyCode]: false }),
      {} as Record<CurrencyCode, boolean>
    )
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

  const onRemoveCurrency = (currency: Currency) => {
    if (currencies.length > 2) {
      setCurrencies((prev) =>
        prev.filter((item) => item.currencyCode !== currency.currencyCode)
      )
    }
  }

  const setIsDragged = (currencyCode: CurrencyCode, value: boolean) => {
    setDragged((prev) => ({ ...prev, [currencyCode]: value }))
  }

  return (
    <>
      <Container>
        <div className="flex items-center justify-between border-b p-3">
          <div className="flex">
            <Button size="icon" variant="outline" className="size-8">
              <Icons.settings size={20} />
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

        <div className="flex flex-col p-5 px-4 pb-10 pt-4 sm:mx-auto sm:w-[70%]">
          <h2 className="pb-5 text-3xl font-bold leading-tight tracking-tighter">
            Converter
          </h2>

          <div>
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
              <AnimatePresence initial={false} mode="sync">
                {currencies.map((currency) => (
                  <ContextMenu key={currency.currencyCode}>
                    <ContextMenuTrigger>
                      <DraggableCurrencyInput
                        currency={currency}
                        value={state[currency.currencyCode] || ""}
                        maxLength={MAX_LENGTH}
                        draggable={currencies.length > 2}
                        isDragged={dragged[currency.currencyCode]}
                        setIsDragged={setIsDragged}
                        onChange={(event) =>
                          convertCurrencies(
                            currency.currencyCode,
                            event.target.value
                          )
                        }
                        onRemove={onRemoveCurrency}
                      />
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem className="cursor-pointer p-3 text-base md:px-2 md:py-1.5">
                        <Icons.shuffle size={18} className="mr-2" />
                        Reorder
                      </ContextMenuItem>
                      <ContextMenuItem
                        className="text-destructive focus:text-destructive cursor-pointer p-3 text-base md:px-2 md:py-1.5"
                        disabled={currencies.length < 3}
                        onClick={() =>
                          setIsDragged(currency.currencyCode, true)
                        }
                      >
                        <Icons.trash size={18} className="mr-2" />
                        Delete
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                ))}
              </AnimatePresence>
            )}
          </div>
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
