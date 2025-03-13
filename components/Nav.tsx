"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { MapPin, Menu, User, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface NavProps {
  openNav?: () => void
  currentUser: any
  logout: () => void
}

const Nav: React.FC<NavProps> = ({ openNav, currentUser, logout }) => {
  const [isLoginPromptOpen, setLoginPromptOpen] = useState(false)
  const router = useRouter()

  const handlePostBlogClick = () => {
    if (!currentUser) {
      setLoginPromptOpen(true)
    } else {
      router.push("/blog/create")
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <header className="sticky h-24 top-0 z-50 w-full border-b bg-background/95">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center"> 
            <Image src="/logo.png" alt="Outreach Connect Logo" width={150} height={150} className="h-auto mt-6" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle({
                    className: "text-foreground hover:text-primary transition-colors",
                  })}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle({
                    className: "text-foreground hover:text-primary transition-colors",
                  })}
                >
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/data" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle({
                    className: "text-foreground hover:text-primary transition-colors",
                  })}
                >
                  Data
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Blog</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-3 p-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/blog"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary/10 hover:text-secondary focus:bg-secondary/10 focus:text-secondary"
                      >
                        <div className="text-sm font-medium leading-none">Read Articles</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Browse our latest blog posts and articles
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="#"
                        onClick={handlePostBlogClick}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary/10 hover:text-secondary focus:bg-secondary/10 focus:text-secondary"
                      >
                        <div className="text-sm font-medium leading-none">Post a Blog</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Share your story with our community
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {currentUser && (
              <NavigationMenuItem>
                <NavigationMenuTrigger>Grant Applications</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[220px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/grant-application?option=create"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary/10 hover:text-secondary focus:bg-secondary/10 focus:text-secondary"
                        >
                          <div className="text-sm font-medium leading-none">Create New Application</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Start a new grant application process
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/grant-application?option=history"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary/10 hover:text-secondary focus:bg-secondary/10 focus:text-secondary"
                        >
                          <div className="text-sm font-medium leading-none">Application History</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            View your previous applications
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4 text-secondary" />
            <span>Sacramento, CA</span>
          </div>

          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full ring-2 ring-primary/20 hover:ring-primary/40"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.image || ""} alt={currentUser.name || "User"} />
                    <AvatarFallback>{currentUser.name ? getInitials(currentUser.name) : "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {currentUser.name && <p className="font-medium">{currentUser.name}</p>}
                    {currentUser.email && <p className="text-sm text-muted-foreground">{currentUser.email}</p>}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="default" className="bg-primary hover:bg-primary/90">
                Admin Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="lg:hidden hover:bg-primary/10">
              <Menu className="h-5 w-5 text-primary" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="border-l-primary/20">
            <SheetHeader>
              <SheetTitle className="text-primary">Outreach Connect</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-6">
              <SheetClose asChild>
                <Link href="/" className="flex items-center py-2 text-lg font-semibold">
                  Home
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/about" className="flex items-center py-2 text-lg font-semibold">
                  About
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/data" className="flex items-center py-2 text-lg font-semibold">
                  Data
                </Link>
              </SheetClose>

              <div className="py-2">
                <h3 className="text-lg font-semibold mb-2">Blog</h3>
                <div className="grid gap-2 pl-4">
                  <SheetClose asChild>
                    <Link href="/blog" className="text-muted-foreground">
                      Read Articles
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="#" onClick={handlePostBlogClick} className="text-muted-foreground">
                      Post a Blog
                    </Link>
                  </SheetClose>
                </div>
              </div>

              {currentUser && (
                <div className="py-2">
                  <h3 className="text-lg font-semibold mb-2">Grant Applications</h3>
                  <div className="grid gap-2 pl-4">
                    <SheetClose asChild>
                      <Link href="/grant-application?option=create" className="text-muted-foreground">
                        Create New Application
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/grant-application?option=history" className="text-muted-foreground">
                        Application History
                      </Link>
                    </SheetClose>
                  </div>
                </div>
              )}

              <div className="flex items-center py-4">
                <MapPin className="mr-2 h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Sacramento, CA</span>
              </div>

              {currentUser ? (
                <Button variant="destructive" onClick={logout} className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              ) : (
                <SheetClose asChild>
                  <Link href="/login">
                    <Button variant="default" className="w-full">
                      Admin Login
                    </Button>
                  </Link>
                </SheetClose>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Login Prompt Dialog */}
      <Dialog open={isLoginPromptOpen} onOpenChange={setLoginPromptOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>You need to be logged in as an admin to post blog articles.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLoginPromptOpen(false)}>
              Cancel
            </Button>
            <Link href="/login">
              <Button onClick={() => setLoginPromptOpen(false)}>Login Now</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  )
}

export default Nav

