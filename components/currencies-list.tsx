import { PropsWithChildren } from "react"

import { Currency, CurrencyCode } from "@/types/currency"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Flag } from "@/components/ui/flag"

interface CurrenciesListProps {
  currencies: readonly Currency[]
  selectedCurrencies: Currency[]
  onSelectCurrency: (currencyCode: CurrencyCode) => void
}

export default function CurrenciesList({
  currencies,
  selectedCurrencies,
  onSelectCurrency,
  children,
}: PropsWithChildren<CurrenciesListProps>) {
  const sortedCurrencies = [...currencies].sort((a, b) => {
    if (a.countryCode < b.currencyCode) {
      return -1
    }
    if (a.currencyCode > b.currencyCode) {
      return 1
    }
    return 0
  })

  const isCurrencySelected = (currencyCode: CurrencyCode) => {
    return !!selectedCurrencies.find((c) => c.currencyCode === currencyCode)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[30vh] w-[--radix-dropdown-menu-trigger-width] overflow-y-auto">
        {sortedCurrencies.map((currency) => (
          <DropdownMenuCheckboxItem
            key={`${currency.currencyCode}-list-item`}
            checked={isCurrencySelected(currency.currencyCode)}
            onCheckedChange={() => onSelectCurrency(currency.currencyCode)}
          >
            <div className="flex items-center">
              <Flag countryCode={currency.countryCode} size={28} />
              <div className="ml-2 flex flex-col justify-center">
                <span className="text-base ">{currency.currencyName}</span>
                <span className="text-ring text-sm ">
                  {currency.currencyCode}
                </span>
              </div>
            </div>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
