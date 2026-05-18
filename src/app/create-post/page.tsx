"use client"

import { useState } from "react"
import axios from "axios"

export default function CreatePost() {
  const [caption, setCaption] = useState("")
  const [date, setDate] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (!caption || !date || !imageUrl) {
      alert("Please fill all fields")
      return
    }

    try {
      setLoading(true)
      const response = await axios.post("/api/posts", {
        caption,
        imageUrl,
        scheduledTime: date,
      })
      alert(response.data.message)
      setCaption("")
      setDate("")
      setImageUrl("")
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
          <label className="font-medium">Image URL</label>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Paste image URL here..."
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
          {loading ? "Scheduling..." : "Schedule Post"}
        </button>

      </div>
    </div>
  )
}