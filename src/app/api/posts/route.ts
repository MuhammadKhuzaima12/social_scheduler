import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import connectDB from "@/lib/mongodb"
import Post from "@/models/Post"

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const body = await req.json()
    const { caption, imageUrl, scheduledTime } = body

    if (!caption || !imageUrl || !scheduledTime) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    const post = await Post.create({
      userId,
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
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const posts = await Post.find({ userId }).sort({ createdAt: -1 })

    return NextResponse.json({ posts }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { id } = await req.json()

    if (!id) {
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 })
    }

    await Post.findOneAndDelete({ _id: id, userId })

    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error }, { status: 500 })
  }
}