"use client"

import { useEffect, useState } from "react"
import axios from "axios"

type Analytics = {
  totalPosts: number
  publishedPosts: number
  pendingPosts: number
  postsThisWeek: number
  successRate: number
}

export default function AnalyticsPage() {
  const [data, setData] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get("/api/analytics")
        setData(response.data)
      } catch (error) {
        alert("Failed to fetch analytics")
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500 text-lg">Loading analytics...</p>
    </div>
  )

  if (!data) return null

  const stats = [
    {
      label: "Total Posts",
      value: data.totalPosts,
      bg: "bg-blue-50",
      text: "text-blue-600",
      icon: "📊"
    },
    {
      label: "Published",
      value: data.publishedPosts,
      bg: "bg-green-50",
      text: "text-green-600",
      icon: "✅"
    },
    {
      label: "Pending",
      value: data.pendingPosts,
      bg: "bg-yellow-50",
      text: "text-yellow-600",
      icon: "⏳"
    },
    {
      label: "This Week",
      value: data.postsThisWeek,
      bg: "bg-purple-50",
      text: "text-purple-600",
      icon: "📅"
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className={`${stat.bg} rounded-xl p-6 text-center`}>
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className={`text-4xl font-bold ${stat.text} mb-1`}>{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Success Rate</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-100 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${data.successRate}%` }}
              />
            </div>
            <span className="text-2xl font-bold text-green-600">{data.successRate}%</span>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            {data.publishedPosts} out of {data.totalPosts} posts published successfully
          </p>
        </div>

      </div>
    </div>
  )
}