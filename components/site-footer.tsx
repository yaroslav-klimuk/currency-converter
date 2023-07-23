"use client"

import Link from "next/link"
import { useTheme } from "next-themes"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Indicator, IndicatorState } from "@/components/ui/indicator"
import { useQuota } from "@/components/quota-provider"
import VercelLogo from "@/components/vercel-logo"

export function SiteFooter() {
  const { resolvedTheme } = useTheme()
  const { quota } = useQuota()

  const indicatorState: IndicatorState =
    quota >= 50
      ? "success"
      : quota > 20
      ? "warning"
      : quota > 0
      ? "error"
      : "default"

  return (
    <footer className="bottom-0 w-full border-t bg-background">
      <div className="container flex h-20 flex-col py-2 md:flex-row">
        <div className="order-3 flex flex-1 items-center justify-center md:order-1 md:justify-start">
          <Indicator state={indicatorState}>Quota: {quota}%</Indicator>
        </div>
        <div className="order-2 flex flex-1 items-center justify-center">
          <Link
            href="https://www.vercel.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center"
          >
            <span className="pr-2 font-semibold">Deployed on</span>
            <VercelLogo />
          </Link>
        </div>
        <div className="order-2 flex flex-1 items-center justify-center text-sm md:order-3 md:justify-end ">
          Made using
          <Link href={siteConfig.links.docs} target="_blank" rel="noreferrer">
            <div
              className={buttonVariants({
                size: "sm",
                variant: "link",
              })}
            >
              shadcn/ui {resolvedTheme === "dark" ? "🤍" : "🖤"}
            </div>
          </Link>
        </div>
      </div>
    </footer>
  )
}
