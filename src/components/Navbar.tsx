"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import {  myFont4, myFont8 } from "@/app/font";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // TEMP (later AuthContext se aayega)
  const { user, loading, logout } = useAuth();
  if (loading) return null;
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/Menu" },
    { name: "About", path: "/About" },
    { name: "Contact", path: "/Contact" },
  ];

  return (
    <nav className="w-full bg-[#f3f3f3] border-b fixed top-0 z-50">
      {/* MAIN BAR */}
      <div className="h-16 py-9 px-6 lg:px-26 flex items-center justify-between">
        {/* LEFT - LOGO */}
        <Link href="/" className="flex items-center">
          <img className="w-16" src="/images/logo.png" alt="logo" />
        </Link>

        {/* CENTER - DESKTOP NAV */}
        <div className="hidden md:flex gap-10">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              <Link
                href={item.path}
                className={`text-sm hover:font-bold font-medium transition ${myFont4.className} ${
                  pathname === item.path
                    ? "text-[#4b2e2b]"
                    : "text-gray-700 hover:text-[#4b2e2b]"
                }`}
              >
                {item.name}
              </Link>

              {/* underline */}
              <div
                className={`absolute left-0 -bottom-1 h-0.5 w-full bg-[#4b2e2b] origin-left transition-transform duration-300
                ${
                  pathname === item.path
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </div>
          ))}
        </div>

        {/* RIGHT - DESKTOP AUTH */}
        <div className="hidden md:flex">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarFallback className="bg-[#4b2e2b] text-white">
                    S
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/myAccount">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link href="/Cart">
                  <DropdownMenuItem>Cart</DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-500 cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/Auth"
              className={`px-5 py-2 rounded-full bg-[#ad7b7b] text-white text-bold hover:bg-[#6b4f4b] transition ${myFont8.className}`}
            >
              Join Now
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#4b2e2b]"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setOpen(false)}
              className={`block text-sm font-medium ${
                pathname === item.path ? "text-[#4b2e2b]" : "text-gray-700"
              }`}
            >
              {item.name}
            </Link>
          ))}

          <div className="pt-4 border-t">
            {user ? (
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-[#4b2e2b] text-white">
                    S
                  </AvatarFallback>
                </Avatar>
                <Link href="/Profile" onClick={() => setOpen(false)}>
                  <span className="text-sm cursor-pointer">My Profile</span>
                </Link>
              </div>
            ) : (
              <Link
                href="/Auth"
                onClick={() => setOpen(false)}
                className="block text-center bg-[#4b2e2b] text-white py-2 rounded-full text-sm"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
