import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/assets/Logo.png'; // Adjust the path to your logo image

export default function Navbar() {
  return (
    <nav className="absolute top-16 left-1/2 z-10 translate-x-[-50%] text-white">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold hover:opacity-80 lowercase"
        >
          <Image
            src={logo} // Replace with your logo path
            alt="Logo"
            width={150} // Adjust width as needed
            height={150} // Adjust height as needed
            priority
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex w-1/5 min-w-[200px] justify-between">
          {/* About Us */}
          <Link href="/about" className="hover:opacity-80 lowercase">
            about us
          </Link>

          {/* Projects Dropdown */}
          <div className="relative group">
            <button className="hover:opacity-80 focus:outline-none lowercase">
              projects
            </button>
            <div className="hidden group-hover:block absolute top-8 left-1/2 transform -translate-x-1/2 w-40 bg-transparent text-white">
              <Link
                href="/A"
                className="block px-4 py-2 hover:opacity-80 lowercase"
              >
                a
              </Link>
              <Link
                href="/B"
                className="block px-4 py-2 hover:opacity-80 lowercase"
              >
                b
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
