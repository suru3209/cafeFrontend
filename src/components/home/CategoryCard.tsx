"use client";

import { useState } from "react";

type Props = {
  name: string;
  image: string;
  hoverImage: string;
};

export default function CategoryCard({ name, image, hoverImage }: Props) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg transition-all hover:scale-105"
    >
      <img
        src={hover ? hoverImage : image}
        alt={name}
        className="w-full h-56 object-cover transition-all duration-500"
      />

      <div className="absolute inset-0 bg-black/30 flex items-end p-4">
        <h3 className="text-white text-xl font-semibold">{name}</h3>
      </div>
    </div>
  );
}
