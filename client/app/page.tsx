"use client"

import { useEffect, useState } from "react";
import BlogItem from "./components/BlogItem";
import HeaderNav from "./components/HeaderNav";
import { Post } from "./utils/@types";
import { useAuth } from "./utils/providers/AuthProvider";
import { useRouter } from "next/router";
import axios from './utils/api/axiosInstance'


export default function Home() {

  const {user} = useAuth()
  const [posts, setPosts] = useState([])

  const getPosts = async () =>{
    const res  = await axios.get('/posts')
    setPosts(res.data)
  }

  useEffect(()=>{
    getPosts()
  }, [])

  return (
    <main className="min-h-screen w-screen">
      <HeaderNav />
      <div className="py-4 px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Welcome to the Blog</h1>
          <p className="text-gray-600">Stay updated with our latest articles</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {posts.map((data, index) => (
            <BlogItem key={index} blog={data} />
          ))}
        </div>
      </div>
    </main>
  );
}
