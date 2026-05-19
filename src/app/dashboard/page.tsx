"use client"

import { useEffect, useState } from "react"
import axios from "axios"

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
  }, [])

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts scheduled yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post._id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
              <img src={post.imageUrl} alt="post" className="w-full h-48 object-cover rounded mb-3" />
              <p className="text-gray-800 mb-2">{post.caption}</p>
              <p className="text-sm text-gray-500">
                Scheduled: {new Date(post.scheduledTime).toLocaleString()}
              </p>
              <span className="inline-block mt-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded">
                {post.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}