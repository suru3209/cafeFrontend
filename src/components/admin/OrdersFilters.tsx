"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function OrdersFilters({ onFilter }: any) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  return (
    <div className="flex flex-wrap gap-4">
      <Input
        placeholder="Search customer / item"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-64"
      />

      <Select onValueChange={setStatus}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Order Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="PREPARING">Preparing</SelectItem>
          <SelectItem value="READY">Ready</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={() => onFilter({ search, status })}>
        Apply
      </Button>
    </div>
  );
}
