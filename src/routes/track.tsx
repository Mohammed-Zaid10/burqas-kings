import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/Bits";
import { Button, ButtonLink } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { TRACKING_STAGES } from "@/data/content";
import { inr, formatDate } from "@/lib/format";
import { useShop } from "@/store/shop";
import type { Order } from "@/store/shop";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track Your Order — Burqas Kings" },
      { name: "description", content: "Enter your order number to follow your Burqas Kings parcel from the atelier to your door." },
      { property: "og:title", content: "Track Your Order — Burqas Kings" },
      { property: "og:description", content: "Follow your parcel from the atelier to your door." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrackPage,
});

function TrackPage() {
  const { orders } = useShop();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Order | null>(null);
  const [error, setError] = useState("");

  const lookup = () => {
    const found = orders.find((o) => o.id.toLowerCase() === query.trim().toLowerCase());
    setResult(found ?? null);
    setError(found ? "" : "No order found with that number. Order numbers look like BK-2026-1042.");
  };

  return (
    <>
      <PageHero eyebrow="Track order" title="Where is my parcel?" copy="Tracking is simulated on this demo store using orders placed in this browser." compact />

      <section className="section-y shell max-w-3xl">
        <Reveal>
          <form
            className="flex flex-col gap-4 sm:flex-row sm:items-end"
            onSubmit={(e) => {
              e.preventDefault();
              lookup();
            }}
          >
            <div className="flex-1">
              <label htmlFor="order-id" className="label-xs text-muted-foreground">Order number</label>
              <input
                id="order-id"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="BK-2026-1042"
                className="mt-2 w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-foreground"
              />
            </div>
            <Button type="submit">Track</Button>
          </form>
          {error ? <p className="mt-4 text-sm text-muted-foreground">{error}</p> : null}
        </Reveal>

        {result ? (
          <Reveal className="mt-16">
            <div className="border border-border p-8">
              <p className="label-xs text-muted-foreground">Order {result.id}</p>
              <h2 className="mt-3 text-3xl">{TRACKING_STAGES[result.stage] ?? "Ordered"}</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Placed {formatDate(result.createdAt)} · Estimated delivery {result.estimatedDelivery}
              </p>

              <ol className="mt-10 space-y-5">
                {TRACKING_STAGES.map((stage, i) => {
                  const done = i <= result.stage;
                  return (
                    <li key={stage} className="flex items-center gap-4 text-sm">
                      <span
                        aria-hidden
                        className={`h-2 w-2 rounded-full ${done ? "bg-foreground" : "bg-border"}`}
                      />
                      <span className={done ? "text-foreground" : "text-muted-foreground"}>{stage}</span>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-10 border-t border-border pt-6 text-sm">
                <p className="text-muted-foreground">{result.items.length} item(s) · {inr(result.total)}</p>
              </div>
            </div>
          </Reveal>
        ) : null}

        <div className="mt-14 flex flex-wrap gap-4">
          <ButtonLink to="/account" variant="outline">
            View your orders
          </ButtonLink>
          <ButtonLink to="/contact" variant="ghost">
            Need help?
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
