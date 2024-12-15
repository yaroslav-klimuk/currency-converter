import "@/styles/globals.css"

import { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { SkeletonTheme } from "react-loading-skeleton"

import "react-loading-skeleton/dist/skeleton.css"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(0 0% 100%)" },
    { media: "(prefers-color-scheme: dark)", color: "hsl(240 10% 3.9%)" },
  ],
  appleWebApp: {
    title: siteConfig.shortName,
  },
  manifest: "/manifest.json",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "bg-muted min-h-dvh font-sans antialiased transition-colors duration-300",
            GeistSans.variable,
            GeistMono.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SkeletonTheme
              baseColor="hsl(var(--skeleton-bg))"
              highlightColor="hsl(var(--skeleton-highlight))"
            >
              <div
                vaul-drawer-wrapper=""
                className="bg-muted relative flex min-h-dvh flex-col rounded-md"
              >
                <SiteHeader />
                <div className="flex-1">{children}</div>
                <SiteFooter />
              </div>
              <TailwindIndicator />
            </SkeletonTheme>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
