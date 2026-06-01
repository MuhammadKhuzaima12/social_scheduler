import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import connectDB from "@/lib/mongodb"
import Post from "@/models/Post"

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const totalPosts = await Post.countDocuments({ userId })
    const publishedPosts = await Post.countDocuments({ userId, status: "published" })
    const pendingPosts = await Post.countDocuments({ userId, status: "pending" })

    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    const postsThisWeek = await Post.countDocuments({
      userId,
      createdAt: { $gte: oneWeekAgo }
    })

    const successRate = totalPosts > 0
      ? Math.round((publishedPosts / totalPosts) * 100)
      : 0

    return NextResponse.json({
      totalPosts,
      publishedPosts,
      pendingPosts,
      postsThisWeek,
      successRate
    }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error }, { status: 500 })
  }
}