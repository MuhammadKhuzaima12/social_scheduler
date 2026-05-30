import Link from "next/link"
import { auth } from "@clerk/nextjs/server"

export default async function Home() {
  const { userId } = await auth()

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center max-w-2xl px-6">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Social <span className="text-blue-600">Scheduler</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Schedule your social media posts automatically. Upload, set a time, and let us handle the rest.
        </p>
        <div className="flex gap-4 justify-center">
          {userId ? (
            <Link href="/dashboard"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link href="/sign-up"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                Get Started
              </Link>
              <Link href="/sign-in"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-white transition">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}