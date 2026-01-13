"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
  SkiperGradiantCard,
  GradiantCardBody,
  GradiantCardTitle,
} from "@/components/ui/skiper-ui/skiper90";
import { SquarePen, X, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();

  const fetchProducts = async () => {
    const res = await api.get("/api/admin/products");
    setProducts(res.data.products);
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await api.delete(`/api/admin/products/${id}`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-8 -mt-20">
      <div className="flex w-20 text-center">
        <Button className="mr-5" onClick={() => router.push("/admin")}>
          <Home />
        </Button>
        <h1 className="text-2xl font-bold mb-6">Products</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <SkiperGradiantCard key={p.id}>
            <GradiantCardBody className="p-4 flex flex-col h-full">
              {p.image && (
                <img
                  src={p.image}
                  className="h-40 w-full object-cover rounded-lg mb-3"
                />
              )}

              <GradiantCardTitle>{p.name}</GradiantCardTitle>

              <p className="text-sm text-gray-500">
                ₹{(p.basePrice / 100).toFixed(2)}
              </p>

              <p className="text-xs mt-1">
                {p.isVeg ? "🌱 Veg" : "🍗 Non-Veg"}
              </p>

              <div className="flex justify-between mt-auto pt-4">
                <button
                  onClick={() => router.push(`/admin/products/edit/${p.id}`)}
                  className="p-5"
                >
                  <SquarePen size={18} />
                </button>

                <button onClick={() => deleteProduct(p.id)} className="p-5">
                  <X size={18} />
                </button>
              </div>
            </GradiantCardBody>
          </SkiperGradiantCard>
        ))}
      </div>
    </div>
  );
}
