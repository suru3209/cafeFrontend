"use client";

import api from "@/lib/axios";
import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/api/admin/orders").then(res => setOrders(res.data.orders));
  }, []);

  const updateStatus = (id: string, status: string) => {
    api.put(`/api/admin/orders/${id}/status`, { status });
  };

  return (
    <div className="p-10">
      <h2 className="text-xl font-bold">Orders</h2>

      {orders.map((o: any) => (
        <div key={o.id} className="border p-4 my-3">
          <p>{o.user.name}</p>
          <p>Status: {o.status}</p>

          <select onChange={e => updateStatus(o.id, e.target.value)}>
            <option>PENDING</option>
            <option>PREPARING</option>
            <option>READY</option>
          </select>
        </div>
      ))}
    </div>
  );
}
