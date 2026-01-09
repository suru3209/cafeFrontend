import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import Footer from "@/components/home/Footer";

export default function HomePage() {
  return (
    <main className="relative">
      {/* FIXED BACKGROUND */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />

      {/* CONTENT (scrollable) */}
      <HeroSection />
      <CategorySection />
      <Footer />
    </main>
  );
}
