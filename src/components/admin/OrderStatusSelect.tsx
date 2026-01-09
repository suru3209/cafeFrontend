"use client";

import api from "@/lib/axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OrderStatusSelect({
  orderId,
  current,
  onUpdate,
}: any) {
  const updateStatus = async (status: string) => {
    await api.patch(`/admin/orders/${orderId}/status`, { status });
    onUpdate();
  };

  return (
    <Select defaultValue={current} onValueChange={updateStatus}>
      <SelectTrigger className="w-36">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PENDING">Pending</SelectItem>
        <SelectItem value="PREPARING">Preparing</SelectItem>
        <SelectItem value="READY">Ready</SelectItem>
      </SelectContent>
    </Select>
  );
}
