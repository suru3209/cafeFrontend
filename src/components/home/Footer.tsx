import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#292F39] text-white py-16 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Aniicone&apos;s Café ☕
          </h3>
          <p className="text-white/70 text-sm">
            Serving fresh coffee, burgers & cone pizza with love.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/menu">Menu</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <p className="text-sm text-white/70">
            Chittorgarh, Rajasthan
            <br />
            📞 +91 XXXXX XXXXX
            <br />⏰ 10 AM – 11 PM
          </p>
        </div>
      </div>

      <div className="text-center text-xs text-white/50 mt-12 space-y-2">
        <p>© 2026 Aniicone&apos;s Café. All rights reserved.</p>

        <p>
          Designed by{" "}
          <a
            href="www.linkedin.com/in/surya3209"
            target="_blank"
            className="text-white underline hover:text-gray-300"
          >
            Surya
          </a>
        </p>
      </div>
    </footer>
  );
}
