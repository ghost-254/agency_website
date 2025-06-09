import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Mail, Linkedin, Facebook, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface FooterLinkProps {
  href: string
  children: React.ReactNode
  external?: boolean
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, external }) => (
  <Link
    href={href}
    className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1"
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
  >
    {children}
    {external && <ExternalLink className="h-3 w-3" />}
  </Link>
)

const FooterHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-lg font-semibold mb-4 text-foreground">{children}</h3>
)

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container px-4 md:px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image src="/logo.png" alt="Outreach Connect Logo" width={180} height={60} className="h-auto" />
            </Link>
            <p className="text-muted-foreground">
              Dedicated to helping homeless and underserved individuals in our community.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Sacramento, CA</span>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <FooterHeading>Company</FooterHeading>
            <ul className="space-y-3">
              <li>
                <FooterLink href="/disclaimer">Disclaimer</FooterLink>
              </li>
              <li>
                <FooterLink href="/data">Data</FooterLink>
              </li>
              <li>
                <FooterLink href="/about">About</FooterLink>
              </li>
              <li>
                <FooterLink href="/mission_vision">Mission & Vision</FooterLink>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <FooterHeading>Contact Us</FooterHeading>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <span className="block text-muted-foreground">Email:</span>
                  <FooterLink href="mailto:official@outreachconnect.org">official@outreachconnect.org</FooterLink>
                </div>
              </li>
              <li>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 border-primary/20 hover:bg-primary/5 hover:text-primary"
                  asChild
                >
                  <Link href="#supportTeam">Send us a message</Link>
                </Button>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <FooterHeading>Connect With Us</FooterHeading>
            <ul className="space-y-3">
              <li>
                <FooterLink href="https://www.linkedin.com/in/sandra-hertkorn-6407738a/" external>
                  <Linkedin className="h-5 w-5 text-accent mr-2" />
                  LinkedIn
                </FooterLink>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-primary/10" />

        <div className="flex flex-col justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {currentYear} Outreach Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

