{/*
'use client'

import { useEffect, useState, useRef } from 'react'
import { doc, getDoc, collection, getDocs, query, where, limit } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { db } from '@/firebaseConfig'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarIcon, User2Icon, ArrowRight, ChevronLeft, Share2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import DonationCard from '@/components/DonationCard'

interface BlogPost {
  id: string
  title: string
  date: string
  author: string
  content: string
  imageUrl: string
  description: string
  category: string
}

interface TOCItem {
  id: string
  content: string
  tag: string
  level: number
}

interface BlogPostPageProps {
  id: string
}

export default function BlogPostPage({ id }: BlogPostPageProps) {
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [toc, setToc] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      try {
        const docRef = doc(db, 'blogPosts', id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const postData = { id: docSnap.id, ...docSnap.data() } as BlogPost
          setPost(postData)
          
          // Fetch related posts
          const relatedPostsQuery = query(
            collection(db, 'blogPosts'),
            where('category', '==', postData.category),
            where('__name__', '!=', id),
            limit(3)
          )
          
          const relatedPostsSnapshot = await getDocs(relatedPostsQuery)
          const relatedPostsData = relatedPostsSnapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data() 
          } as BlogPost))
          
          setRelatedPosts(relatedPostsData)
          setError(null)
        } else {
          setError('Blog post not found')
        }
      } catch (error) {
        console.error('Error fetching post:', error)
        setError('An error occurred while fetching the blog post.')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  // Generate table of contents from content
  useEffect(() => {
    if (post?.content && contentRef.current) {
      const container = contentRef.current
      const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
      
      const tocItems: TOCItem[] = []
      
      headings.forEach((heading, index) => {
        const tag = heading.tagName.toLowerCase()
        const level = parseInt(tag.charAt(1))
        const content = heading.textContent || ''
        const headingId = `heading-${index}-${content.toLowerCase().replace(/\s+/g, '-')}`
        
        heading.id = headingId
        
        tocItems.push({
          id: headingId,
          content,
          tag,
          level
        })
      })
      
      setToc(tocItems)
    }
  }, [post?.content])

  // Track active heading on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (toc.length === 0) return
      
      const headingElements = toc.map(item => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100
      
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const heading = headingElements[i]
        if (heading && heading.offsetTop <= scrollPosition) {
          setActiveId(heading.id)
          break
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [toc])

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/4 space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-[300px] w-full" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
          <div className="hidden lg:block w-1/4">
            <Skeleton className="h-[500px] w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 py-12">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-6 text-center">
          <Button variant="outline" onClick={() => router.push('/blog')}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>
        </div>
      </div>
    )
  }

  if (!post) return null

  return (
    <section className="py-12 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="w-full lg:w-3/4 space-y-8">
            <div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mb-4" 
                onClick={() => router.push('/blog')}
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Button>
              
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                {post.category}
              </Badge>
              
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-4 text-muted-foreground mb-8">
                <div className="flex items-center gap-1">
                  <User2Icon className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <Image 
                src={post.imageUrl || '/placeholder.svg?height=600&width=1200'} 
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <div 
              ref={contentRef}
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:scroll-mt-20"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            <Separator className="my-8" />
            
            <DonationCard />
          </div>
          
          
          <div className="hidden lg:block w-1/4 space-y-8">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="text-lg">Table of Contents</CardTitle>
              </CardHeader>
              
              <ScrollArea className="h-[300px] px-4">
                {toc.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    No table of contents available
                  </p>
                ) : (
                  <div className="space-y-1">
                    {toc.map((item) => (
                      <Button
                        key={item.id}
                        variant="ghost"
                        size="sm"
                        className={`justify-start w-full text-left pl-${(item.level - 1) * 2} ${
                          activeId === item.id ? 'text-primary font-medium' : 'text-muted-foreground'
                        }`}
                        onClick={() => {
                          document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                          setActiveId(item.id)
                        }}
                      >
                        {item.content}
                      </Button>
                    ))}
                  </div>
                )}
              </ScrollArea>
              
              <Separator className="my-4" />
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Related Articles</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {relatedPosts.length === 0 ? (
                  <p className="text-muted-foreground text-center py-2">
                    No related articles found
                  </p>
                ) : (
                  relatedPosts.map(relatedPost => (
                    <Card key={relatedPost.id} className="overflow-hidden">
                      <div className="relative h-32 w-full">
                        <Image 
                          src={relatedPost.imageUrl || '/placeholder.svg?height=200&width=400'} 
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader className="p-3">
                        <CardTitle className="text-sm line-clamp-2">
                          {relatedPost.title}
                        </CardTitle>
                      </CardHeader>
                      <CardFooter className="p-3 pt-0">
                        <Button variant="link" className="p-0 h-auto text-primary" asChild>
                          <Link href={`/blog/${relatedPost.id}`} className="flex items-center gap-1 text-xs">
                            Read article <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
*/}
