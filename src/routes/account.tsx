import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHero } from "@/components/site/Bits";
import { Button, ButtonLink } from "@/components/site/Button";
import { ProductGrid } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { TRACKING_STAGES } from "@/data/content";
import { formatDate, inr } from "@/lib/format";
import { useShop } from "@/store/shop";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your Account — Burqas Kings" },
      { name: "description", content: "Your Burqas Kings orders, saved pieces, addresses, details and preferences in one place." },
      { property: "og:title", content: "Your Account — Burqas Kings" },
      { property: "og:description", content: "Orders, saved pieces, addresses and preferences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountPage,
});

const TABS = ["Overview", "Orders", "Saved", "Addresses", "Details", "Preferences"] as const;

const ADDRESSES = [
  { label: "Home", lines: ["Demo Customer", "12 Atelier Lane", "Mumbai 400001", "+91 00000 00000"], default: true },
  { label: "Work", lines: ["Demo Customer", "4th Floor, Studio House", "Bengaluru 560001", "+91 00000 00000"], default: false },
];

function AccountPage() {
  const { orders, wishlistProducts } = useShop();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Overview");
  const [prefs, setPrefs] = useState({ newsletter: true, drops: true, sms: false });

  const latest = orders[0];

  return (
    <>
      <PageHero
        eyebrow="Account"
        title="Demo Customer"
        copy="This account area uses demo data stored in your browser — no sign-in and no real customer records."
        compact
      />

      <section className="section-y shell grid gap-14 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Account sections" className="flex flex-wrap gap-4 lg:flex-col lg:gap-3">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              aria-current={tab === t}
              className={`label-xs min-h-11 text-left ${tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {t}
            </button>
          ))}
        </nav>

        <Reveal key={tab}>
          {tab === "Overview" ? (
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="border border-border p-8">
                <p className="label-xs text-muted-foreground">Latest order</p>
                {latest ? (
                  <>
                    <h2 className="mt-3 text-2xl">{latest.id}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {TRACKING_STAGES[latest.stage] ?? "Ordered"} · {inr(latest.total)}
                    </p>
                    <ButtonLink to="/track" variant="outline" className="mt-6">
                      Track it
                    </ButtonLink>
                  </>
                ) : (
                  <p className="mt-3 text-sm text-muted-foreground">No orders yet.</p>
                )}
              </div>
              <div className="border border-border p-8">
                <p className="label-xs text-muted-foreground">Saved pieces</p>
                <h2 className="mt-3 text-2xl">{wishlistProducts.length}</h2>
                <ButtonLink to="/wishlist" variant="outline" className="mt-6">
                  View wishlist
                </ButtonLink>
              </div>
            </div>
          ) : null}

          {tab === "Orders" ? (
            <div className="space-y-6">
              {orders.length === 0 ? (
                <p className="text-sm text-muted-foreground">No orders yet.</p>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="flex flex-wrap items-center justify-between gap-6 border border-border p-6">
                    <div>
                      <p className="label-xs text-muted-foreground">{formatDate(order.createdAt)}</p>
                      <p className="mt-2 text-lg">{order.id}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {order.items.length} item(s) · {TRACKING_STAGES[order.stage] ?? "Ordered"}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-lg">{inr(order.total)}</span>
                      <ButtonLink to="/order/$id" params={{ id: order.id }} variant="outline">
                        Details
                      </ButtonLink>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : null}

          {tab === "Saved" ? (
            wishlistProducts.length ? (
              <ProductGrid items={wishlistProducts} />
            ) : (
              <p className="text-sm text-muted-foreground">Nothing saved yet.</p>
            )
          ) : null}

          {tab === "Addresses" ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {ADDRESSES.map((a) => (
                <div key={a.label} className="border border-border p-6 text-sm">
                  <p className="label-xs text-muted-foreground">
                    {a.label}
                    {a.default ? " · Default" : ""}
                  </p>
                  <div className="mt-4 space-y-1 text-muted-foreground">
                    {a.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {tab === "Details" ? (
            <form
              className="max-w-md space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Details saved to this browser only.");
              }}
            >
              {[
                ["Name", "Demo Customer"],
                ["Email", "demo@burqaskings.example"],
                ["Phone", "+91 00000 00000"],
              ].map(([label, value]) => (
                <div key={label}>
                  <label htmlFor={`d-${label}`} className="label-xs text-muted-foreground">{label}</label>
                  <input
                    id={`d-${label}`}
                    defaultValue={value}
                    className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
                  />
                </div>
              ))}
              <Button type="submit">Save details</Button>
            </form>
          ) : null}

          {tab === "Preferences" ? (
            <div className="max-w-md space-y-5">
              {(
                [
                  ["newsletter", "House newsletter"],
                  ["drops", "New collection alerts"],
                  ["sms", "Order updates by SMS"],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="flex min-h-11 items-center justify-between gap-6 border-b border-border pb-4 text-sm">
                  {label}
                  <input
                    type="checkbox"
                    checked={prefs[key]}
                    onChange={(e) => setPrefs({ ...prefs, [key]: e.target.checked })}
                    className="h-4 w-4 accent-current"
                  />
                </label>
              ))}
            </div>
          ) : null}
        </Reveal>
      </section>
    </>
  );
}
