import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Crumbs, Empty, PageHero } from "@/components/site/Bits";
import { Button, ButtonLink } from "@/components/site/Button";
import { GoogleSignIn } from "@/components/site/GoogleSignIn";
import { useAuthSession } from "@/hooks/useAuthSession";
import { inr } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useShop } from "@/store/shop";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Burqas Kings" },
      { name: "description", content: "Complete your Burqas Kings order: contact, delivery and payment." },
      { property: "og:title", content: "Checkout — Burqas Kings" },
      { property: "og:description", content: "Complete your Burqas Kings order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const STEPS = ["Contact", "Delivery", "Payment"] as const;

/**
 * Payment is simulated. To go live, replace `submit()` with a call to a
 * server function that creates a Razorpay / Stripe order and confirm on callback.
 */
const PAYMENT_METHODS = ["UPI", "Card", "Netbanking", "Cash on delivery"];

function CheckoutPage() {
  const { cart, totals, placeOrder } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({
    email: "",
    phone: "",
    name: "",
    address: "",
    city: "",
    pincode: "",
    payment: "UPI",
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  if (cart.length === 0) {
    return (
      <div className="page-enter shell py-24">
        <Empty
          title="Nothing to check out"
          copy="Your bag is empty — add a piece and come back."
          action={<ButtonLink to="/shop" variant="outline">Shop all pieces</ButtonLink>}
        />
      </div>
    );
  }

  const validateStep = () => {
    if (step === 0) {
      if (!form.email.includes("@") || form.phone.length < 8) {
        toast.error("Enter a valid email and phone number.");
        return false;
      }
    }
    if (step === 1) {
      if (!form.name || !form.address || !form.city || form.pincode.length < 5) {
        toast.error("Complete your delivery details.");
        return false;
      }
    }
    return true;
  };

  const submit = () => {
    setProcessing(true);
    // Simulated payment — no real charge is made.
    window.setTimeout(() => {
      const order = placeOrder({
        email: form.email,
        name: form.name,
        address: `${form.address}, ${form.city} ${form.pincode}`,
        paymentMethod: form.payment,
      });
      setProcessing(false);
      toast.success("Order placed (demo payment — no charge was made).");
      navigate({ to: "/order/$id", params: { id: order.id } });
    }, 1200);
  };

  return (
    <div className="page-enter">
      <PageHero eyebrow="Secure checkout" title="Checkout" compact />
      <div className="shell py-10 pb-24">
        <Crumbs items={[{ label: "Home", to: "/" }, { label: "Bag", to: "/cart" }, { label: "Checkout" }]} />

        <div className="mt-12 grid gap-14 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <ol className="flex gap-6 border-b border-border pb-5">
              {STEPS.map((s, i) => (
                <li
                  key={s}
                  className={cn("label-xs", i === step ? "text-foreground" : "text-muted-foreground")}
                >
                  {String(i + 1).padStart(2, "0")} {s}
                </li>
              ))}
            </ol>

            <div className="mt-10 space-y-5">
              {step === 0 ? (
                <>
                  <Field id="email" label="Email" type="email" value={form.email} onChange={set("email")} />
                  <Field id="phone" label="Phone" type="tel" value={form.phone} onChange={set("phone")} />
                </>
              ) : null}

              {step === 1 ? (
                <>
                  <Field id="name" label="Full name" value={form.name} onChange={set("name")} />
                  <Field id="address" label="Address" value={form.address} onChange={set("address")} />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="city" label="City" value={form.city} onChange={set("city")} />
                    <Field id="pincode" label="PIN code" value={form.pincode} onChange={set("pincode")} />
                  </div>
                </>
              ) : null}

              {step === 2 ? (
                <div>
                  <p className="label-xs">Payment method</p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {PAYMENT_METHODS.map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, payment: method }))}
                        aria-pressed={form.payment === method}
                        className={cn(
                          "min-h-12 border px-4 text-sm",
                          form.payment === method ? "border-foreground bg-foreground text-background" : "border-border",
                        )}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                  <p className="mt-6 text-xs text-muted-foreground">
                    This is a demo checkout. No payment is processed and no card details are collected — the
                    flow is wired so a real Razorpay or Stripe integration can replace this step.
                  </p>
                </div>
              ) : null}
            </div>

            <div className="mt-10 flex gap-3">
              {step > 0 ? (
                <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
                  Back
                </Button>
              ) : null}
              {step < 2 ? (
                <Button
                  onClick={() => {
                    if (validateStep()) setStep((s) => s + 1);
                  }}
                >
                  Continue
                </Button>
              ) : (
                <Button size="lg" onClick={submit} disabled={processing}>
                  {processing ? "Processing…" : `Place order — ${inr(totals.total)}`}
                </Button>
              )}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-border p-7">
              <h2 className="text-2xl">Order summary</h2>
              <ul className="mt-6 space-y-4">
                {cart.map((item) => (
                  <li key={item.key} className="flex gap-4">
                    <img src={item.image} alt="" className="h-20 w-16 object-cover" loading="lazy" />
                    <div className="flex-1 text-sm">
                      <p>{item.name}</p>
                      <p className="label-xs mt-1 text-muted-foreground">
                        {item.color} · {item.size} · ×{item.quantity}
                      </p>
                    </div>
                    <p className="text-sm">{inr(item.price * item.quantity)}</p>
                  </li>
                ))}
              </ul>
              <dl className="mt-7 space-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="text-foreground">{inr(totals.subtotal)}</dd>
                </div>
                {totals.discount ? (
                  <div className="flex justify-between">
                    <dt>Discount</dt>
                    <dd className="text-foreground">− {inr(totals.discount)}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd className="text-foreground">{totals.shipping ? inr(totals.shipping) : "Complimentary"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Tax</dt>
                  <dd className="text-foreground">{inr(totals.tax)}</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-4 text-base text-foreground">
                  <dt>Total</dt>
                  <dd>{inr(totals.total)}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="label-xs">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-3 min-h-12 w-full border border-border bg-background px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  );
}
