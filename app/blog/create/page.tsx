//app/blog/create/page.tsx 

"use client"

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { debounce } from '@/app/utils/debounce';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface TOCItem {
    id: string;
    content: string;
    tag: string;
  }
  

export default function CreateArticlePage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState(currentUser?.displayName || '');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [toc, setToc] = useState<TOCItem[]>([]);

  const generateTOC = (htmlContent: string) => {
    const headers = htmlContent.match(/<h[1-3]>.*?<\/h[1-3]>/g) || [];
    return headers.map((header, index) => {
      const textContent = header.replace(/<[^>]+>/g, '');
      const tag = header.match(/<h([1-3])>/)?.[1] || '2';
      const id = `toc-${index}-${textContent.toLowerCase().replace(/\s+/g, '-')}`;
      
      return { id, content: textContent, tag };
    });
  };

  useEffect(() => {
    const newToc = generateTOC(content);
    if (JSON.stringify(newToc) !== JSON.stringify(toc)) {
      setToc(newToc);
    }
  }, [content, toc]);

  const handleContentChange = debounce((value: string) => {
    const div = document.createElement('div');
    div.innerHTML = value;

    div.querySelectorAll('h1, h2, h3').forEach((el, index) => {
      el.id = `toc-${index}-${el.textContent?.toLowerCase().replace(/\s+/g, '-')}`;
    });

    setContent(div.innerHTML);
  }, 300);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Implement your image upload logic here
      // For example, upload to a cloud storage and get the URL
      // setImageUrl(uploadedImageUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !category || !description || !imageUrl || !author) {
      alert('Please fill in all fields.');
      return;
    }

    if (!confirm('Are you sure you want to post this article?')) {
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'blogPosts'), {
        title,
        content,
        category,
        description,
        imageUrl,
        author: author || 'Anonymous',
        date: new Date().toISOString(),
        createdAt: serverTimestamp(),
      });
      setLoading(false);
      router.push('/blog');
    } catch (error) {
      console.error("Error posting article:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 flex gap-8">
      {/* Sidebar Table of Contents */}
      <div className="hidden lg:block w-1/4 sticky top-20 bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 text-blue-800">Table of Contents</h2>
        <div className="space-y-2">
          {toc.map((item) => (
            <a
              href={`#${item.id}`}
              key={item.id}
              className={`block text-${item.tag === '1' ? 'lg' : 'md'} font-semibold hover:text-blue-500`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {item.content}
            </a>
          ))}
        </div>
      </div>

      {/* Article Editor */}
      <div className="w-full lg:w-3/4">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border border-gray-300 rounded text-lg"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border border-gray-300 rounded"
            required
          >
            <option value="">Select a category</option>
            <option value="Mental Health">Mental Health</option>
            <option value="Community Engagement">Community Engagement</option>
            <option value="Homelessness">Homelessness</option>
            <option value="Diseases & Disorders">Diseases & Disorders</option>
            {/* Add more categories as needed */}
          </select>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 border border-gray-300 rounded"
            required
          />
          <div className="flex items-center border border-gray-300 rounded">
            <input
              type="text"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="p-3 flex-grow"
            />
            <label className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded-r">
              Upload
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          <input
            type="text"
            placeholder="Author's Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="p-3 border border-gray-300 rounded"
          />

          {/* Rich Text Editor */}
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            className="h-80 mb-24"
            placeholder="Start writing your article here..."
          />

          {/* Preview Mode */}
          {preview && (
            <div className="p-4 border border-gray-300 rounded mb-10">
              <h2 className="text-2xl font-bold">{title}</h2>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          )}

        </form>
        <div className="px-4 mt-4 text-center">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-6 py-2 rounded mt-8"
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post Article'}
          </button>
        </div>
      </div>
    </div>
  );
}
