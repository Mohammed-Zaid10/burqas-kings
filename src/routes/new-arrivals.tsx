import { createFileRoute } from "@tanstack/react-router";
import { Crumbs, Empty, PageHero } from "@/components/site/Bits";
import { ButtonLink } from "@/components/site/Button";
import { ProductGrid } from "@/components/site/ProductCard";
import { products } from "@/data/products";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New Arrivals — Burqas Kings" },
      {
        name: "description",
        content: "The newest Burqas Kings pieces, released in short runs from the atelier this season.",
      },
      { property: "og:title", content: "New Arrivals — Burqas Kings" },
      { property: "og:description", content: "The newest pieces, released in short runs." },
    ],
  }),
  component: NewArrivals,
});

function NewArrivals() {
  const items = products.filter((p) => p.isNew);
  return (
    <div className="page-enter">
      <PageHero eyebrow="Just in" title="New arrivals" copy="Released this season, in short runs." compact />
      <div className="shell py-10 pb-24">
        <Crumbs items={[{ label: "Home", to: "/" }, { label: "New arrivals" }]} />
        {items.length ? (
          <ProductGrid items={items} className="mt-12" />
        ) : (
          <div className="mt-12">
            <Empty
              title="Nothing new yet"
              copy="The next drop is still on the cutting table."
              action={<ButtonLink to="/shop" variant="outline">Shop all</ButtonLink>}
            />
          </div>
        )}
      </div>
    </div>
  );
}
