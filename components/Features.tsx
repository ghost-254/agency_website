"use client"
import Image from "next/image"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FeatureItem {
  id: string
  title: string
  icon: string
  content: string
  category: "support" | "community" | "education"
  delay: number
}

const Features = () => {
  const features: FeatureItem[] = [
    {
      id: "advocacy",
      title: "Advocacy & Awareness",
      icon: "/icon1.png",
      content:
        "We promote advocacy & awareness for the homeless by collaborating with agencies and organizations established to provide for homeless individuals.",
      category: "support",
      delay: 0,
    },
    {
      id: "outreach",
      title: "Community Outreach",
      icon: "/icon2.png",
      content:
        "Our community outreach programs operate directly at the locations of partnering agencies and organizations, engaging interactively with their staff and administration through in-person visits, meetings, and presentations.",
      category: "community",
      delay: 200,
    },
    {
      id: "partnership",
      title: "Partnership Building",
      icon: "/icon3.png",
      content:
        "To build a strong alliance, we actively participate in educational and healthcare related seminars, including community chamber of commerce activity to, consistently maintain a presence while engaging with local businesses and organizations to strengthen our campaign.",
      category: "community",
      delay: 300,
    },
    {
      id: "workshops",
      title: "Educational Workshops and Seminars",
      icon: "/icon4.png",
      content:
        "We design curricula focused on communication and soft skills training to support career development. This includes one-on-one mentoring sessions with coaching on employer-employee relationship management techniques.",
      category: "education",
      delay: 400,
    },
    {
      id: "workforce",
      title: "Workforce Reentry Support",
      icon: "/icon5.png",
      content:
        "We engage professionally with community vocational training programs, potential employers, and placement agencies to foster job readiness connections.",
      category: "education",
      delay: 500,
    },
    {
      id: "hiv",
      title: "HIV Testing Resources",
      icon: "/icon2.png",
      content:
        "Working with local agencies and organizations that provide HIV testing, monitoring and treatment. We ensure, information materials are accessible to homeless individuals requiring help. We actively promote the availability of street medicine and mobile health resources available.",
      category: "support",
      delay: 600,
    },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary bg-primary/5" data-aos="fade-up">
            Making Long-lasting Impact
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight" data-aos="fade-up" data-aos-delay="100">
            Our <span className="text-primary">Services</span>
          </h2>
          <div
            className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-2"
            data-aos="fade-up"
            data-aos-delay="150"
          ></div>
        </div>

        {/* Tabs for categorized view on larger screens */}
        <div className="hidden md:block">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-4 w-fit">
                <TabsTrigger value="all">All Services</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature) => (
                  <FeatureCard key={feature.id} feature={feature} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="support" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features
                  .filter((feature) => feature.category === "support")
                  .map((feature) => (
                    <FeatureCard key={feature.id} feature={feature} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="community" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features
                  .filter((feature) => feature.category === "community")
                  .map((feature) => (
                    <FeatureCard key={feature.id} feature={feature} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="education" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features
                  .filter((feature) => feature.category === "education")
                  .map((feature) => (
                    <FeatureCard key={feature.id} feature={feature} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Mobile view - simple grid */}
        <div className="md:hidden">
          <div className="grid grid-cols-1 gap-6">
            {features.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Feature Card Component
const FeatureCard = ({ feature }: { feature: FeatureItem }) => {
  return (
    <div data-aos="zoom-in" data-aos-delay={feature.delay} data-aos-anchor-placement="top-center">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/30 group">
        <CardHeader className="p-6 pb-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center p-2 group-hover:bg-primary/20 transition-colors">
              <Image
                src={feature.icon || "/placeholder.svg"}
                alt={feature.title}
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <CardTitle className="text-xl">{feature.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-muted-foreground">{feature.content}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Badge variant="outline" className="text-xs capitalize">
            {feature.category}
          </Badge>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Features

