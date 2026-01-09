"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

type Props = {
  address: {
    id: string;
    label: string;
    address: string;
    isDefault: boolean;
  };
  selected: boolean;
  onSelect: () => void;
};

export function AddressCard({ address, selected, onSelect }: Props) {
  return (
    <Card
      onClick={onSelect}
      className={cn(
        "cursor-pointer border p-4 transition-all",
        selected
          ? "border-primary ring-2 ring-primary/30"
          : "hover:border-muted-foreground"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">{address.label}</h4>
            {address.isDefault && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                Default
              </span>
            )}
          </div>

          <p className="text-sm text-muted-foreground mt-1">
            {address.address}
          </p>
        </div>

        {selected && (
          <CheckCircle className="text-primary shrink-0" />
        )}
      </div>
    </Card>
  );
}
