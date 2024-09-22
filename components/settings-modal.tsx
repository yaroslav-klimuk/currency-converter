import { useTheme } from "next-themes"
import { useIsClient, useMediaQuery } from "usehooks-ts"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Icons } from "@/components/icons"

interface SettingsModalProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

const TITLE = "Settings"

const options = {
  light: {
    icon: <Icons.sun className="mr-2 size-4" />,
    label: "Light",
  },
  dark: {
    icon: <Icons.moon className="mr-2 size-4" />,
    label: "Dark",
  },
  system: {
    icon: <Icons.laptop className="mr-2 size-4" />,
    label: "System",
  },
}

export default function SettingsModal({
  isOpen,
  onOpenChange,
}: SettingsModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const isClient = useIsClient()
  const { resolvedTheme, setTheme } = useTheme()

  const closeModal = () => onOpenChange(false)

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent onEscapeKeyDown={closeModal} className="max-w-md">
          <DialogHeader>
            <DialogTitle>{TITLE}</DialogTitle>
            <DialogClose onClick={closeModal} />
          </DialogHeader>

          <div className="flex items-center justify-between">
            <span>Theme</span>

            <Select defaultValue={resolvedTheme} onValueChange={setTheme}>
              <span className="sr-only">Toggle theme</span>
              <SelectTrigger className="w-[60%]">
                <SelectValue>
                  <div className="flex items-center">
                    {isClient ? (
                      <>
                        {options[resolvedTheme as keyof typeof options].icon}
                        {options[resolvedTheme as keyof typeof options].label}
                      </>
                    ) : null}
                  </div>
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                {Object.entries(options).map(([key, { icon, label }]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center">
                      {icon}
                      {label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button onClick={closeModal}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{TITLE}</DrawerTitle>
          <DrawerClose onClick={closeModal} />
        </DrawerHeader>

        <div className="p-4">
          <div className="flex items-center justify-between">
            <span>Theme</span>
            <Select defaultValue={resolvedTheme} onValueChange={setTheme}>
              <span className="sr-only">Toggle theme</span>
              <SelectTrigger className="w-[60%]">
                <SelectValue>
                  <div className="flex items-center">
                    {isClient ? (
                      <>
                        {options[resolvedTheme as keyof typeof options].icon}
                        {options[resolvedTheme as keyof typeof options].label}
                      </>
                    ) : null}
                  </div>
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                {Object.entries(options).map(([key, { icon, label }]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center">
                      {icon}
                      {label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DrawerFooter>
          <Button onClick={closeModal}>Close</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
