import { NextResponse } from "next/server"
import { startScheduler } from "@/lib/scheduler"

export async function GET() {
  try {
    startScheduler()
    return NextResponse.json({ message: "Scheduler started" })
  } catch (error) {
    return NextResponse.json({ message: "Failed to start scheduler", error }, { status: 500 })
  }
}
