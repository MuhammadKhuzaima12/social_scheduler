import Link from "next/link"
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"

export default async function Navbar() {
  const { userId } = await auth()

  return (
    <nav className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
      <div className="flex gap-4">
        <Link href="/dashboard" className="font-medium hover:text-blue-600 transition">Dashboard</Link>
        <Link href="/create-post" className="font-medium hover:text-blue-600 transition">Create Post</Link>
        <Link href="/analytics" className="font-medium hover:text-blue-600 transition">Analytics</Link>
      </div>

      <div className="flex gap-3 items-center">
        {!userId ? (
          <>
            <SignInButton mode="modal">
              <button className="px-4 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                Sign Up
              </button>
            </SignUpButton>
          </>
        ) : (
          <UserButton />
        )}
      </div>
    </nav>
  )
}