import React from "react";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="border-b border-gray-200 bg-white px-4 py-2">
      <div className="container mx-auto flex justify-between items-center px-4 h-16">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold text-primary"
        >
          <Briefcase /> Job Tracker
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/sign-in">
            <Button variant="ghost" className="text-gray-700 hover:text-black">
              Login
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button>Start for free</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
