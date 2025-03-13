"use client"
import Image from "next/image"
import { Link } from "react-scroll"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const Hero = () => {
  const handleDonateClick = () => {
    window.location.href = "/donate"
  }

  return (
    <section className="py-16 w-full bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 items-center gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h1
              data-aos="fade-right"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight"
            >
              Welcome to Outreach Connect
            </h1>
            <p data-aos="fade-left" data-aos-delay="200" className="text-base md:text-lg text-muted-foreground">
              We are dedicated to helping homeless and underserved individuals in our community. We want to connect the
              resources to the people who need them by providing references, training, and support to empower the
              underserved in the community. Your support can make a difference. Learn more about our programs and how
              you can help.
            </p>
            <div data-aos="zoom-in" data-aos-delay="400" className="flex flex-wrap items-center gap-4">
              <Link to="supportTeam" smooth={true} duration={700}>
                <Button variant="default" size="lg">
                  Get in Touch
                </Button>
              </Link>
              <Button variant="secondary" size="lg" onClick={handleDonateClick}>
                Donate to Us
              </Button>
            </div>
          </div>
          <Card data-aos="fade-left" data-aos-delay="500" className="lg:col-span-3 overflow-hidden border-0 shadow-lg">
            <Image
              src="/homelesschild.jpeg"
              alt="Homeless Child"
              width={800}
              height={500}
              className="w-full h-auto object-cover rounded-lg"
              priority
            />
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Hero

