import { createFileRoute } from "@tanstack/react-router";
import { Crumbs, Empty, PageHero } from "@/components/site/Bits";
import { ButtonLink } from "@/components/site/Button";
import { ProductGrid } from "@/components/site/ProductCard";
import { useShop } from "@/store/shop";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — Burqas Kings" },
      { name: "description", content: "The Burqas Kings pieces you have saved, kept on this device." },
      { property: "og:title", content: "Your Wishlist — Burqas Kings" },
      { property: "og:description", content: "The pieces you have saved." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlistProducts, hydrated } = useShop();

  return (
    <div className="page-enter">
      <PageHero eyebrow="Saved" title="Wishlist" copy="Pieces you've set aside. Saved on this device." compact />
      <div className="shell py-10 pb-24">
        <Crumbs items={[{ label: "Home", to: "/" }, { label: "Wishlist" }]} />
        {!hydrated ? (
          <p className="mt-12 text-sm text-muted-foreground">Loading your saved pieces…</p>
        ) : wishlistProducts.length ? (
          <ProductGrid items={wishlistProducts} className="mt-12" />
        ) : (
          <div className="mt-12">
            <Empty
              title="Nothing saved yet"
              copy="Tap the heart on any piece and it will wait for you here."
              action={<ButtonLink to="/shop" variant="outline">Browse the catalogue</ButtonLink>}
            />
          </div>
        )}
      </div>
    </div>
  );
}
