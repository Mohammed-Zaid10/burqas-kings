import { createFileRoute } from "@tanstack/react-router";
import { Crumbs, Empty, PageHero } from "@/components/site/Bits";
import { ButtonLink } from "@/components/site/Button";
import { ProductGrid } from "@/components/site/ProductCard";
import { products } from "@/data/products";

export const Route = createFileRoute("/sale")({
  head: () => ({
    meta: [
      { title: "Sale — Burqas Kings" },
      {
        name: "description",
        content: "A small number of Burqas Kings pieces at reduced prices while stock from the last run remains.",
      },
      { property: "og:title", content: "Sale — Burqas Kings" },
      { property: "og:description", content: "Reduced pieces from the last run, while stock remains." },
    ],
  }),
  component: SalePage,
});

function SalePage() {
  const items = products.filter((p) => p.isSale);
  return (
    <div className="page-enter">
      <PageHero
        eyebrow="Last of the run"
        title="Sale"
        copy="A handful of pieces from the previous run, reduced while sizes remain."
        compact
      />
      <div className="shell py-10 pb-24">
        <Crumbs items={[{ label: "Home", to: "/" }, { label: "Sale" }]} />
        {items.length ? (
          <ProductGrid items={items} className="mt-12" />
        ) : (
          <div className="mt-12">
            <Empty
              title="Nothing reduced"
              copy="Everything is currently at full price."
              action={<ButtonLink to="/shop" variant="outline">Shop all</ButtonLink>}
            />
          </div>
        )}
      </div>
    </div>
  );
}
