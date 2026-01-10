"use client";

import { useState } from "react";
import api from "@/lib/axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";

type Mode = "email" | "login" | "signup";

export default function AuthForm() {
  const [mode, setMode] = useState<Mode>("email");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  // STEP 1: check email
  const handleEmailCheck = async () => {
    try {
      setLoading(true);
      const res = await api.post("/api/auth/check-email", { email });

      if (res.data.exists) {
        setMode("login");
      } else {
        setMode("signup");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // LOGIN
  const handleLogin = async () => {
    try {
      setLoading(true);
      await api.post("/api/auth/login", { email, password });
      await login();
      window.location.href = "/Menu";
    } catch (err) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  // SIGNUP
  const handleSignup = async () => {
    try {
      setLoading(true);
      await api.post("/api/auth/signup", { name, email, password });
      await login();
      window.location.href = "/Menu";
    } catch (err) {
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">
          {mode === "email" && "Welcome ☕"}
          {mode === "login" && "Login"}
          {mode === "signup" && "Create Account"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* EMAIL */}
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={mode !== "email"}
        />

        {/* NAME */}
        {mode === "signup" && (
          <Input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        {/* PASSWORD */}
        {(mode === "login" || mode === "signup") && (
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        {/* BUTTON */}
        {mode === "email" && (
          <Button
            className="w-full bg-[#4b2e2b]"
            onClick={handleEmailCheck}
            disabled={!email || loading}
          >
            Continue
          </Button>
        )}

        {mode === "login" && (
          <Button
            className="w-full bg-[#4b2e2b]"
            onClick={handleLogin}
            disabled={loading}
          >
            Login
          </Button>
        )}

        {mode === "signup" && (
          <Button
            className="w-full bg-[#4b2e2b]"
            onClick={handleSignup}
            disabled={loading}
          >
            Sign Up
          </Button>
        )}

        {/* BACK */}
        {mode !== "email" && (
          <button
            onClick={() => setMode("email")}
            className="text-sm text-center w-full text-gray-500 hover:underline"
          >
            Change email
          </button>
        )}
      </CardContent>
    </Card>
  );
}
