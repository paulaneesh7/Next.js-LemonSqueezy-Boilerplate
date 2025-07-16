"use client";

import Image from "next/image";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import SignOut from "./SignOut";
import SignIn from "./SignIn";
import HamburgerMenu from "./HamburgerMenu";
import { ModeToggle } from "./theme/mode-toggle";

export default function Navbar({ user }: { user: any }) {
  return (
    // cursor-pointer bg-white shadow-lg py-2.5 border-b border-gray-200 sticky top-0
    <nav
      className="fixed top-0 left-0 w-full bg-white shadow-md py-2.5 border-b border-gray-200 z-50 cursor-pointer dark:bg-slate-950 dark:border-slate-900 backdrop-filter backdrop-blur-xl bg-opacity-30"
    >
      <div className="container mx-auto flex justify-between items-center px-5 lg:px-1">
        {/* Left Logo */}
        <Link href={"/"} className="flex items-center gap-2">
          {/* <Image src={"/logo.png"} alt="logo" width={50} height={50} priority/> */}
          <span className="text-2xl font-bold text-slate-800 uppercase dark:text-white">
            Lemonsqueezy
          </span>
        </Link>

        {/* Large screen navbar */}
        <div className="hidden lg:flex items-center space-x-2 font-medium">
          {" "}
          {user ? (
            <>
              
              <Link
                href={"/pricing"}
                className="text-slate-900 hover:text-slate-900 hover:bg-gray-100 hover:rounded-lg transition duration-200 p-2 dark:text-white dark:hover:bg-slate-900"
              >
                Pricing
              </Link>
              <SignOut />
              <UserAvatar user={user} />
            </>
          ) : (
            <>
              <SignIn />
            </>
          )}
          <ModeToggle />
        </div>

        {/* Small screen hamburger menu */}
        <div className="lg:hidden">
          <HamburgerMenu user={user} />
        </div>
      </div>
    </nav>
  );
}