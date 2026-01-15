"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useRef, useState } from "react";
import useSound from "use-sound";

import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const paiseToRupees = (p: number): number => Math.round(p / 100);

type MenuOptionValue = {
  value: string;
  priceDelta: number;
};

type MenuOption = {
  id: string;
  name: string;
  values: MenuOptionValue[];
};

type Project = {
  id: string;
  _virtualId?: string;
  name: string;
  price: number;
  basePrice: number;
  image: string;
  description?: string;
  category: {
    name: string;
  };
  options?: MenuOption[];
};

interface TikTikColorListProps {
  projects: Project[];
  className?: string;
  showPreview?: boolean;
  enableSound?: boolean;
  infiniteScroll?: boolean;
  scrollThreshold?: number;
}

const TikTikColorList = ({
  projects,
  className = "",
  showPreview = true,
  enableSound = true,
  infiniteScroll = true,
  scrollThreshold = 1000,
}: TikTikColorListProps) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [archiveList, setArchiveList] = useState<Project[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isLoadingRef = useRef(false);

  const { addToCart } = useCart();

  // 🔇 TEMP SOUND OFF
  const [playTick] = useSound("/sfx/wind.mp3", {
    volume: 0.6,
    soundEnabled: false,
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    if (!infiniteScroll) {
      setArchiveList(projects);
      return;
    }

    const list: Project[] = [];
    for (let i = 0; i < 10; i++) {
      projects.forEach((project, j) => {
        list.push({ ...project, _virtualId: `${i}-${j}-${project.id}` });
      });
    }

    setArchiveList(list);
  }, [projects, infiniteScroll]);

  const handleScroll = useCallback(() => {
    if (!infiniteScroll || isLoadingRef.current) return;

    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - scrollThreshold
    ) {
      isLoadingRef.current = true;

      setTimeout(() => {
        setArchiveList((prev) => [
          ...prev,
          ...projects.map((project, i) => ({
            ...project,
            _virtualId: `${prev.length}-${i}-${project.id}`,
          })),
        ]);

        isLoadingRef.current = false;
      }, 400);
    }
  }, [projects, infiniteScroll, scrollThreshold]);

  useEffect(() => {
    if (!infiniteScroll) return;
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, infiniteScroll]);

  useEffect(() => {
    ScrollTrigger.getAll().forEach((t) => t.kill());

    itemRefs.current.forEach((item, index) => {
      if (!item) return;

      ScrollTrigger.create({
        trigger: item,
        start: "top 70%",
        end: "top 65%",
        onEnter: () => {
          playTick();
          setCurrentProjectIndex(index % projects.length);
          setActiveIndex(index);
        },
        onEnterBack: () => {
          playTick();
          setCurrentProjectIndex(index % projects.length);
          setActiveIndex(index);
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [archiveList, projects.length, playTick]);

  const calculatePrice = (project: Project, options: Record<string, string>) => {
    let total = project.basePrice;

    project.options?.forEach((opt) => {
      const selected = options[opt.id];
      if (!selected) return;

      const value = opt.values.find((v) => v.value === selected);
      if (value) total += value.priceDelta;
    });

    return total;
  };

  const handleAddToCart = () => {
    if (!selectedProject) return;

    const finalPrice = calculatePrice(selectedProject, selectedOptions);

    addToCart({
      id: selectedProject.id,
      name: selectedProject.name,
      price: finalPrice,
      image: selectedProject.image,
      selectedOptions,
    });

    setSelectedProject(null);
    setSelectedOptions({});
  };

  const currentProject =
    projects.length > 0 ? projects[currentProjectIndex] : null;

  return (
    <motion.div
      className={cn("archive w-screen", className)}
      ref={containerRef}
      style={{ backgroundColor: "#fff", minHeight: "100vh" }}
    >
      {showPreview && currentProject && (
        <div className="fixed bottom-10 right-10 z-50 hidden md:block">
          <img
            src={currentProject.image}
            className="w-64 h-64 rounded-3xl shadow-2xl object-cover"
            alt={currentProject.name}
          />
        </div>
      )}

      <div className="flex flex-col gap-4">
        {archiveList.map((project, index) => (
          <div
            key={`${project._virtualId}-${index}`}
            ref={(el) => {
              itemRefs.current[index] = el; // ✅ TS FIX
            }}
            style={{ opacity: index === activeIndex ? 1 : 0.3 }}
            className="px-4 md:px-10 cursor-pointer flex items-center gap-4"
            onClick={() => setSelectedProject(project)}
          >
            {/* MOBILE IMAGE ONLY */}
            <img
              src={project.image}
              alt={project.name}
              className="w-16 h-16 rounded-xl object-cover md:hidden"
            />

            <div className="flex flex-col">
              <h1 className="text-lg md:text-7xl font-semibold">
                {project.name}
              </h1>

              <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
                {project.description}
              </p>

              <p className="text-sm md:text-base font-medium">
                ₹{paiseToRupees(project.basePrice)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <Card className="max-w-md w-full relative">
            <button
              onClick={() => {
                setSelectedProject(null);
                setSelectedOptions({});
              }}
              className="absolute right-3 top-3 text-muted-foreground hover:text-black"
            >
              <X size={20} />
            </button>

            <CardHeader>
              <CardTitle>{selectedProject.name}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {selectedProject.options?.map((opt) => (
                <div key={opt.id}>
                  <label className="text-sm font-medium">{opt.name}</label>
                  <select
                    className="w-full border p-2 rounded-md mt-1"
                    value={selectedOptions[opt.id] || ""}
                    onChange={(e) =>
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [opt.id]: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select</option>
                    {opt.values.map((v) => (
                      <option key={v.value} value={v.value}>
                        {v.value} (+₹{paiseToRupees(v.priceDelta)})
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              <Button className="w-full" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </motion.div>
  );
};

const Skiper24 = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/menu").then((res) => {
      setProjects(
        res.data.items.map((item: Project) => ({
          ...item,
          price: paiseToRupees(item.basePrice),
        }))
      );
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-20">Loading…</div>;

  return <TikTikColorList projects={projects} />;
};

export { Skiper24 };
