"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/api/admin/auth/login", {
        email,
        password,
        adminCode: secret,
      });

      if (res.data.admin.role !== "ADMIN") {
        return alert("Not an admin");
      }

      router.push("/admin");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-96 p-6 border rounded-lg space-y-4">
        <h2 className="text-xl font-bold">Admin Login</h2>

        <input
          placeholder="Email"
          className="w-full border p-2"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full border p-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          placeholder="Admin Secret"
          className="w-full border p-2"
          onChange={(e) => setSecret(e.target.value)}
        />

        <button onClick={login} className="w-full bg-black text-white p-2">
          Login
        </button>
      </div>
    </div>
  );
}
