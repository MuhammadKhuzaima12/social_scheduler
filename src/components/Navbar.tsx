import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 border-b border-[#ccc] flex gap-4">
      <Link href="/create-post">Create Post</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/login">Login</Link>
    </nav>
  );
}