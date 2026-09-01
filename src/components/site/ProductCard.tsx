import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { inr } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useShop } from "@/store/shop";
import type { Product } from "@/data/products";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { toggleWishlist, isWishlisted } = useShop();
  const wished = isWishlisted(product.id);

  return (
    <article className="group relative">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block"
        aria-label={`${product.name} — ${inr(product.price)}`}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={`${product.name} burqa in ${product.colors[0]?.name}`}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
          {product.images[1] ? (
            <img
              src={product.images[1]}
              alt=""
              aria-hidden
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          ) : null}
          <div className="absolute left-0 top-0 flex flex-col items-start gap-1 p-3">
            {product.isNew ? (
              <span className="label-xs bg-background px-2 py-1 text-foreground">New</span>
            ) : null}
            {product.isSale ? (
              <span className="label-xs bg-foreground px-2 py-1 text-background">-{product.discount}%</span>
            ) : null}
            {product.stock <= 3 ? (
              <span className="label-xs bg-accent px-2 py-1 text-accent-foreground">Low stock</span>
            ) : null}
          </div>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => toggleWishlist(product.id)}
        aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        aria-pressed={wished}
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center bg-background/80 backdrop-blur transition-colors hover:bg-background"
      >
        <Heart className={cn("h-4 w-4", wished ? "fill-foreground text-foreground" : "text-foreground")} />
      </button>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg leading-tight">
            <Link to="/product/$slug" params={{ slug: product.slug }} className="rule-link">
              {product.name}
            </Link>
          </h3>
          <p className="label-xs mt-2 text-muted-foreground">
            {product.fabric} · {product.style}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm">{inr(product.price)}</p>
          {product.originalPrice ? (
            <p className="text-xs text-muted-foreground line-through">{inr(product.originalPrice)}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-3 flex gap-1.5">
        {product.colors.map((color) => (
          <span
            key={color.name}
            title={color.name}
            className="h-3 w-3 rounded-full border border-border"
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
    </article>
  );
}

export function ProductGrid({ items, className }: { items: Product[]; className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-8 lg:grid-cols-3 xl:grid-cols-4", className)}>
      {items.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < 4} />
      ))}
    </div>
  );
}
