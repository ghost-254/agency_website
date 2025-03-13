"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { CheckCircle, Play, Pause, Volume2 } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const Goals = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)

  // Use intersection observer to detect when audio section is in view
  const { ref: audioSectionRef, inView } = useInView({
    threshold: 0.7, // 70% of the element must be visible
    triggerOnce: false,
  })

  // Handle play/pause functionality
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
      setHasPlayed(true)
    }
  }

  // Play audio when section comes into view (only if not played before)
  useEffect(() => {
    if (inView && !hasPlayed && audioRef.current) {
      // Attempt to play only if the user has interacted with the document
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented, handle the error gracefully
          console.log("Autoplay was prevented. User interaction is required.")
        })
      }
      setIsPlaying(true)
      setHasPlayed(true)
    }
  }, [inView, hasPlayed])

  // Update playing state when audio ends
  useEffect(() => {
    const audioElement = audioRef.current
    const handleEnded = () => {
      setIsPlaying(false)
    }

    if (audioElement) {
      audioElement.addEventListener("ended", handleEnded)
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("ended", handleEnded)
      }
    }
  }, [])

  const goals = [
    "Raise awareness about the needs of homeless and underserved individuals.",
    "Establish a professional online presence to attract potential grant providers.",
    "Highlight the impact of past community outreach projects.",
    "Unite various agencies, organizations, and resources that provide shelter, food, clothing, and increase access to medical and mental healthcare.",
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right" data-aos-anchor-placement="top-center" className="order-2 lg:order-1">
            <div className="rounded-lg overflow-hidden shadow-lg border border-secondary/20">
              <Image
                src="/goals.png"
                alt="Outreach Connect Goals"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <h2
              data-aos="fade-left"
              data-aos-anchor-placement="top-center"
              data-aos-delay="200"
              className="text-2xl md:text-3xl font-bold text-foreground"
            >
              Goals of Outreach<span className="text-primary">Connect</span>.org
            </h2>

            <p
              data-aos="fade-right"
              data-aos-anchor-placement="top-center"
              data-aos-delay="300"
              className="text-muted-foreground"
            >
              Our goals focus on raising awareness, attracting grant providers, showcasing our impact, and facilitating
              communication. They are:
            </p>

            <div className="space-y-4">
              {goals.map((goal, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-anchor-placement="top-center"
                  data-aos-delay={400 + index * 100}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground font-medium">{goal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Low Vision Card with Audio */}
        <div ref={audioSectionRef} className="mt-16">
          <Card
            className={cn(
              "max-w-3xl mx-auto overflow-hidden transition-all duration-300",
              inView ? "shadow-[0_0_20px_5px_rgba(122,184,14,0.3)]" : "",
            )}
          >
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b">
              <CardTitle className="text-center text-2xl md:text-3xl">
                Focusing on <span className="text-primary">Low Vision</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                At Outreach Connect, we also focus on supporting individuals living with low vision. Living with low
                vision brings a unique set of challenges, transforming even the simplest tasks into daunting obstacles.
                Everyday activities like stepping outside or handling household chores can trigger anxiety, making what
                was once routine feel overwhelming.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                The constant need to adapt only amplifies this struggle, but the right support makes all the difference.
                From assistive technologies and home modifications to emotional care and understanding from friends,
                associates and loved ones.
              </p>

              <Separator className="my-4" />

              <div className="flex items-center justify-between bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={togglePlay}
                    className={cn(
                      "h-10 w-10 rounded-full",
                      isPlaying ? "bg-primary text-primary-foreground" : "hover:bg-primary/20",
                    )}
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                  </Button>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Audio Description</span>
                    <span className="text-xs text-muted-foreground">
                      {isPlaying ? "Now playing..." : "Click to listen"}
                    </span>
                  </div>
                </div>

                <Volume2 className="h-5 w-5 text-muted-foreground" />

                <audio ref={audioRef} className="hidden" src="/audio.mp3" preload="metadata" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Goals