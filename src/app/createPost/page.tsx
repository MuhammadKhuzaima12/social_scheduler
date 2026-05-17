"use client"

import { useState } from "react"

export default function CreatePost() {
  const [caption, setCaption] = useState("")
  const [date, setDate] = useState("")
  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = (e:  React.SyntheticEvent) => {
    e.preventDefault()
    console.log({ caption, date, image })
    alert("Post Scheduled!")
  }

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Post</h1>
      <div className="flex flex-col gap-4">

        <div className="flex flex-col gap-1">
          <label className="font-medium">Image</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)}
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

        <button onClick={handleSubmit}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Schedule Post
        </button>

      </div>
    </div>
  )
}