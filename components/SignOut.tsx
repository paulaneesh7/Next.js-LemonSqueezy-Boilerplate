"use client"

import { logout } from "@/lib/auth-actions";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const SignOut = () => {
  return (
    <Button
      onClick={logout}
      className="cursor-pointer dark:bg-slate-800 dark:hover:bg-slate-900 dark:text-white transition ease-in-out duration-300"
    >
      SignOut <LogOut />
    </Button>
  );
};

export default SignOut;