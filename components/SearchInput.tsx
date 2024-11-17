// components/SearchInput.tsx

import React, { useState } from 'react';
import { VscSearch } from "react-icons/vsc";

interface Article {
    name: string;
    author: string;
    keywords: string[];
}

interface SearchablePost extends Article {
    // Add any additional properties if needed
}

interface SearchInputProps {
    articles: SearchablePost[];
    onSearch: (results: SearchablePost[]) => void;
}

export default function SearchInput({ articles, onSearch }: SearchInputProps) {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        const results = articles.filter(article =>
            article.name.toLowerCase().includes(query.toLowerCase()) ||
            article.author.toLowerCase().includes(query.toLowerCase()) ||
            article.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))
        );
        onSearch && onSearch(results);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        handleSearch(); // Call search on input change
    };

    return (
      <div className="flex items-left bg-white rounded-full border border-gray-300 overflow-hidden max-w-md mx-auto shadow-md">
        <input
          type="text"
          placeholder="Search articles..."
          className="flex-grow p-3 rounded-l-full outline-none text-gray-700"
          value={query}
          onChange={handleChange} // Update to use handleChange
        />
        <button 
          className="bg-black text-white px-6 py-3 rounded-full font-semibold flex items-center hover:from-blue-500 hover:to-blue-400 hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300"
          onClick={handleSearch}
        >
          <VscSearch className="mr-2" />
          Search
        </button>
      </div>
    );
}
  