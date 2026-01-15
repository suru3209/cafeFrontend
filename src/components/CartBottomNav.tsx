"use client";

import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const CartBottomNav = () => {
  const { getTotalItems } = useCart();
  const router = useRouter();
  const totalItems = getTotalItems();

  if (totalItems === 0) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      className="fixed bottom-0 left-0 w-full md:left-1/2 md:-translate-x-1/2 md:w-auto z-100 px-2 md:px-0"
    >
      <Card className="shadow-lg border bg-background/95 rounded-4xl backdrop-blur supports-backdrop-filter:bg-background/60 w-full md:w-auto">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-base font-semibold">
            {totalItems} item{totalItems > 1 ? "s" : ""}
          </span>

          <Button onClick={() => router.push("/Cart")} size="lg">
            Go to Cart
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
