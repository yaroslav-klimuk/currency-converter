"use client"

import Link from "next/link"
import { useTheme } from "next-themes"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import VercelLogo from "@/components/vercel-logo"

export function SiteFooter() {
  const { theme } = useTheme()
  const quota = 80
  const indicatorColor =
    quota > 60 ? "bg-green-300" : quota > 20 ? "bg-orange-300" : "bg-red-400"
  return (
    <footer className="bottom-0 w-full border-t bg-background">
      <div className="container flex h-20 flex-col py-2 md:flex-row">
        <div className="order-3 flex flex-1 items-center justify-center md:order-1 md:justify-start">
          <div className="flex items-baseline">
            <span className="pr-1 text-sm">Quota: </span>
            <Progress
              value={quota}
              className=" h-2 w-12 border"
              indicatorClassName={indicatorColor}
            />
          </div>
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
              shadcn/ui {theme === "dark" ? "🤍" : "🖤"}
            </div>
          </Link>
        </div>
      </div>
    </footer>
  )
}
