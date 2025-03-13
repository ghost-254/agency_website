'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '@/firebaseConfig'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarIcon, User2Icon, ArrowRight } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

interface BlogPost {
  id: string
  title: string
  date: string
  author: string
  category: string
  description: string
  imageUrl: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const querySnapshot = await getDocs(
          query(collection(db, 'blogPosts'), orderBy('date', 'desc'))
        )
        
        const postsData = querySnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        } as BlogPost))
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(postsData.map(post => post.category))
        ).filter(Boolean)
        
        setPosts(postsData)
        setFilteredPosts(postsData)
        setCategories(uniqueCategories)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    
    if (category === 'all') {
      setFilteredPosts(posts)
    } else {
      setFilteredPosts(posts.filter(post => post.category === category))
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <section className="py-12 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="space-y-2 text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Writings from Our Team
          </h1>
          <p className="text-muted-foreground max-w-[700px] mx-auto">
            Insights, stories, and resources from our community outreach efforts
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full mb-8">
          <div className="flex justify-center mb-6">
            <TabsList className="bg-muted/60">
              <TabsTrigger 
                value="all" 
                onClick={() => handleCategoryChange('all')}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                All Posts
              </TabsTrigger>
              
              {categories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  onClick={() => handleCategoryChange(category)}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeCategory} className="mt-0">
            {loading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <CardHeader>
                      <Skeleton className="h-4 w-1/3 mb-2" />
                      <Skeleton className="h-6 w-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No posts found in this category.</p>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredPosts.map(post => (
                      <Card key={post.id} className="overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-md">
                        <div className="relative h-48 w-full">
                          <Image 
                            src={post.imageUrl || '/placeholder.svg?height=400&width=600'} 
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary" className="bg-primary/90 text-primary-foreground hover:bg-primary">
                              {post.category}
                            </Badge>
                          </div>
                        </div>
                        
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <User2Icon className="h-3 w-3" />
                            <span>{post.author}</span>
                            <span className="text-muted-foreground/50">•</span>
                            <CalendarIcon className="h-3 w-3" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                        </CardHeader>
                        
                        <CardContent className="pb-2 flex-grow">
                          <CardDescription className="line-clamp-3">
                            {post.description}
                          </CardDescription>
                        </CardContent>
                        
                        <CardFooter>
                          <Button variant="link" className="p-0 h-auto text-primary" asChild>
                            <Link href={`/blog/${post.id}`} className="flex items-center gap-1">
                              Read post <ArrowRight className="h-4 w-4 ml-1" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
