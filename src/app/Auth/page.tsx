"use client";
import AuthForm from "@/components/AuthFrom";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return null; // or a message, but since redirecting
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 -mt-20">
      {/* LEFT - BRAND */}
      <div className="hidden md:flex flex-col items-center justify-center bg-[#7f5f5c] text-white p-10">
        <img src="/images/logo.png" alt="logo" className="w-60 mb-6" />
        <h1 className="text-3xl font-bold mb-2">Aniicone&apos;s Café</h1>
        <p className="text-sm text-white/80 text-center max-w-sm">
          Fresh coffee, burgers & cone pizza — order online and enjoy the taste.
        </p>
      </div>

      {/* RIGHT - FORM */}
      <div className="flex items-center justify-center p-6">
        <AuthForm />
      </div>
    </div>
  );
}
