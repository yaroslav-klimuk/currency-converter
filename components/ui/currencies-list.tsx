import { Currency } from "@/types/currency"
import { Flag } from "@/components/ui/flag"

interface CurrenciesListProps {
  currencies: Currency[]
  onSelectCurrency: (currency: Currency) => void
}

export default function CurrenciesList({
  currencies,
  onSelectCurrency,
}: CurrenciesListProps) {
  return (
    <>
      {currencies.map((currency) => (
        <button
          className="hover:bg-muted focus-visible:ring-ring ring-offset-background mb-2 flex w-full cursor-pointer items-center rounded-md p-2 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          key={currency.currencyCode}
          onClick={() => onSelectCurrency(currency)}
        >
          <Flag countryCode={currency.countryCode} size={28} />
          <div className="ml-2 flex flex-col justify-center text-left">
            <span className="mb-1 text-base leading-3">
              {currency.currencyName}
            </span>
            <span className="text-ring text-sm leading-3">
              {currency.currencyCode}
            </span>
          </div>
        </button>
      ))}
    </>
  )
}
