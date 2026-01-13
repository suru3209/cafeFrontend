"use client";

import api from "@/lib/axios";
import { useEffect, useState } from "react";
import {
  UserPen,
  MapPin,
  ChevronDown,
  Pencil,
  Trash,
  X,
  Download,
} from "lucide-react";
import { useRouter } from "next/navigation";

/* ================= TYPES ================= */

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  selectedOptions: Record<string, string>;
  menuItem: { name: string };
};

type Order = {
  id: string;
  subtotal: number;
  tax: number;
  delivery: number;
  total: number;
  status: string;
  createdAt: string;
  address: {
    label: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: OrderItem[];
};

type Address = {
  id: string;
  label: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
};

/* ================= HELPERS ================= */

const rs = (p: number) => `₹${Math.round(p / 100).toFixed(2)}`;

/* ================= PAGE ================= */

export default function Profile() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);

  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const [editAddress, setEditAddress] = useState<Address | null>(null);
  const [addrForm, setAddrForm] = useState({
    label: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  /* ================= FETCH ================= */

  useEffect(() => {
    const init = async () => {
      try {
        const me = await api.get("/api/auth/me");

        if (!me.data?.user) {
          console.log("No user, redirecting...");
          return router.push("/");
        }

        setUser(me.data.user);
      } catch (err) {
        console.error("Auth check failed:", err);
        router.push("/");
      }
    };

    init();
  }, [router]);

  /* ================= PROFILE UPDATE ================= */

  const handleSaveProfile = async () => {
    const res = await api.put("/api/user/update-profile", formData);
    setUser(res.data.user);
    setEditMode(false);
  };

  /* ================= ADDRESS ================= */

  const handleDeleteAddress = async (id: string) => {
    if (!confirm("Delete this address?")) return;

    try {
      await api.delete(`/api/addresses/${id}`);
      setAddresses((p) => p.filter((a) => a.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || "Cannot delete this address");
    }
  };

  const handleUpdateAddress = async () => {
    if (!editAddress) return;

    const res = await api.put(`/api/addresses/${editAddress.id}`, addrForm);

    setAddresses((p) =>
      p.map((a) => (a.id === editAddress.id ? res.data.address : a))
    );

    setEditAddress(null);
  };

  if (!user) return null;

  /* ================= UI ================= */

  return (
    <div className="w-full -mt-2">
      {/* HERO */}
      <div className="relative h-[280px] bg-[url('/images/profilepic.jpeg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* PROFILE */}
      <div className="relative px-6 md:px-20">
        <div className="absolute -top-16 left-6 md:left-20">
          <img
            src="/images/logo.png"
            alt="Profile"
            className="w-28 h-28 md:w-32 md:h-32 rounded-full shadow-lg"
          />
        </div>

        <div className="pt-20 flex justify-between items-start">
          <div>
            {!editMode ? (
              <>
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </>
            ) : (
              <div className="space-y-3">
                <input
                  className="border-b w-full"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  className="border-b w-full"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <div className="flex gap-4">
                  <button onClick={handleSaveProfile}>Save</button>
                  <button onClick={() => setEditMode(false)}>Cancel</button>
                </div>
              </div>
            )}
          </div>

          {!editMode && (
            <button onClick={() => setEditMode(true)}>
              <UserPen />
            </button>
          )}
        </div>
      </div>

      {/* ORDERS + ADDRESSES */}
      <div className="mt-12 px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* ORDERS */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Orders</h3>

          {orders.map((order) => {
            const open = expandedOrder === order.id;

            return (
              <div key={order.id} className="border rounded-xl overflow-hidden">
                <button
                  className="w-full flex justify-between items-center p-4"
                  onClick={() => setExpandedOrder(open ? null : order.id)}
                >
                  <div className="text-left">
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toDateString()}
                    </p>
                    <p className="font-medium">{order.status}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{rs(order.total)}</span>
                    <ChevronDown
                      size={18}
                      className={`transition ${open ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                {open && (
                  <div className="border-t p-4 text-sm space-y-4">
                    {/* ADDRESS */}
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="font-medium">Delivery Address</p>
                      <p className="text-gray-600">
                        {order.address.label} <br />
                        {order.address.address}, {order.address.city},{" "}
                        {order.address.state} - {order.address.zipCode}
                      </p>
                    </div>

                    {/* ITEMS */}
                    {order.items.map((item) => (
                      <div key={item.id}>
                        <div className="flex justify-between">
                          <span>
                            {item.menuItem.name} × {item.quantity}
                          </span>
                          <span>{rs(item.price * item.quantity)}</span>
                        </div>

                        {Object.keys(item.selectedOptions || {}).length > 0 && (
                          <p className="text-xs text-gray-500">
                            {Object.values(item.selectedOptions).join(", ")}
                          </p>
                        )}
                      </div>
                    ))}

                    {/* BILL */}
                    <div className="border-t pt-2 space-y-1">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{rs(order.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>{rs(order.tax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery</span>
                        <span>{rs(order.delivery)}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>{rs(order.total)}</span>
                      </div>
                    </div>

                    {/* INVOICE */}
                    <a
                      href={`${process.env.NEXT_PUBLIC_API_URL}/api/invoice/${order.id}`}
                      target="_blank"
                      className="flex items-center gap-2 text-blue-600 text-sm font-medium"
                    >
                      <Download size={16} /> Download Invoice
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ADDRESSES */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Saved Addresses</h3>

          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="border rounded-xl p-4 flex justify-between"
            >
              <div className="flex gap-3">
                <MapPin size={18} className="mt-1" />
                <div>
                  <p className="font-medium">{addr.label}</p>
                  <p className="text-sm text-gray-500">
                    {addr.address}, {addr.city}, {addr.state} - {addr.zipCode}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditAddress(addr);
                    setAddrForm({
                      label: addr.label,
                      address: addr.address,
                      city: addr.city,
                      state: addr.state,
                      zipCode: addr.zipCode,
                    });
                  }}
                >
                  <Pencil size={16} />
                </button>

                <button onClick={() => handleDeleteAddress(addr.id)}>
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDIT ADDRESS MODAL */}
      {editAddress && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-3">
            <div className="flex justify-between">
              <h4 className="font-semibold">Edit Address</h4>
              <button onClick={() => setEditAddress(null)}>
                <X size={18} />
              </button>
            </div>

            {["label", "address", "city", "state", "zipCode"].map((f) => (
              <input
                key={f}
                placeholder={f}
                className="border p-2 w-full rounded"
                value={(addrForm as any)[f]}
                onChange={(e) =>
                  setAddrForm({ ...addrForm, [f]: e.target.value })
                }
              />
            ))}

            <div className="flex justify-end gap-4">
              <button onClick={() => setEditAddress(null)}>Cancel</button>
              <button onClick={handleUpdateAddress}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
