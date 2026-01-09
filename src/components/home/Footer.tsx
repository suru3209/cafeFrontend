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
            <li>Home</li>
            <li>Menu</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <p className="text-sm text-white/70">
            Bhilwara, Rajasthan<br />
            📞 +91 XXXXX XXXXX<br />
            ⏰ 10 AM – 11 PM
          </p>
        </div>
      </div>

      <p className="text-center text-xs text-white/50 mt-12">
        © 2026 Aniicone&apos;s Café. All rights reserved.
      </p>
    </footer>
  );
}
