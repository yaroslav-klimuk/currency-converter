"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { useIsClient } from "usehooks-ts"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import VercelLogo from "@/components/vercel-logo"

export function SiteFooter() {
  const { resolvedTheme } = useTheme()
  const isClient = useIsClient()

  return (
    <footer className="bg-background bottom-0 w-full border-t">
      <div className="container flex h-20 flex-col py-2 md:flex-row">
        <div className="order-3 flex flex-1 items-center justify-center md:order-1 md:justify-start"></div>
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
              shadcn/ui {isClient && resolvedTheme === "dark" ? "🤍" : "🖤"}
            </div>
          </Link>
        </div>
      </div>
    </footer>
  )
}
