"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { CurrencyCode, Rate } from "@/types/currency"
import Converter from "@/components/converter"
import { useQuota } from "@/components/quota-provider"

interface ConverterPageProps {
  rates: Rate
  remaningQuota: number
}

const defaultCurrecnies: CurrencyCode[] = ["USD", "EUR", "PLN", "BYN"]

export default function ConverterPage({
  rates,
  remaningQuota,
}: ConverterPageProps) {
  const [currencies, setCurrnecies] =
    useState<CurrencyCode[]>(defaultCurrecnies)
  const { setQuota } = useQuota()
  const availableCurrencies = rates
    ? (Object.keys(rates) as CurrencyCode[])
    : []

  useEffect(() => {
    setQuota(remaningQuota)
  }, [remaningQuota, setQuota])

  const handleCurrencyChange = (currency: CurrencyCode) => {
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

  return (
    <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Currency Converter
      </h1>

      <motion.div layout className={"relative flex flex-col gap-4"}>
        <Converter
          rates={rates}
          availableCurrencies={availableCurrencies}
          selectedCurrecnies={currencies}
          setCurrency={handleCurrencyChange}
        />
      </motion.div>
    </section>
  )
}
