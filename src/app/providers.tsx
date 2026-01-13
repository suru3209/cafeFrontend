"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith("/Admin");

  return (
    <AuthProvider>
      <CartProvider>
        {!hideNavbar && <Navbar />}
        {children}
      </CartProvider>
    </AuthProvider>
  );
}
