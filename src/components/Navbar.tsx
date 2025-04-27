import logo from '@/public/assets/Logo.png';
import Image from 'next/image';
import Link from 'next/link';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';

export default function Navbar() {
  return (
    <div className="absolute top-16 left-1/2 z-10 translate-x-[-50%] ">
      <Link href={'/'} legacyBehavior passHref className="cursor-pointer">
        <Image src={logo} alt="Logo" priority width={200} />
      </Link>
      <Menubar className="flex justify-center items-center gap-4 bg-white rounded-md shadow-md p-2 mt-2">
        <MenubarMenu>
          <MenubarTrigger>
            <Link
              href={'/gioi-thieu'}
              legacyBehavior
              passHref
              className="cursor-pointer"
            >
              Giới Thiệu
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer">Công Trình</MenubarTrigger>
          <MenubarContent>
            <MenubarItem className="cursor-pointer">Thiết Kế</MenubarItem>
            <MenubarItem className="cursor-pointer">Thi Công</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
