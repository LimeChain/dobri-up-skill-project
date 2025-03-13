import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  // TO DO: Add mobile header / Hanburger menu etc.
  // TO DO: Think of some use case for search box in the center of the header or other feature
  // TO DO: Un/Auth state for the buttons and the logo redirect
  // TO DO: Add cool logo and name
  return (
    <header className="flex items-center gap-2 px-4 py-1 fixed top-0 z-10 w-full max-w-[1920px] bg-gray-100 border-b-1 border-gray-200 shadow-md">
      <Link href="/" className="flex items-center gap-2">
        <Image
          alt="logo"
          src="/logo.png"
          width={68}
          height={68}
          className="rounded-xl object-cover max-h-[48px]"
        />
        <p className="text-2xl tracking-widest font-medium">Page</p>
      </Link>
      <div className="flex-1 text-center">CENTER SECTION</div>
      <div>BUTTONS / MENU</div>
    </header>
  );
};

export default Header;
