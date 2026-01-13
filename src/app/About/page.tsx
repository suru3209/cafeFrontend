export default function AboutPage() {
  return (
    <section className="px-6 md:px-20 py-20 bg-[#f9f9f9]">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-[#4b2e2b]">
          About Aniicone’s Café ☕
        </h1>

        <p className="text-gray-600 text-lg leading-relaxed">
          Aniicone’s Café is not just a café – it’s an experience.  
          We serve freshly brewed coffee, juicy burgers, and our
          signature cone pizzas with love and quality.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">☕ Fresh Coffee</h3>
            <p className="text-sm text-gray-500">
              Premium beans, perfect roast, unforgettable taste.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">🍔 Tasty Food</h3>
            <p className="text-sm text-gray-500">
              Burgers & cone pizzas crafted for food lovers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">❤️ With Love</h3>
            <p className="text-sm text-gray-500">
              Every order is prepared with care & passion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
