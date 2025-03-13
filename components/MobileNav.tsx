"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import Link from "next/link"
import { X, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  nav: boolean
  closeNav: () => void
  currentUser: any
  logout: () => void
}

const MobileNav: React.FC<MobileNavProps> = ({ nav, closeNav, currentUser, logout }) => {
  const navRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeNav()
      }
    }

    if (nav) {
      document.addEventListener("mousedown", handleClickOutside)
      // Prevent scrolling when nav is open
      document.body.style.overflow = "hidden"
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
      // Restore scrolling when nav is closed
      document.body.style.overflow = ""
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = ""
    }
  }, [nav, closeNav])

  const handleNavLinkClick = (path: string) => {
    closeNav()
    router.push(path)
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-background border-l border-primary/20 shadow-lg transition-transform duration-300 ease-in-out",
        nav ? "translate-x-0" : "translate-x-full",
      )}
      ref={navRef}
    >
      <div className="flex h-full flex-col overflow-y-auto pb-12">
        <div className="flex h-16 items-center justify-end px-6">
          <Button variant="ghost" size="icon" onClick={closeNav} className="rounded-full">
            <X className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>

        <div className="flex-1 space-y-1 px-6 py-3">
          <Link
            href="/"
            onClick={() => handleNavLinkClick("/")}
            className="flex h-10 items-center justify-start rounded-md px-4 text-lg font-medium text-foreground hover:text-primary hover:bg-primary/10"
          >
            Home
          </Link>

          <Link
            href="/about"
            onClick={() => handleNavLinkClick("/about")}
            className="flex h-10 items-center justify-start rounded-md px-4 text-lg font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            About
          </Link>

          <Link
            href="/data"
            onClick={() => handleNavLinkClick("/data")}
            className="flex h-10 items-center justify-start rounded-md px-4 text-lg font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            Data
          </Link>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="blog" className="border-none">
              <AccordionTrigger className="rounded-md px-4 py-2 text-lg font-medium text-foreground hover:text-primary hover:bg-primary/10 hover:no-underline">
                Blog
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 pl-4">
                  <Link
                    href="/blog"
                    onClick={() => handleNavLinkClick("/blog")}
                    className="flex h-10 items-center rounded-md px-4 text-sm text-muted-foreground hover:text-secondary hover:bg-secondary/10"
                  >
                    Read Articles
                  </Link>
                  <Link
                    href="/blog/create"
                    onClick={() => handleNavLinkClick("/blog/create")}
                    className="flex h-10 items-center rounded-md px-4 text-sm text-muted-foreground hover:text-secondary hover:bg-secondary/10"
                  >
                    Post a Blog
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            {currentUser && (
              <AccordionItem value="grants" className="border-none">
                <AccordionTrigger className="rounded-md px-4 py-2 text-lg font-medium text-foreground hover:text-primary hover:bg-primary/10 hover:no-underline">
                  Grant Applications
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2 pl-4">
                    <Link
                      href="/grant-application?option=create"
                      onClick={() => handleNavLinkClick("/grant-application?option=create")}
                      className="flex h-10 items-center rounded-md px-4 text-sm text-muted-foreground hover:text-secondary hover:bg-secondary/10"
                    >
                      Create New Application
                    </Link>
                    <Link
                      href="/grant-application?option=history"
                      onClick={() => handleNavLinkClick("/grant-application?option=history")}
                      className="flex h-10 items-center rounded-md px-4 text-sm text-muted-foreground hover:text-secondary hover:bg-secondary/10"
                    >
                      Application History
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>

        <div className="border-t px-6 py-6">
          {currentUser ? (
            <Button variant="destructive" onClick={logout} className="w-full justify-start">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Button
              variant="default"
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => handleNavLinkClick("/login")}
            >
              Admin Login
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MobileNav

