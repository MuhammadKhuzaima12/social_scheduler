import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Post from "@/models/Post"

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization")

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const now = new Date()

    const duePosts = await Post.find({
      status: "pending",
      scheduledTime: { $lte: now },
    })

    if (duePosts.length === 0) {
      return NextResponse.json({ message: "No posts due" })
    }

    for (const post of duePosts) {
      post.status = "published"
      await post.save()
      console.log(`Post published: ${post._id}`)
    }

    return NextResponse.json({ message: `Published ${duePosts.length} posts` })

  } catch (error) {
    return NextResponse.json({ message: "Cron job failed", error }, { status: 500 })
  }
}