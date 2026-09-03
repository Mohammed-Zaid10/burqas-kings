import { createFileRoute } from "@tanstack/react-router";
import { Crumbs, Empty, PageHero } from "@/components/site/Bits";
import { ButtonLink } from "@/components/site/Button";
import { TRACKING_STAGES } from "@/data/content";
import { formatDate, inr } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useShop } from "@/store/shop";

export const Route = createFileRoute("/order/$id")({
  head: () => ({
    meta: [
      { title: "Order Confirmed — Burqas Kings" },
      { name: "description", content: "Your Burqas Kings order confirmation and delivery estimate." },
      { property: "og:title", content: "Order Confirmed — Burqas Kings" },
      { property: "og:description", content: "Your order confirmation and delivery estimate." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderPage,
});

function OrderPage() {
  const { id } = Route.useParams();
  const { orders, hydrated } = useShop();
  const order = orders.find((o) => o.id === id);

  if (!hydrated) {
    return <div className="shell py-24 text-sm text-muted-foreground">Loading your order…</div>;
  }

  if (!order) {
    return (
      <div className="page-enter shell py-24">
        <Empty
          title="Order not found"
          copy={`We couldn't find order ${id} on this device.`}
          action={<ButtonLink to="/track" variant="outline">Track an order</ButtonLink>}
        />
      </div>
    );
  }

  return (
    <div className="page-enter">
      <PageHero eyebrow="Thank you" title="Order confirmed" copy={`Order ${order.id}`} compact />
      <div className="shell py-10 pb-24">
        <Crumbs items={[{ label: "Home", to: "/" }, { label: "Order" }]} />

        <div className="mt-12 grid gap-14 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A confirmation has been prepared for {order.email}. This is a demo store — no payment was taken
              and nothing will ship.
            </p>

            <ol className="mt-10 space-y-4">
              {TRACKING_STAGES.map((stage, i) => (
                <li key={stage} className="flex items-center gap-4">
                  <span
                    className={cn(
                      "grid h-8 w-8 place-items-center rounded-full border text-xs",
                      i < order.stage ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className={cn("text-sm", i < order.stage ? "text-foreground" : "text-muted-foreground")}>
                    {stage}
                  </span>
                </li>
              ))}
            </ol>

            <ul className="mt-12 divide-y divide-border border-y border-border">
              {order.items.map((item) => (
                <li key={item.key} className="flex gap-4 py-5">
                  <img src={item.image} alt="" className="h-24 w-20 object-cover" loading="lazy" />
                  <div className="flex-1 text-sm">
                    <p className="text-lg">{item.name}</p>
                    <p className="label-xs mt-1 text-muted-foreground">
                      {item.color} · {item.size} · ×{item.quantity}
                    </p>
                  </div>
                  <p className="text-sm">{inr(item.price * item.quantity)}</p>
                </li>
              ))}
            </ul>
          </div>

          <aside>
            <div className="border border-border p-7 text-sm">
              <h2 className="text-2xl">Details</h2>
              <dl className="mt-6 space-y-3 text-muted-foreground">
                <Row label="Order" value={order.id} />
                <Row label="Placed" value={formatDate(order.createdAt)} />
                <Row label="Payment" value={order.paymentMethod} />
                <Row label="Delivery by" value={formatDate(order.estimatedDelivery)} />
                <Row label="Ship to" value={order.address} />
                <div className="flex justify-between border-t border-border pt-4 text-base text-foreground">
                  <dt>Total paid</dt>
                  <dd>{inr(order.total)}</dd>
                </div>
              </dl>
              <ButtonLink to="/track" variant="outline" className="mt-8 w-full">
                Track this order
              </ButtonLink>
              <ButtonLink to="/shop" variant="ghost" className="mt-2 w-full">
                Continue shopping
              </ButtonLink>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6">
      <dt>{label}</dt>
      <dd className="text-right text-foreground">{value}</dd>
    </div>
  );
}
