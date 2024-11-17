// app/blog/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import Image from 'next/image';
import SearchInput from '@/components/SearchInput';
import Link from 'next/link';
import { FaArrowRightLong } from "react-icons/fa6";
import { KeyboardEvent } from 'react';
import Loading from '@/components/Loading';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  category: string;
  description: string;
  imageUrl: string;
}

// Define a type that extends both Article and BlogPost
type SearchablePost = BlogPost & {
  name: string;
  keywords: string[];
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'blogPosts'));
      const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
      setPosts(postsData);
      setSearchResults(postsData);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const handleSearchResults = (results: BlogPost[]) => {
    setSearchResults(results);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchResults(searchResults); // Execute search on Enter key
    }
  };

  const filteredPosts = searchResults.filter(post => 
    (selectedCategory ? post.category === selectedCategory : true)
  );

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-8 text-center mt-8 ">Writings from Our Team</h1>
          
          <div className="flex items-left justify-between mb-4 align-left">
            <SearchInput 
              articles={posts.map(post => ({
                ...post,
                name: post.title,
                keywords: []
              })) as SearchablePost[]} 
              onSearch={(results) => handleSearchResults(results as unknown as BlogPost[])}
            />
          </div>

          {searchResults.length === 0 && (
            <div className="text-center text-red-500 mt-4">
              No Articles Found
              <button 
                className="ml-4 bg-green-500 px-4 py-2 rounded text-white hover:bg-green-700" 
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </button>
            </div>
          )}

          <div className="flex space-x-4 mb-6 overflow-x-auto whitespace-nowrap">
            <button className="text-white bg-gray-800 px-4 py-2 rounded hover:bg-gray-700" onClick={() => setSelectedCategory('')}>View all</button>
            <button 
              className={`hover:text-blue-500 ${selectedCategory === 'Mental Health' ? 'border-b-4 border-gray-800' : ''}`} 
              onClick={() => setSelectedCategory('Mental Health')}
            >
              Mental Health
            </button>
            <button 
              className={`hover:text-blue-500 ${selectedCategory === 'Community Engagement' ? 'border-b-4 border-gray-800' : ''}`} 
              onClick={() => setSelectedCategory('Community Engagement')}
            >
              Community Engagement
            </button>
            <button 
              className={`hover:text-blue-500 ${selectedCategory === 'Homelessness' ? 'border-b-4 border-gray-800' : ''}`} 
              onClick={() => setSelectedCategory('Homelessness')}
            >
              Homelessness
            </button>
            <button 
              className={`hover:text-blue-500 ${selectedCategory === 'Diseases & Disorders' ? 'border-b-4 border-gray-800' : ''}`} 
              onClick={() => setSelectedCategory('Diseases & Disorders')}
            >
              Diseases & Disorders
            </button>
            {/* Add more categories as needed */}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-2">
                    {post.author} - {new Date(post.date).toLocaleDateString()}
                  </div>
                  <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-700">{post.description}</p>
                  <Link href={`/blog/${post.id}`} className="text-green-500 hover:text-green-600 mt-4 inline-block">
                    Read Post
                    <FaArrowRightLong className="inline-block ml-2 text-green-500" />  
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
