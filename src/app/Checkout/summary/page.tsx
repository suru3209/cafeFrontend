"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

type Address = {
  id: string;
  label: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
};

export default function OrderSummary() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  /* 🔐 redirect if cart empty */
  useEffect(() => {
    if (!loading && cartItems.length === 0 && !isPlacingOrder) {
      router.replace("/Cart");
    }
  }, [cartItems, loading, isPlacingOrder, router]);

  /* 📍 fetch addresses */
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await api.get("/api/addresses");
        setAddresses(res.data.addresses);

        const def = res.data.addresses.find((a: Address) => a.isDefault);
        if (def) setSelectedAddressId(def.id);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  /* 💰 calculations (price in paise) */
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = Math.round(subtotal * 0.12);
  const delivery = 7000; // ₹70
  const total = subtotal + tax + delivery;

  const paiseToRs = (p: number) => (p / 100).toFixed(2);

  /* 🧾 place order (payment later) */
  const placeOrder = async () => {
    try {
      setIsPlacingOrder(true);

      await api.post("/api/orders", {
        addressId: selectedAddressId,
        items: cartItems.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
          selectedOptions: item.selectedOptions ?? {},
        })),
      });
      clearCart();
      router.push("/Payment");
    } catch (err: any) {
      alert(err.response?.data?.message || "Order failed");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Order Summary</h1>

      {/* 📍 ADDRESS */}
      <Card className="p-4 space-y-3">
        <h2 className="font-medium">Delivery Address</h2>

        {addresses.map((addr) => (
          <label
            key={addr.id}
            className="flex gap-3 cursor-pointer items-start"
          >
            <input
              type="radio"
              checked={selectedAddressId === addr.id}
              onChange={() => setSelectedAddressId(addr.id)}
            />
            <div>
              <p className="font-medium">{addr.label}</p>
              <p className="text-sm text-muted-foreground">
                {addr.address}, {addr.city}, {addr.state} - {addr.zipCode}
              </p>
            </div>
          </label>
        ))}
      </Card>

      {/* 🛒 ITEMS */}
      <Card className="p-4 space-y-4">
        <h2 className="font-medium">Items</h2>

        {cartItems.map((item, idx) => (
          <div key={idx} className="border-b pb-3 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">
                {item.name} × {item.quantity}
              </span>
              <span>₹{paiseToRs(item.price * item.quantity)}</span>
            </div>

            {item.selectedOptions &&
              Object.entries(item.selectedOptions).length > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  Options: {Object.values(item.selectedOptions).join(", ")}
                </p>
              )}

            <p className="text-xs text-muted-foreground mt-1">
              Base price: ₹{paiseToRs(item.price)}
            </p>
          </div>
        ))}
      </Card>

      {/* 💵 BILL */}
      <Card className="p-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{paiseToRs(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax (12%)</span>
          <span>₹{paiseToRs(tax)}</span>
        </div>

        <div className="flex justify-between">
          <span>Delivery</span>
          <span>₹{paiseToRs(delivery)}</span>
        </div>

        <div className="flex justify-between font-semibold border-t pt-2">
          <span>Total</span>
          <span>₹{paiseToRs(total)}</span>
        </div>
      </Card>

      {/* 🚀 PAYMENT */}
      <Button
        className="w-full text-lg py-6"
        disabled={!selectedAddressId}
        onClick={placeOrder}
      >
        Proceed to Payment
      </Button>
    </div>
  );
}
