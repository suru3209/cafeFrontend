"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function AddProductPage() {
  const router = useRouter();

  const [categories, setCategories] = useState<any[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [product, setProduct] = useState<any>({
    name: "",
    description: "",
    basePrice: 0,
    preparationMins: "",
    isVeg: false,
    isAvailable: true,
    categoryId: "",
    options: [
      {
        name: "",
        required: false,
        values: [{ value: "", priceDelta: 0 }],
      },
    ],
  });

  useEffect(() => {
    api.get("/api/categories").then((res) => {
      setCategories(res.data.categories);
      if (res.data.categories.length > 0) {
        setProduct((p: any) => ({
          ...p,
          categoryId: res.data.categories[0].id,
        }));
      }
    });
  }, []);

  const addProduct = async () => {
    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("basePrice", product.basePrice);
    formData.append("isVeg", product.isVeg);
    formData.append("isAvailable", product.isAvailable);
    formData.append("categoryId", product.categoryId);
    formData.append("options", JSON.stringify(product.options));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    await api.post("/api/admin/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Product added successfully");
    router.push("/Admin/products");
  };

  return (
    <div className="p-8 max-w-5xl space-y-6 -mt-20">
      <div className="flex w-20 text-center">
        <Button className="mr-5" onClick={() => router.push("/Admin")}>
          <Home />
        </Button>
        <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      </div>

      {/* IMAGE */}
      <div className="space-y-2">
        <p className="font-medium">Product Image</p>
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
          placeholder="Product Name"
          value={product.name}
          onChange={(e) =>
            setProduct({ ...product, name: e.target.value })
          }
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
          placeholder="Price (₹)"
          onChange={(e) =>
            setProduct({
              ...product,
              basePrice: Number(e.target.value) * 100,
            })
          }
        />

        <input
          className="border p-2"
          type="number"
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
        value={product.description}
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
              setProduct({
                ...product,
                isAvailable: e.target.checked,
              })
            }
          />
          Available
        </label>
      </div>

      {/* MENU OPTIONS */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Menu Options</h2>

        {product.options.map((opt: any, optIndex: number) => (
          <div key={optIndex} className="border p-4 rounded space-y-3">

            <div className="flex gap-3">
              <input
                className="border p-2 flex-1"
                placeholder="Option name (Size, Milk...)"
                value={opt.name}
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
              <div key={vIndex} className="flex gap-2">
                <input
                  className="border p-2 flex-1"
                  placeholder="Value (Small, Large)"
                  value={val.value}
                  onChange={(e) => {
                    const newOpts = [...product.options];
                    newOpts[optIndex].values[vIndex].value =
                      e.target.value;
                    setProduct({ ...product, options: newOpts });
                  }}
                />

                <input
                  className="border p-2 w-24"
                  type="number"
                  placeholder="+₹"
                  onChange={(e) => {
                    const newOpts = [...product.options];
                    newOpts[optIndex].values[vIndex].priceDelta =
                      Number(e.target.value) * 100;
                    setProduct({ ...product, options: newOpts });
                  }}
                />
              </div>
            ))}

            <button
              onClick={() => {
                const newOpts = [...product.options];
                newOpts[optIndex].values.push({
                  value: "",
                  priceDelta: 0,
                });
                setProduct({ ...product, options: newOpts });
              }}
              className="text-sm underline"
            >
              + Add Value
            </button>
          </div>
        ))}

        <button
          onClick={() =>
            setProduct({
              ...product,
              options: [
                ...product.options,
                {
                  name: "",
                  required: false,
                  values: [{ value: "", priceDelta: 0 }],
                },
              ],
            })
          }
          className="text-sm underline"
        >
          + Add Option
        </button>
      </div>

      <button
        onClick={addProduct}
        className="bg-black text-white px-6 py-3 rounded"
      >
        Save Product
      </button>
    </div>
  );
}
