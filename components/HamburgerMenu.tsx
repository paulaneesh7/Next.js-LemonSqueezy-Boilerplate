'use client';

import { useState } from "react";
import Link from "next/link";
import SignOut from "./SignOut";
import UserAvatar from "./UserAvatar";
import SignIn from "./SignIn";
import { ModeToggle } from "./theme/mode-toggle";

interface HamburgerMenuProps {
  user: any;
}

export default function HamburgerMenu({ user }: HamburgerMenuProps) {
  const [open, setOpen] = useState(false);

  if (!user) return (
    <div className="flex items-center gap-1">
      <SignIn />
      <ModeToggle />
    </div>
  )

  return (
    <div className="lg:hidden relative px-4 py-2 cursor-pointer">
      {/* Avatar Button */}
      <button
        onClick={() => setOpen(!open)}
        className="focus:outline-none"
      >
        <UserAvatar user={user} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 flex flex-col py-3 px-4 space-y-1 dark:bg-slate-950">
          <Link href="/profile" onClick={() => setOpen(false)} className="hover:text-slate-900 hover:bg-gray-100 hover:rounded-lg transition duration-200 px-2 py-1">
            Profile
          </Link>
        
          <div className="pt-2 border-t border-gray-100">
          <ModeToggle />
          </div>
            <SignOut />
        </div>
      )}
    </div>
  );
};

