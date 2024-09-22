import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b transition-colors duration-300">
      <div className="flex h-16 items-center px-4 sm:container">
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              className="focus-visible:ring-ring rounded transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="size-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
