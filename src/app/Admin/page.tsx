"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { socket } from "@/lib/socket";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import OrdersTable from "@/components/admin/OrdersTable";
import OrdersFilters from "@/components/admin/OrdersFilters";

export default function AdminPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch orders (with filters)
  const fetchOrders = async (filters = {}) => {
    try {
      const res = await api.get("/admin/orders", { params: filters });
      setOrders(res.data.orders);
    } catch (error) {
      console.error("Admin access denied", error);
      window.location.href = "/";
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Initial fetch
  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔥 REAL-TIME: listen for new orders
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("🟢 Admin socket connected");
    });

    socket.on("new-order", (data) => {
      console.log("🆕 New order received", data);
      fetchOrders(); // refresh table instantly
    });

    return () => {
      socket.off("new-order");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="p-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Admin Dashboard
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Filters */}
          <OrdersFilters onFilter={fetchOrders} />

          <Separator className="my-4" />

          {/* Orders Table */}
          <OrdersTable
            orders={orders}
            refresh={fetchOrders}
            loading={loading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
