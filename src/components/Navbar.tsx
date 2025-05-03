'use client';
import { useEffect, useState } from 'react';
import logo from '@/public/assets/Logo.png';
import Image from 'next/image';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

export default function NavigationBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false); // Hide navbar when scrolling down
      } else {
        setIsVisible(true); // Show navbar when scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 bg-transparent border-b border-gray-300 backdrop-blur-md transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto flex items-center gap-2 py-2 px-6">
        {/* Logo */}
        <Link href="/" className="cursor-pointer">
          <Image src={logo} alt="Logo" priority width={100} height={50} />
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu className="mb-2">
          <NavigationMenuList className="flex items-center gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/gioi-thieu"
                  className="text-gray-800 hover:text-gray-600 text-xs md:text-lg"
                >
                  Giới Thiệu
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/du-an"
                  className="text-gray-800 hover:text-gray-600 text-xs md:text-lg"
                >
                  Dự Án
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/lien-he"
                  className="text-gray-800 hover:text-gray-600 text-xs md:text-lg"
                >
                  Liên Hệ
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
