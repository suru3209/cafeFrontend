"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const productRes = await api.get(`/api/admin/products/${id}`);
      const catRes = await api.get("/api/categories");

      setProduct(productRes.data.product);
      setCategories(catRes.data.categories);
      setLoading(false);
    };

    load();
  }, [id]);

  const updateProduct = async () => {
    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("description", product.description || "");
    formData.append("basePrice", String(product.basePrice));
    formData.append("isVeg", String(product.isVeg));
    formData.append("isAvailable", String(product.isAvailable));
    formData.append("categoryId", product.categoryId);
    formData.append("options", JSON.stringify(product.options));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    await api.put(`/api/admin/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Product updated successfully");
    router.push("/admin/products");
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-8 max-w-5xl space-y-6 -mt-20">
      <div className="flex w-20 text-center">
        <Button className="mr-5" onClick={() => router.push("/admin")}>
          <Home />
        </Button>
        <h1 className="text-2xl font-bold">Edit Product</h1>
      </div>

      {/* IMAGE (ONLY ONE) */}
      <div className="space-y-2">
        <p className="font-medium">Product Image</p>

        {product.image && (
          <img
            src={product.image}
            className="w-40 h-40 object-cover rounded border"
            alt="Product"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />
      </div>

      {/* BASIC INFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="border p-2"
          value={product.name}
          placeholder="Product Name"
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />

        <select
          className="border p-2"
          value={product.categoryId}
          onChange={(e) =>
            setProduct({ ...product, categoryId: e.target.value })
          }
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          className="border p-2"
          type="number"
          value={product.basePrice / 100}
          placeholder="Price (₹)"
          onChange={(e) =>
            setProduct({ ...product, basePrice: Number(e.target.value) * 100 })
          }
        />

        <input
          className="border p-2"
          type="number"
          value={product.preparationMins || ""}
          placeholder="Preparation time (mins)"
          onChange={(e) =>
            setProduct({
              ...product,
              preparationMins: Number(e.target.value),
            })
          }
        />
      </div>

      <textarea
        className="border p-2 w-full"
        placeholder="Description"
        value={product.description || ""}
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
      />

      {/* TOGGLES */}
      <div className="flex gap-6">
        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={product.isVeg}
            onChange={(e) =>
              setProduct({ ...product, isVeg: e.target.checked })
            }
          />
          Veg Item
        </label>

        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={product.isAvailable}
            onChange={(e) =>
              setProduct({ ...product, isAvailable: e.target.checked })
            }
          />
          Available
        </label>
      </div>

      {/* MENU OPTIONS */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Menu Options</h2>

        {product.options.map((opt: any, optIndex: number) => (
          <div key={opt.id} className="border p-4 rounded space-y-3">
            <div className="flex gap-3">
              <input
                className="border p-2 flex-1"
                value={opt.name}
                placeholder="Option name"
                onChange={(e) => {
                  const newOpts = [...product.options];
                  newOpts[optIndex].name = e.target.value;
                  setProduct({ ...product, options: newOpts });
                }}
              />

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={opt.required}
                  onChange={(e) => {
                    const newOpts = [...product.options];
                    newOpts[optIndex].required = e.target.checked;
                    setProduct({ ...product, options: newOpts });
                  }}
                />
                Required
              </label>
            </div>

            {opt.values.map((val: any, vIndex: number) => (
              <div key={val.id} className="flex gap-2">
                <input
                  className="border p-2 flex-1"
                  value={val.value}
                  onChange={(e) => {
                    const newOpts = [...product.options];
                    newOpts[optIndex].values[vIndex].value = e.target.value;
                    setProduct({ ...product, options: newOpts });
                  }}
                />

                <input
                  className="border p-2 w-24"
                  type="number"
                  value={val.priceDelta / 100}
                  onChange={(e) => {
                    const newOpts = [...product.options];
                    newOpts[optIndex].values[vIndex].priceDelta =
                      Number(e.target.value) * 100;
                    setProduct({ ...product, options: newOpts });
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <button
        onClick={updateProduct}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}
