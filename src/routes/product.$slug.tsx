import { createFileRoute, notFound } from "@tanstack/react-router";
import { Heart, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Crumbs } from "@/components/site/Bits";
import { Button } from "@/components/site/Button";
import { ProductGrid } from "@/components/site/ProductCard";
import { fabrics } from "@/data/content";
import { getProduct, getRelated, products } from "@/data/products";
import { inr } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useShop } from "@/store/shop";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Piece unavailable — Burqas Kings" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    const description = `${product.name} — ${product.fabric} ${product.style.toLowerCase()} burqa, ${inr(product.price)}. ${product.description.slice(0, 90)}`;
    return {
      meta: [
        { title: `${product.name} — ${product.fabric} Burqa | Burqas Kings` },
        { name: "description", content: description },
        { property: "og:title", content: `${product.name} — Burqas Kings` },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductPage,
});

const TABS = ["Description", "Fabric & Feel", "Fit & Sizing", "Care", "Shipping & Returns"] as const;

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, setCartOpen, toggleWishlist, isWishlisted } = useShop();
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState(product.sizes[2] ?? product.sizes[0]);
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Description");
  const [zoom, setZoom] = useState(false);

  const fabric = fabrics.find((f) => f.name === product.fabric);
  const related = getRelated(product);
  const complete = products.filter((p) => p.collection !== product.collection).slice(0, 3);
  const wished = isWishlisted(product.id);

  const add = () => {
    addToCart(product, color, size, qty);
    toast.success(`${product.name} added to your bag.`);
  };

  const tabBody: Record<(typeof TABS)[number], React.ReactNode> = {
    Description: <p>{product.description}</p>,
    "Fabric & Feel": (
      <div className="space-y-2">
        <p>{fabric?.summary}</p>
        <p>
          {fabric?.texture} · {fabric?.weight} · {fabric?.drape}. Opacity: {fabric?.opacity}.
        </p>
      </div>
    ),
    "Fit & Sizing": (
      <p>
        Cut with generous ease through the shoulder and sleeve. The model is 5&apos;8&quot; and wears a size M.
        Size up for a more relaxed fall, or use our size guide for at-home measurements.
      </p>
    ),
    Care: <ul className="list-disc space-y-1 pl-5">{fabric?.care.map((c) => <li key={c}>{c}</li>)}</ul>,
    "Shipping & Returns": (
      <p>
        Complimentary shipping on orders over ₹5,000; ₹99 flat otherwise. Metro delivery in 2–4 working days.
        Unworn pieces with tags can be returned within 14 days.
      </p>
    ),
  };

  return (
    <div className="page-enter shell py-10">
      <Crumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Shop", to: "/shop" },
          { label: product.name },
        ]}
      />

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <div>
          <div
            className={cn("relative aspect-[3/4] overflow-hidden bg-muted", zoom && "cursor-zoom-out")}
            onClick={() => setZoom((z) => !z)}
          >
            <img
              src={product.images[active]}
              alt={`${product.name} in ${color}`}
              className={cn(
                "h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                zoom ? "scale-150" : "scale-100 cursor-zoom-in",
              )}
            />
          </div>
          <div className="mt-4 flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={img + i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                aria-pressed={active === i}
                className={cn("h-24 w-20 overflow-hidden border", active === i ? "border-foreground" : "border-border")}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="label-xs text-muted-foreground">
            {product.category} · {product.fabric}
          </p>
          <h1 className="mt-4 text-5xl md:text-6xl">{product.name}</h1>
          <div className="mt-5 flex items-baseline gap-3">
            <p className="text-xl">{inr(product.price)}</p>
            {product.originalPrice ? (
              <p className="text-sm text-muted-foreground line-through">{inr(product.originalPrice)}</p>
            ) : null}
            {product.isSale ? <span className="label-xs bg-foreground px-2 py-1 text-background">-{product.discount}%</span> : null}
          </div>
          <p className="label-xs mt-3 text-muted-foreground">
            {product.rating} / 5 · {product.reviewCount} reviews · {product.stock} in stock
          </p>

          <div className="mt-10">
            <p className="label-xs">Colour — {color}</p>
            <div className="mt-4 flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  aria-pressed={color === c.name}
                  className={cn(
                    "grid h-11 w-11 place-items-center rounded-full border",
                    color === c.name ? "border-foreground" : "border-border",
                  )}
                >
                  <span className="h-6 w-6 rounded-full" style={{ backgroundColor: c.hex }} />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="label-xs">Size — {size}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={cn(
                    "min-h-11 min-w-11 border px-4 text-xs",
                    size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <p className="label-xs">Quantity</p>
            <div className="flex items-center border border-border">
              <button type="button" aria-label="Decrease quantity" className="grid h-11 w-11 place-items-center" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button type="button" aria-label="Increase quantity" className="grid h-11 w-11 place-items-center" onClick={() => setQty((q) => Math.min(product.stock, q + 1))}>
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3">
            <Button size="lg" onClick={add}>
              Add to bag
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                add();
                setCartOpen(true);
              }}
            >
              Buy now
            </Button>
            <Button variant="ghost" onClick={() => toggleWishlist(product.id)} aria-pressed={wished}>
              <Heart className={cn("h-4 w-4", wished && "fill-foreground")} />
              {wished ? "Saved to wishlist" : "Save to wishlist"}
            </Button>
          </div>

          <div className="mt-12 border-t border-border">
            <div className="flex flex-wrap gap-4 py-5">
              {TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  aria-pressed={tab === t}
                  className={cn("label-xs", tab === t ? "text-foreground underline underline-offset-8" : "text-muted-foreground")}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="pb-8 text-sm leading-relaxed text-muted-foreground">{tabBody[tab]}</div>
          </div>
        </div>
      </div>

      <section className="section-y">
        <h2 className="text-3xl md:text-4xl">You may also like</h2>
        <ProductGrid items={related} className="mt-10" />
      </section>

      <section className="pb-24">
        <h2 className="text-3xl md:text-4xl">Complete the look</h2>
        <ProductGrid items={complete} className="mt-10" />
      </section>
    </div>
  );
}
