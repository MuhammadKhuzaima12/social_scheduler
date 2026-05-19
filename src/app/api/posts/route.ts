import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Post from "@/models/Post"

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const body = await req.json()
    const { caption, imageUrl, scheduledTime } = body

    if (!caption || !imageUrl || !scheduledTime) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    const post = await Post.create({
      caption,
      imageUrl,
      scheduledTime,
    })

    return NextResponse.json({ message: "Post scheduled successfully", post }, { status: 201 })

  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectDB()

    const posts = await Post.find().sort({ createdAt: -1 })

    return NextResponse.json({ posts }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error }, { status: 500 })
  }
}