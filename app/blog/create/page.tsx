"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { serverTimestamp, setDoc, doc } from "firebase/firestore"
import { db } from "@/firebaseConfig"
import { useAuth } from "@/context/AuthContext"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Editor } from "@tinymce/tinymce-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2, Eye, FileImage, Save, AlertTriangle } from "lucide-react"
import Image from "next/image"

// Form schema
const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  category: z.string().min(1, { message: "Please select a category." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL." }),
  author: z.string().min(2, { message: "Author name must be at least 2 characters." }),
  content: z.string().min(50, { message: "Content must be at least 50 characters." }),
})

type FormValues = z.infer<typeof formSchema>

interface TOCItem {
  id: string
  content: string
  tag: string
  level: number
}

export default function CreateArticlePage() {
  const { currentUser } = useAuth()
  const router = useRouter()
  const editorRef = useRef<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [toc, setToc] = useState<TOCItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      imageUrl: "",
      author: currentUser?.displayName || "",
      content: "",
    },
  })

  // Watch content for TOC generation
  const content = form.watch("content")

  // Generate table of contents from content
  useEffect(() => {
    if (content && previewRef.current) {
      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = content

      const headings = tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6")
      const tocItems: TOCItem[] = []

      headings.forEach((heading, index) => {
        const tag = heading.tagName.toLowerCase()
        const level = Number.parseInt(tag.charAt(1))
        const content = heading.textContent || ""
        const id = `heading-${index}-${content.toLowerCase().replace(/\s+/g, "-")}`

        heading.id = id

        tocItems.push({
          id,
          content,
          tag,
          level,
        })
      })

      setToc(tocItems)

      // Update preview content with IDs
      if (previewMode && previewRef.current) {
        previewRef.current.innerHTML = tempDiv.innerHTML
      }
    }
  }, [content, previewMode])

  const onSubmit = async (data: FormValues) => {
    if (!currentUser) {
      setError("You must be logged in to create a blog post.")
      return
    }

    if (!confirm("Are you sure you want to publish this article?")) {
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Format the title to create a valid document ID
      const formattedTitle = data.title.toLowerCase().replace(/\s+/g, "-")

      await setDoc(doc(db, "blogPosts", formattedTitle), {
        title: data.title,
        content: data.content,
        category: data.category,
        description: data.description,
        imageUrl: data.imageUrl,
        author: data.author || "Anonymous",
        date: new Date().toISOString(),
        createdAt: serverTimestamp(),
      })

      router.push(`/blog/${formattedTitle}`)
    } catch (error) {
      console.error("Error posting article:", error)
      setError("Failed to publish article. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      // Uncomment to redirect non-logged in users
      // router.push('/login')
    }
  }, [currentUser, router])

  return (
    <section className="py-12 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-1/4">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Table of Contents</CardTitle>
                <CardDescription>Headings in your article will appear here</CardDescription>
              </CardHeader>

              <ScrollArea className="h-[400px] px-4">
                {toc.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No headings found in your article yet</p>
                ) : (
                  <div className="space-y-1">
                    {toc.map((item) => (
                      <div
                        key={item.id}
                        className={`pl-${(item.level - 1) * 2} py-1 text-sm ${
                          item.level === 1 ? "font-medium" : "text-muted-foreground"
                        }`}
                      >
                        {item.content}
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>

              <CardFooter className="flex justify-between border-t p-4">
                <Button variant="outline" size="sm" onClick={() => setPreviewMode(!previewMode)}>
                  <Eye className="mr-2 h-4 w-4" />
                  {previewMode ? "Edit Mode" : "Preview"}
                </Button>

                <Button type="submit" size="sm" onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Publish
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <Card>
              <CardHeader>
                <CardTitle>Create New Article</CardTitle>
                <CardDescription>Share your insights and knowledge with our community</CardDescription>
              </CardHeader>

              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Tabs defaultValue="edit" value={previewMode ? "preview" : "edit"}>
                  <div className="flex justify-between items-center mb-6">
                    <TabsList className="lg:hidden">
                      <TabsTrigger value="edit" onClick={() => setPreviewMode(false)}>
                        Edit
                      </TabsTrigger>
                      <TabsTrigger value="preview" onClick={() => setPreviewMode(true)}>
                        Preview
                      </TabsTrigger>
                    </TabsList>

                    <div className="lg:hidden">
                      <Button type="submit" size="sm" onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Publishing...
                          </>
                        ) : (
                          "Publish"
                        )}
                      </Button>
                    </div>
                  </div>

                  <TabsContent value="edit" className="mt-0">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter article title" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Mental Health">Mental Health</SelectItem>
                                    <SelectItem value="Community Engagement">Community Engagement</SelectItem>
                                    <SelectItem value="Homelessness">Homelessness</SelectItem>
                                    <SelectItem value="Diseases & Disorders">Diseases & Disorders</SelectItem>
                                    <SelectItem value="Resources">Resources</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Brief summary of your article"
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>This will appear in article previews and search results</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="imageUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Featured Image URL</FormLabel>
                              <div className="flex gap-2">
                                <FormControl>
                                  <Input placeholder="https://example.com/image.jpg" {...field} />
                                </FormControl>
                                <Button type="button" variant="outline" className="shrink-0">
                                  <FileImage className="h-4 w-4 mr-2" />
                                  Browse
                                </Button>
                              </div>
                              <FormDescription>Provide a URL to an image for your article</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="author"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Author</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Content</FormLabel>
                              <FormControl>
                                <Editor
                                  apiKey="your-tinymce-api-key" // Replace with your TinyMCE API key
                                  onInit={(evt: Event, editor: Editor) => (editorRef.current = editor)}
                                  initialValue=""
                                  value={field.value}
                                  onEditorChange={(content: string) => field.onChange(content)}
                                  init={{
                                    height: 500,
                                    menubar: true,
                                    plugins: [
                                      "advlist",
                                      "autolink",
                                      "lists",
                                      "link",
                                      "image",
                                      "charmap",
                                      "preview",
                                      "anchor",
                                      "searchreplace",
                                      "visualblocks",
                                      "code",
                                      "fullscreen",
                                      "insertdatetime",
                                      "media",
                                      "table",
                                      "code",
                                      "help",
                                      "wordcount",
                                    ],
                                    toolbar:
                                      "undo redo | blocks | " +
                                      "bold italic forecolor | alignleft aligncenter " +
                                      "alignright alignjustify | bullist numlist outdent indent | " +
                                      "removeformat | help",
                                    content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                  }}
                                />
                              </FormControl>
                              <FormDescription>
                                Use headings (H1-H6) to organize your content and create a table of contents
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </form>
                    </Form>
                  </TabsContent>

                  <TabsContent value="preview" className="mt-0">
                    <div className="space-y-6">
                      <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-4">
                          {form.watch("title") || "Article Title"}
                        </h1>

                        <div className="flex items-center gap-4 text-muted-foreground mb-8">
                          <div className="flex items-center gap-1">
                            <span>{form.watch("author") || "Author Name"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>{new Date().toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      {form.watch("imageUrl") && (
                        <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                          <Image
                            src={form.watch("imageUrl") || "/placeholder.svg"}
                            alt={form.watch("title") || "Article preview"}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg?height=600&width=1200"
                            }}
                          />
                        </div>
                      )}

                      <div
                        ref={previewRef}
                        className="prose prose-lg max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{
                          __html: form.watch("content") || "<p>Your article content will appear here...</p>",
                        }}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

