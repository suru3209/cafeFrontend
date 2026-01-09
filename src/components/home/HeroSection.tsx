import { Skiper25 } from "../ui/skiper-ui/skiper25";

export default function HeroSection() {
  return (
    <section className="h-[50vh] flex items-center justify-center bg-transparent">
      {/* Content baad me */}
      <div className="text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          Aniicone&apos;s Café
        </h1>
        <p className="mt-4 text-sm md:text-lg text-white/80">
          Fresh coffee • Burgers • Cone Pizza
        </p>
        <Skiper25/>
      </div>
    </section>
  );
}
