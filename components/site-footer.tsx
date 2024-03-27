"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { useIsClient } from "usehooks-ts"

import { siteConfig } from "@/config/site"
import VercelLogo from "@/components/vercel-logo"

export function SiteFooter() {
  const { resolvedTheme } = useTheme()
  const isClient = useIsClient()

  return (
    <footer className="bg-background bottom-0 w-full border-t transition-colors duration-300">
      <div className="container flex h-20 flex-col py-2 md:flex-row">
        <div className="order-3 flex flex-1 items-center justify-center md:order-1 md:justify-start"></div>
        <div className="order-2 flex flex-1 items-center justify-center">
          <Link
            href="https://www.vercel.com"
            className="focus-visible:ring-ring flex items-center rounded transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            target="_blank"
            rel="noreferrer"
          >
            <span className="pr-2 font-semibold">Deployed on</span>
            <VercelLogo />
          </Link>
        </div>
        <div className="order-2 flex flex-1 items-center justify-center text-sm md:order-3 md:justify-end ">
          <span className="pr-3">Made using</span>
          <Link
            href={siteConfig.links.docs}
            className="focus-visible:ring-ring rounded transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            target="_blank"
            rel="noreferrer"
          >
            <span className="hover:underline font-medium underline-offset-4">
              shadcn/ui {isClient && resolvedTheme === "dark" ? "🤍" : "🖤"}
            </span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
