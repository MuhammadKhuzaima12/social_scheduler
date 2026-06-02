"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"

type Post = {
  _id: string
  caption: string
  imageUrl: string
  scheduledTime: string
  status: string
}

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts")
        setPosts(response.data.posts)
      } catch (error) {
        alert("Failed to fetch posts")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
    const interval = setInterval(fetchPosts, 30000)
    return () => clearInterval(interval)
  }, [])

  const deletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return
    try {
      await axios.delete("/api/posts", { data: { id } })
      setPosts(posts.filter((post) => post._id !== id))
    } catch (error) {
      alert("Failed to delete post")
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500 text-lg">Loading posts...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <Link href="/create-post"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
            + New Post
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl mb-4">No posts scheduled yet.</p>
            <Link href="/create-post"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Create your first post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <img src={post.imageUrl} alt="post" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <p className="text-gray-800 mb-3 line-clamp-2">{post.caption}</p>
                  <p className="text-sm text-gray-500 mb-3">
                    📅 {new Date(post.scheduledTime).toLocaleString("en-PK", { timeZone: "Asia/Karachi" })}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                      post.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {post.status === "published" ? "✅ Published" : "⏳ Pending"}
                    </span>
                    <button
                      onClick={() => deletePost(post._id)}
                      className="text-sm text-red-500 hover:text-red-700 transition">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}