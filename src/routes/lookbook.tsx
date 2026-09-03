import { createFileRoute, Link } from "@tanstack/react-router";
import { Crumbs, PageHero } from "@/components/site/Bits";
import { Reveal } from "@/components/site/Reveal";
import { looks } from "@/data/content";
import { products } from "@/data/products";
import { inr } from "@/lib/format";

export const Route = createFileRoute("/lookbook")({
  head: () => ({
    meta: [
      { title: "Lookbook — Burqas Kings AW26" },
      {
        name: "description",
        content: "Four looks photographed against a single light: The Everyday, After Dark, Signature and Occasion.",
      },
      { property: "og:title", content: "Lookbook — Burqas Kings AW26" },
      { property: "og:description", content: "Four looks photographed against a single light." },
    ],
  }),
  component: LookbookPage,
});

function LookbookPage() {
  return (
    <div className="page-enter">
      <PageHero eyebrow="AW26" title="Lookbook" copy="Four looks, one light, no styling tricks." compact />
      <div className="shell pt-8">
        <Crumbs items={[{ label: "Home", to: "/" }, { label: "Lookbook" }]} />
      </div>

      <div className="pb-24">
        {looks.map((look, i) => {
          const items = look.productSlugs
            .map((slug) => products.find((p) => p.slug === slug))
            .filter(Boolean);
          return (
            <section key={look.id} className="border-b border-border last:border-0">
              <div className={`shell grid gap-12 py-20 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <Reveal>
                  <div className="aspect-[4/5] overflow-hidden bg-muted">
                    <img src={look.image} alt={look.title} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                </Reveal>
                <Reveal delay={120} className="md:self-center">
                  <span className="label-xs text-muted-foreground">Look {look.index}</span>
                  <h2 className="mt-5 text-4xl md:text-6xl">{look.title}</h2>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">{look.note}</p>
                  <ul className="mt-10 divide-y divide-border border-y border-border">
                    {items.map((product) => (
                      <li key={product!.id}>
                        <Link
                          to="/product/$slug"
                          params={{ slug: product!.slug }}
                          className="flex items-center gap-4 py-4"
                        >
                          <img src={product!.images[0]} alt="" className="h-20 w-16 object-cover" loading="lazy" />
                          <span className="flex-1">
                            <span className="block text-lg">{product!.name}</span>
                            <span className="label-xs text-muted-foreground">{product!.fabric}</span>
                          </span>
                          <span className="text-sm">{inr(product!.price)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
