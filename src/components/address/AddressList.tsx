"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { AddressCard } from "./AddressCard";
import { Button } from "@/components/ui/button";

type Address = {
  id: string;
  label: string;
  address: string;
  isDefault: boolean;
};

export default function AddressList({
  onSelect,
}: {
  onSelect: (addressId: string) => void;
}) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      const res = await api.get("/addresses");
      setAddresses(res.data.addresses);

      const defaultAddr = res.data.addresses.find(
        (a: Address) => a.isDefault
      );
      if (defaultAddr) {
        setSelectedId(defaultAddr.id);
        onSelect(defaultAddr.id);
      }

      setLoading(false);
    };

    fetchAddresses();
  }, [onSelect]);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading addresses...</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Saved Addresses</h3>

      <div className="space-y-3">
        {addresses.map((addr) => (
          <AddressCard
            key={addr.id}
            address={addr}
            selected={selectedId === addr.id}
            onSelect={() => {
              setSelectedId(addr.id);
              onSelect(addr.id);
            }}
          />
        ))}
      </div>

      <Button
        variant="outline"
        className="w-full mt-4"
        onClick={() => {
          // later → redirect to map/location page
          window.location.href = "/Checkout/location";
        }}
      >
        + Add New Address
      </Button>
    </div>
  );
}
