import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          WhisperrClouds
        </Link>
        <div className="flex gap-4">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/profile" className="hover:underline">
            Profile
          </Link>
          <Link href="/integrations" className="hover:underline">
            Integrations
          </Link>
        </div>
      </div>
    </nav>
  );
}
