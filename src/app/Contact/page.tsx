"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  HelpCircle,
  Phone,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen px-4 flex flex-col items-center">
      {/* MAIN CARD */}
      <div className="w-full max-w-xl  lg:px-10 lg:py-10">
        {/* HEADER */}
        <div className="text-center mb-10 max-w-xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Contact & Help
          </h1>
          <p className="text-gray-600">
            Need help or want to connect? Reach out anytime.
          </p>
        </div>
        <CardHeader className="text-center">
          <CardTitle className="text-xl flex justify-center items-center gap-2">
            <HelpCircle size={20} />
            Developer Details
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-6">
          {/* PROFILE */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-24 w-24 rounded-full bg-gray-900 text-white flex items-center justify-center text-3xl font-semibold">
              S
            </div>

            <h2 className="text-lg font-semibold">Surya Prakash Singh</h2>
            <p className="text-sm text-white">Full Stack Developer</p>
          </div>

          {/* CONTACT INFO */}
          <div className="w-full flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-2 justify-center">
              <Mail size={16} />
              <a
                href="mailto:suryaprakash@example.com"
                className="hover:underline"
              >
                suryaprakash3209@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-2 justify-center">
              <Phone size={16} />
              <span>Available on request</span>
            </div>
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex gap-4">
            <a
              href="https://github.com/suru3209"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="hover:text-green-700" />
            </a>

            <a
              href="https://linkedin.com/in/surya3209"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="hover:text-pink-700" />
            </a>

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="hover:text-blue-700" />
            </a>
          </div>
          <p className="text-gray-900 text-center leading-relaxed">
            Aniicones Café is a modern, cozy, and vibrant café designed to
            deliver a delightful food and beverage experience. From freshly
            brewed coffee and refreshing drinks to delicious snacks and meals,
            we focus on quality, taste, and customer satisfaction. With a smooth
            online ordering system, quick service, and a welcoming atmosphere,
            Aniicones Café makes every visit special — whether you’re relaxing
            with friends, working, or grabbing a quick bite. We believe in great
            flavors, great vibes, and great moments. ☕🍔✨
          </p>
        </CardContent>
      </div>
    </div>
  );
}
