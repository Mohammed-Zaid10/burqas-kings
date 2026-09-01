import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { inr } from "@/lib/format";
import { useShop } from "@/store/shop";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setQuantity, removeFromCart, totals } = useShop();

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 border-border bg-background p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="label-xs text-left">Your bag ({totals.count})</SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <p className="text-2xl">Your bag is empty</p>
            <p className="text-sm text-muted-foreground">Pieces you add will appear here.</p>
            <Link
              to="/shop"
              onClick={() => setCartOpen(false)}
              className="label-xs mt-2 bg-foreground px-6 py-3 text-background"
            >
              Shop the collection
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {totals.freeShippingRemaining > 0 ? (
                <p className="mb-6 border border-border px-4 py-3 text-xs text-muted-foreground">
                  Add {inr(totals.freeShippingRemaining)} more for complimentary shipping.
                </p>
              ) : (
                <p className="mb-6 border border-border px-4 py-3 text-xs text-muted-foreground">
                  Complimentary shipping unlocked.
                </p>
              )}
              <ul className="space-y-6">
                {cart.map((item) => (
                  <li key={item.key} className="flex gap-4">
                    <img src={item.image} alt={item.name} className="h-32 w-24 shrink-0 object-cover" />
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-3">
                        <div>
                          <p className="text-base">{item.name}</p>
                          <p className="label-xs mt-1 text-muted-foreground">
                            {item.color} · {item.size}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.key)}
                          aria-label={`Remove ${item.name}`}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-border">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            className="px-2 py-1.5 hover:bg-muted"
                            onClick={() => setQuantity(item.key, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-xs">{item.quantity}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            className="px-2 py-1.5 hover:bg-muted"
                            onClick={() => setQuantity(item.key, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm">{inr(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border px-6 py-5">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{inr(totals.subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Taxes and shipping calculated at checkout.</p>
              <div className="mt-5 grid gap-2">
                <Link
                  to="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="label-xs bg-foreground px-6 py-4 text-center text-background transition-opacity hover:opacity-90"
                >
                  Checkout
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setCartOpen(false)}
                  className="label-xs border border-border px-6 py-4 text-center hover:bg-muted"
                >
                  View bag
                </Link>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
