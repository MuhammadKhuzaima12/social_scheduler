import cron from "node-cron"
import connectDB from "@/lib/mongodb"
import Post from "@/models/Post"

let isSchedulerRunning = false

export function startScheduler() {
  if (isSchedulerRunning) return
  isSchedulerRunning = true

  console.log("Scheduler started...")

  cron.schedule("* * * * *", async () => {
    try {
      await connectDB()

      const now = new Date()

      const duePosts = await Post.find({
        status: "pending",
        scheduledTime: { $lte: now },
      })

      if (duePosts.length === 0) {
        console.log("No posts due right now")
        return
      }

      for (const post of duePosts) {
        post.status = "published"
        await post.save()
        console.log(`Post published: ${post._id}`)
      }

    } catch (error) {
      console.error("Scheduler error:", error)
    }
  })
}