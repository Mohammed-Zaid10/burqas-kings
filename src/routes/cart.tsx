import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Crumbs, Empty, PageHero } from "@/components/site/Bits";
import { Button, ButtonLink } from "@/components/site/Button";
import { PROMO_CODES, SHIPPING } from "@/data/content";
import { inr } from "@/lib/format";
import { useShop } from "@/store/shop";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — Burqas Kings" },
      { name: "description", content: "Review the pieces in your Burqas Kings bag, apply a promo code and continue to checkout." },
      { property: "og:title", content: "Your Bag — Burqas Kings" },
      { property: "og:description", content: "Review your bag and continue to checkout." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, setQuantity, removeFromCart, totals, promo, applyPromo, clearPromo } = useShop();
  const [code, setCode] = useState("");

  return (
    <div className="page-enter">
      <PageHero eyebrow="Checkout" title="Your bag" compact />
      <div className="shell py-10 pb-24">
        <Crumbs items={[{ label: "Home", to: "/" }, { label: "Bag" }]} />

        {cart.length === 0 ? (
          <div className="mt-12">
            <Empty
              title="Your bag is empty"
              copy="Nothing set aside yet — the catalogue is a good place to start."
              action={<ButtonLink to="/shop" variant="outline">Shop all pieces</ButtonLink>}
            />
          </div>
        ) : (
          <div className="mt-12 grid gap-14 lg:grid-cols-[1.6fr_1fr]">
            <ul className="divide-y divide-border border-y border-border">
              {cart.map((item) => (
                <li key={item.key} className="flex gap-5 py-6">
                  <Link to="/product/$slug" params={{ slug: item.slug }} className="shrink-0">
                    <img src={item.image} alt={item.name} className="h-36 w-28 object-cover" loading="lazy" />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-xl">
                          <Link to="/product/$slug" params={{ slug: item.slug }} className="rule-link">
                            {item.name}
                          </Link>
                        </h2>
                        <p className="label-xs mt-2 text-muted-foreground">
                          {item.color} · Size {item.size}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.key)}
                        aria-label={`Remove ${item.name}`}
                        className="grid h-11 w-11 place-items-center"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          className="grid h-11 w-11 place-items-center"
                          onClick={() => setQuantity(item.key, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-10 text-center text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          className="grid h-11 w-11 place-items-center"
                          onClick={() => setQuantity(item.key, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm">{inr(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="border border-border p-7">
                <h2 className="text-2xl">Summary</h2>

                <form
                  className="mt-7"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const result = applyPromo(code);
                    result.ok ? toast.success(result.message) : toast.error(result.message);
                    if (result.ok) setCode("");
                  }}
                >
                  <label htmlFor="promo" className="label-xs">
                    Promo code
                  </label>
                  <div className="mt-3 flex gap-2">
                    <input
                      id="promo"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="WELCOME10"
                      className="min-h-11 w-full border border-border bg-background px-3 text-sm"
                    />
                    <Button type="submit" variant="outline">
                      Apply
                    </Button>
                  </div>
                  {promo ? (
                    <p className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {promo} — {PROMO_CODES[promo]?.label}
                      </span>
                      <button type="button" onClick={clearPromo} className="rule-link">
                        Remove
                      </button>
                    </p>
                  ) : null}
                </form>

                <dl className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
                  <Row label="Subtotal" value={inr(totals.subtotal)} />
                  {totals.discount ? <Row label="Discount" value={`− ${inr(totals.discount)}`} /> : null}
                  <Row label="Shipping" value={totals.shipping ? inr(totals.shipping) : "Complimentary"} />
                  <Row label="Tax (5%)" value={inr(totals.tax)} />
                  <div className="flex justify-between border-t border-border pt-4 text-base">
                    <dt>Total</dt>
                    <dd>{inr(totals.total)}</dd>
                  </div>
                </dl>

                {totals.freeShippingRemaining > 0 ? (
                  <p className="mt-5 text-xs text-muted-foreground">
                    Add {inr(totals.freeShippingRemaining)} more for complimentary shipping (over{" "}
                    {inr(SHIPPING.freeThreshold)}).
                  </p>
                ) : null}

                <ButtonLink to="/checkout" size="lg" className="mt-8 w-full">
                  Continue to checkout
                </ButtonLink>
                <ButtonLink to="/shop" variant="ghost" className="mt-2 w-full">
                  Keep shopping
                </ButtonLink>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <dt>{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}
