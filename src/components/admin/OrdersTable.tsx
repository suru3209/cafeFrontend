"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import OrderStatusSelect from "./OrderStatusSelect";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrdersTable({ orders, refresh, loading }: any) {
  if (loading) {
    return <Skeleton className="h-40 w-full rounded-lg" />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Update</TableHead>
          <TableHead>Invoice</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.map((order: any) => (
          <TableRow key={order.id}>
            <TableCell>{order.id.slice(0, 8)}</TableCell>
            <TableCell>{order.user.name}</TableCell>
            <TableCell>₹{order.total}</TableCell>

            <TableCell>
              <Badge variant="outline">{order.status}</Badge>
            </TableCell>

            <TableCell>
              <OrderStatusSelect
                orderId={order.id}
                current={order.status}
                onUpdate={refresh}
              />
            </TableCell>

            <TableCell>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(
                    `http://localhost:8080/api/invoice/${order.id}`,
                    "_blank"
                  )
                }
              >
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
