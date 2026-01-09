"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  SkiperGradiantCard,
  GradiantCardBody,
  GradiantCardTitle,
} from "@/components/ui/skiper-ui/skiper90";
import { Trash } from "lucide-react";
import api from "@/lib/axios";

const paiseToRupees = (paise: number) => (paise / 100).toFixed(2);

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();

  const subtotalPaise = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const taxPaise = Math.round(subtotalPaise * 0.12);
  const totalPaise = subtotalPaise + taxPaise;

  const handleCheckout = async () => {
    try {
      const res = await api.get("/auth/me");

      if (res.data?.user) {
        router.push("/Checkout/location");
      } else {
        router.push("/Auth?redirect=/Checkout/location");
      }
    } catch {
      router.push("/Auth?redirect=/Checkout/address");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-40">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Your Cart</h1>

        {cartItems.length === 0 && (
          <div className="flex items-center justify-center h-[60vh] text-muted-foreground text-lg">
            Your cart is empty
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-h-[60vh] overflow-y-auto pb-6">
            {cartItems.map((item, index) => (
              <SkiperGradiantCard key={`${item.id}-${index}`}>
                <GradiantCardBody className="p-4 flex flex-col h-full">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />

                  <GradiantCardTitle className="text-lg">
                    {item.name}
                  </GradiantCardTitle>

                  <p className="text-xl font-bold mt-1">
                    ₹{paiseToRupees(item.price)}
                  </p>

                  <div className="flex justify-between items-center mt-auto pt-4">
                    <div className="flex gap-2 items-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - 1,
                            item.selectedOptions
                          )
                        }
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + 1,
                            item.selectedOptions
                          )
                        }
                      >
                        +
                      </Button>
                    </div>

                    <Button
                      size="sm"
                      onClick={() =>
                        removeFromCart(item.id, item.selectedOptions)
                      }
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </GradiantCardBody>
              </SkiperGradiantCard>
            ))}
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-background border-t shadow-lg">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-sm">
              <p>Subtotal: ₹{paiseToRupees(subtotalPaise)}</p>
              <p>Tax: ₹{paiseToRupees(taxPaise)}</p>
              <p className="font-bold">
                Total: ₹{paiseToRupees(totalPaise)}
              </p>
            </div>

            <Button onClick={handleCheckout} size="lg">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
