"use client";

import CategoryCard from "./CategoryCard";
import { categories } from "./categoryData";
import useSound from "use-sound";
import Link from "next/link";
import {  myFont2 } from "@/app/font";

export default function CategorySection() {
  const [playPop] = useSound("/sfx/pop.mp3", { volume: 0.6 });

  return (
    <section className="py-20 px-6 md:px-20 bg-white">
      <h2 className={`text-3xl font-bold text-center text-[#4b2e2b] mb-12 ${myFont2.className}`}>
        Explore Our Menu
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <div key={cat.id} onMouseEnter={() => playPop()} className={`${myFont2.className}`}>
            <Link href="/Menu">
              <CategoryCard
                name={cat.name}
                image={cat.image}
                hoverImage={cat.hoverImage}
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
