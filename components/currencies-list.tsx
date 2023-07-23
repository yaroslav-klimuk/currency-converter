import { PropsWithChildren } from "react"
import countriesCodes from "@/helpers/countriesCodes.json"

import { CurrencyCode } from "@/types/currency"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Flag } from "@/components/ui/flag"

interface CurrenciesListProps {
  currencies: CurrencyCode[]
  selectedCurrencies: CurrencyCode[]
  onSelectCurrency: (currency: CurrencyCode) => void
}

export default function CurrenciesList({
  currencies,
  selectedCurrencies,
  onSelectCurrency,
  children,
}: PropsWithChildren<CurrenciesListProps>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[30vh] w-[--radix-dropdown-menu-trigger-width] overflow-y-auto">
        {currencies.sort().map((currency) => (
          <DropdownMenuCheckboxItem
            key={`${currency}-list-item`}
            checked={selectedCurrencies.includes(currency)}
            onCheckedChange={() => onSelectCurrency(currency)}
          >
            <Flag
              countryCode={countriesCodes[currency]}
              size={20}
              className="mr-4"
            />
            <span>{currency}</span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
