"use client"

import { useState } from "react"
import axios from "axios"

export default function CreatePost() {
  const [caption, setCaption] = useState("")
  const [date, setDate] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (!caption || !date || !image) {
      alert("Please fill all fields")
      return
    }

    try {
      setLoading(true)

      // Step 1: Upload image to Cloudinary
      const formData = new FormData()
      formData.append("file", image)
      const uploadResponse = await axios.post("/api/upload", formData)
      const imageUrl = uploadResponse.data.url

      // Step 2: Save post to MongoDB
      const response = await axios.post("/api/posts", {
        caption,
        imageUrl,
        scheduledTime: date,
      })

      alert(response.data.message)
      setCaption("")
      setDate("")
      setImage(null)

    } catch (error) {
      alert("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Post</h1>
      <div className="flex flex-col gap-4">

        <div className="flex flex-col gap-1">
          <label className="font-medium">Image</label>
          <input type="file" accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="border border-gray-300 rounded p-2" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium">Caption</label>
          <textarea value={caption} onChange={(e) => setCaption(e.target.value)} rows={4}
            placeholder="Write your caption..."
            className="border border-gray-300 rounded p-2 resize-none" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium">Schedule Date & Time</label>
          <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded p-2" />
        </div>

        <button onClick={handleSubmit} disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50">
          {loading ? "Uploading & Scheduling..." : "Schedule Post"}
        </button>

      </div>
    </div>
  )
}