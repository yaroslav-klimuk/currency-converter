import { useMediaQuery } from "usehooks-ts"

import { Currency } from "@/types/currency"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import CurrenciesList from "@/components/ui/currencies-list"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

interface CurrencySelectModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  currencies: Currency[]
  setCurrency: (currency: Currency) => void
}

const TITLE = "Select currency"
const DESCRIPTION = "Choose the currency you want to use"

export default function CurrencySelectModal({
  isOpen,
  onOpenChange,
  currencies,
  setCurrency,
}: CurrencySelectModalProps) {
  const closeModal = () => onOpenChange(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const sortedCurrencies = currencies.sort((a, b) => {
    if (a.countryCode < b.currencyCode) {
      return -1
    }
    if (a.currencyCode > b.currencyCode) {
      return 1
    }
    return 0
  })

  if (isDesktop) {
    return (
      <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
        <AlertDialogContent onEscapeKeyDown={closeModal} className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>{TITLE}</AlertDialogTitle>
            <AlertDialogDescription>{DESCRIPTION}</AlertDialogDescription>
          </AlertDialogHeader>

          <div className="max-h-[280px] min-h-32 overflow-y-scroll rounded-md border p-2">
            <CurrenciesList
              currencies={sortedCurrencies}
              onSelectCurrency={setCurrency}
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange} shouldScaleBackground>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{TITLE}</DrawerTitle>
          <DrawerDescription>{DESCRIPTION}</DrawerDescription>
        </DrawerHeader>

        <div className="mx-4 max-h-[70dvh] min-h-32 overflow-y-scroll rounded-md border p-2">
          <CurrenciesList
            currencies={sortedCurrencies}
            onSelectCurrency={setCurrency}
          />
        </div>

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
