"use client";

import { useEffect, useState } from "react";
import Head from "next/head";

export default function Home() {
  interface Post {
    id: string;
    title: string;
    url: string;
    permalink: string;
  }

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://www.reddit.com/r/Workspaces/new.json?limit=99")
      .then((res) => res.json())
      .then((data) => setPosts(data.data.children.map((child: any) => child.data)));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Landing Page */}
      <header className="min-h-screen flex flex-col justify-center text-center py-20 px-4 bg-blue-600 text-white">
        <h1 className="font-bold">Welcome to Work N Play</h1>
        <p className="mt-2">Discover the best workspaces from around the world!</p>
      </header>

      {/* Latest Posts Gallery */}
      <section className="min-h-screen flex flex-col justify-center items-center p-4">
        <h2 className="text-2xl py-10 font-semibold mb-4">Latest Workspaces</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {posts
            .filter((post) => post.url && /\.(jpg|jpeg|png|gif)$/i.test(post.url))
            .map((post) => (
              <a key={post.id} href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer" className="relative">
                <img
                  src={post.url}
                  alt="Workspace"
                  className="w-full h-56 object-cover rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
                />
              </a>
            ))}
        </div>
      </section>

      {/* Follow Us Section */}
      <section id="follow-us" className="flex flex-col min-h-screen justify-center items-center bg-black px-4 text-center py-8 sm:py-16 md:py-24">
        <h2 className="font-semibold text-white">Follow Us</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <a href="https://discord.gg/3RqN989rDU" target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg shadow-lg overflow-hidden block">
            <img src="discord.png" alt="Instagram" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800">Discord</h3>
              <p className="mt-4 text-gray-600">Join us on Discord for the latest updates and tips.</p>
            </div>
          </a>
          <a href="https://www.reddit.com/r/Workspaces" target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg shadow-lg overflow-hidden block">
            <img src="reddit.png" alt="Reddit" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800">Reddit</h3>
              <p className="mt-4 text-gray-600">Join our Reddit community for discussions and advice.</p>
            </div>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-black text-white">
        <p>&copy; 2025 Work N Play. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
