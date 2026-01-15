"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { ChevronDown } from "lucide-react";

export default function AdminPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Admin Auth Check
  useEffect(() => {
    api
      .get("/api/auth/me")
      .then((res) => {
        if (res.data.user?.role !== "ADMIN") {
          router.push("/Admin/Login");
        } else {
          fetchOrders();
        }
      })
      .catch(() => router.push("/Admin/Login"));
  }, []);

  // Fetch Orders with Search & Filter
  const fetchOrders = async () => {
    const res = await api.get("/api/admin/orders", {
      params: { search, status },
    });
    setOrders(res.data.orders);
    setLoading(false);
  };

  // Auto refresh on filter change
  useEffect(() => {
    fetchOrders();
  }, [search, status]);

  // Update Order Status
  const updateStatus = async (id: string, newStatus: string) => {
    await api.put(`/api/admin/orders/${id}/status`, { status: newStatus });
    fetchOrders();
  };

  // Logout
  const logout = async () => {
    await api.post("/api/auth/logout");
    router.push("/Admin/Login");
  };

  if (loading) {
    return <div className="p-10">Loading Admin Panel...</div>;
  }

  return (
    <div className="flex h-screen -mt-20">

      {/* ================= SIDEBAR ================= */}
      <div className="w-64 bg-black text-white flex flex-col justify-between p-4">
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Admin Panel</h2>

          <button
            onClick={() => router.push("/Admin")}
            className="block w-full text-left hover:text-gray-300"
          >
            Orders
          </button>

          <button
            onClick={() => router.push("/Admin/products")}
            className="block w-full text-left hover:text-gray-300"
          >
            Products
          </button>

          <button
            onClick={() => router.push("/Admin/products/add")}
            className="block w-full text-left hover:text-gray-300"
          >
            Add Product
          </button>
        </div>

        <button
          onClick={logout}
          className="bg-red-600 py-2 rounded text-center hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* ================= MAIN AREA ================= */}
      <div className="flex flex-col flex-1">

        {/* TOP BAR */}
        <div className="p-4 border-b flex gap-3 bg-white">
          <input
            placeholder="Search item name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded w-60"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">All</option>
            <option value="PENDING">Pending</option>
            <option value="PREPARING">Preparing</option>
            <option value="READY">Ready</option>
          </select>

          <button
            onClick={fetchOrders}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>

        {/* ORDERS AREA */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <h1 className="text-2xl font-bold mb-4">Orders</h1>

          {orders.map((o) => {
            const subtotal = o.total / 100;
            const tax = subtotal * 0.12;
            const delivery = 70;
            const finalTotal = subtotal + tax + delivery;

            return (
              <div key={o.id} className="bg-white p-4 rounded mb-4 shadow">

                <div className="flex justify-between items-center">
                  <div>
                    <p><b>User:</b> {o.user.name}</p>
                    <p><b>Order ID:</b> {o.id}</p>
                    <p><b>Total:</b> ₹{subtotal.toFixed(2)}</p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <select
                      value={o.status}
                      onChange={(e) =>
                        updateStatus(o.id, e.target.value)
                      }
                      className="border px-2 py-1"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="PREPARING">Preparing</option>
                      <option value="READY">Ready</option>
                    </select>

                    {/* Invoice */}
                    <button
                      onClick={() =>
                        window.open(
                          `${process.env.NEXT_PUBLIC_API_URL}/api/invoice/${o.id}`,
                          "_blank"
                        )
                      }
                      className="border px-3 py-1"
                    >
                      Invoice
                    </button>

                    {/* Expand */}
                    <button
                      onClick={() =>
                        setOpenId(openId === o.id ? null : o.id)
                      }
                      className="border p-1"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>
                </div>

                {/* EXPAND DETAILS */}
                {openId === o.id && (
                  <div className="mt-3 border-t pt-3 text-sm space-y-1">
                    {o.items.map((item: any) => (
                      <p key={item.id}>
                        {item.menuItem.name} (ID: {item.menuItem.id}) × {item.quantity}
                      </p>
                    ))}

                    <hr />

                    
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
