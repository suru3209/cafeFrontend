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
      className=" fixed bottom-4 left-1/2 transform -translate-x-1/2 z-100"
    >
      <Card className="shadow-lg border bg-background/95 rounded-4xl backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="text-center justify-between px-6">
          <div className="items-center space-x-2">
            <span className="text-lg  font-semibold text-foreground">
              {totalItems} item{totalItems > 1 ? "s" : ""}
            </span>
          </div>
          <Button
            onClick={() => router.push("/Cart")}
            className="font-medium"
            size="lg"
          >
            Go to Cart
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
