"use client"

import { useState } from "react"
import Link from "next/link"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import emailjs from "@emailjs/browser"
import { Mail, MessageSquare, CheckCircle, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  message: z.string().min(5, { message: "Message must be at least 5 characters." }),
})

type FormValues = z.infer<typeof formSchema>

const SupportTeam = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    try {
      await emailjs.send(
        "service_9e15qfs",
        "template_zaqsvj7",
        data as unknown as Record<string, unknown>,
        "arlDmaff6RViM50u3",
      )

      setIsSubmitting(false)
      setShowSuccessDialog(true)
      form.reset()

      // Auto close success dialog after 5 seconds
      setTimeout(() => setShowSuccessDialog(false), 5000)
    } catch (error) {
      console.error("Error sending email:", error)
      setIsSubmitting(false)
      alert("There was an error sending your message. Please try again.")
    }
  }

  return (
    <section id="supportTeam" className="py-16 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Information */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Questions or Seeking <span className="text-primary">Additional Information?</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                At Outreach Connect, we are committed to helping you with any inquiries or support you may need. Our
                team is here to ensure you have all the information and assistance necessary to make a difference. Feel
                free to reach out to us through the following channels:
              </p>
            </div>

            <Card className="border-secondary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center p-2">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Email client support</h3>
                    <p className="text-muted-foreground">
                      Reach out to us via email{" "}
                      <Link href="mailto:official@outreachconnect.org" className="text-primary hover:underline">
                        official@outreachconnect.org
                      </Link>{" "}
                      for any questions or support. Our team is dedicated to providing timely and comprehensive
                      responses to your inquiries.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-secondary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center p-2">
                    <MessageSquare className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Direct contact</h3>
                    <p className="text-muted-foreground">
                      Reach out to us with any questions by leaving a message directly on the contact form here. We will
                      get back to you promptly to address your needs, concerns, or inquiries.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Contact Form */}
          <div data-aos="fade-left" data-aos-anchor-placement="top-center">
            <Card className="border-primary/20">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Contact Us</CardTitle>
                <CardDescription className="text-center">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" type="tel" {...field} />
                          </FormControl>
                          <FormDescription>Include country code for international numbers</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="How can we help you?" className="min-h-[120px]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl">Message Sent!</DialogTitle>
            <DialogDescription className="text-center">
              Your message has been successfully sent. We&apos;ll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default SupportTeam

