// app/blog/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import Image from 'next/image';
import SubscribeInput from '@/components/SubscribeInput';


interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  category: string;
  description: string;
  imageUrl: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'blogPosts'));
      const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center mt-8 ">Writings from Our Team</h1>
      <div className="flex items-left justify-between mb-4 align-left">
      <SubscribeInput />
      </div>

      <div className="flex space-x-4 mb-6 overflow-x-auto whitespace-nowrap">
        <button className="text-blue-500" onClick={() => setSelectedCategory('')}>View all</button>
        <button className="hover:text-blue-500" onClick={() => setSelectedCategory('Mental Health')}>Mental Health</button>
        <button className="hover:text-blue-500" onClick={() => setSelectedCategory('Community Engagement')}>Community Engagement</button>
        <button className="hover:text-blue-500" onClick={() => setSelectedCategory('Homelessness')}>Homelessness</button>
        {/* Add more categories as needed */}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.filter(post => selectedCategory ? post.category === selectedCategory : true).map((post) => (
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
              <a href={`/blog/${post.id}`} className="text-blue-500 mt-4 inline-block">
                Read post &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
