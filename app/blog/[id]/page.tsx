// app/blog/[id]/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { db } from '@/firebaseConfig';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPost {
  title: string;
  date: string;
  author: string;
  content: string;
  imageUrl: string;
}

interface TOCItem {
  id: string;
  content: string;
  tag: string;
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'blogPosts', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const postData = docSnap.data() as BlogPost;
          setPost(postData);
          setToc(generateTOC(postData.content));
          setError(null);
        } else {
          setError("Blog post not found");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("An error occurred while fetching the blog post.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  const generateTOC = (htmlContent: string) => {
    const headers = htmlContent.match(/<h[1-3][^>]*>.*?<\/h[1-3]>/g) || [];
    return headers.map((header, index) => {
      const textContent = header.replace(/<[^>]+>/g, '');
      const tag = header.match(/<h([1-3])/i)?.[1] || '2';
      const id = `toc-${index}-${textContent.toLowerCase().replace(/\s+/g, '-')}`;
      return { id, content: textContent, tag };
    });
  };

  useEffect(() => {
    const handleScroll = (event: Event) => {
      // Adjust the function to work with the Event object
      // If you need to use TOCItem, ensure you map or transform the event data accordingly
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  if (!post) return null;

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-8">
      {/* Sidebar for Table of Contents */}
      <div className="hidden lg:block w-1/4 sticky top-20 bg-white shadow-md rounded-lg p-4 max-h-screen overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-center">Contents</h2>
        <div className="space-y-4">
          {toc.map((item, index, array) => {
            // Determine if the current item is a new section starting with h1
            const isNewSection = item.tag === '1' && (index === 0 || array[index - 1].tag === '1');
            let paddingLeft = '';
            if (!isNewSection && item.tag !== '1') {
              if (item.tag === '2') {
                paddingLeft = 'pl-4';
              } else if (item.tag === '3') {
                paddingLeft = 'pl-8';
              } else {
                paddingLeft = `pl-${(parseInt(item.tag) - 1) * 4}`;
              }
            }
            return (
              <Link
                href={`#${item.id}`}
                key={item.id}
                className={`block ${paddingLeft} text-${item.tag === '1' ? 'lg' : item.tag === '2' ? 'md' : 'sm'} font-semibold ${
                  activeId === item.id ? 'text-green-500' : 'text-blue-500'
                } hover:underline`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  setActiveId(item.id);
                }}
              >
                {item.content}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-3/4">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 mb-6">
          By {post.author} on {new Date(post.date).toLocaleDateString()}
        </p>
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={600}
          height={400}
          className="w-full h-96 object-cover rounded-md mb-8"
        />
        <div className="prose max-w-none text-lg text-gray-800 space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
}
