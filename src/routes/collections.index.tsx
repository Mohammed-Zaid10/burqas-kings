import { createFileRoute, Link } from "@tanstack/react-router";
import { Crumbs, PageHero } from "@/components/site/Bits";
import { ButtonLink } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { COLLECTIONS, products } from "@/data/products";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Collections — Everyday, Signature, Occasion | Burqas Kings" },
      {
        name: "description",
        content:
          "Four Burqas Kings collections: Everyday ease, the Signature house cut, Occasion layering and The Edit short runs.",
      },
      { property: "og:title", content: "Collections — Burqas Kings" },
      { property: "og:description", content: "Everyday, Signature, Occasion and The Edit." },
    ],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  return (
    <div className="page-enter">
      <PageHero
        eyebrow="The house"
        title="Collections"
        copy="One language of cut, four registers. Each collection is drafted from the same block and finished for a different kind of day."
        compact
      />
      <div className="shell pt-8">
        <Crumbs items={[{ label: "Home", to: "/" }, { label: "Collections" }]} />
      </div>

      <div className="pb-24">
        {COLLECTIONS.map((collection, i) => {
          const count = products.filter((p) => p.collection === collection.id).length;
          return (
            <section key={collection.id} className="border-b border-border last:border-0">
              <div
                className={`shell grid items-center gap-12 py-20 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <Reveal>
                  <Link to="/collections/$id" params={{ id: collection.id }} className="group block">
                    <div className="aspect-[4/5] overflow-hidden bg-muted">
                      <img
                        src={collection.image}
                        alt={`${collection.name} collection`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      />
                    </div>
                  </Link>
                </Reveal>
                <Reveal delay={120}>
                  <span className="label-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")} — {count} pieces
                  </span>
                  <h2 className="mt-5 text-4xl md:text-6xl">{collection.name}</h2>
                  <p className="label-xs mt-4 text-muted-foreground">{collection.tagline}</p>
                  <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {collection.description}
                  </p>
                  <ButtonLink
                    to="/collections/$id"
                    params={{ id: collection.id }}
                    variant="outline"
                    className="mt-9"
                  >
                    View {collection.name}
                  </ButtonLink>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
