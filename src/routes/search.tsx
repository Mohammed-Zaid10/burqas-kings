import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/site/Bits";
import { ButtonLink } from "@/components/site/Button";
import { ProductGrid } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { getSearchResults, products } from "@/data/products";
import { useShop } from "@/store/shop";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search — Burqas Kings" },
      { name: "description", content: "Search the Burqas Kings collection by name, fabric, colour or collection." },
      { property: "og:title", content: "Search — Burqas Kings" },
      { property: "og:description", content: "Find a piece by name, fabric, colour or collection." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { recentSearches, addRecentSearch } = useShop();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const results = useMemo(() => (query.trim() ? getSearchResults(query) : []), [query]);
  const suggestions = useMemo(() => products.slice(0, 4), []);

  return (
    <>
      <PageHero eyebrow="Search" title="Find your piece." compact />

      <section className="section-y shell">
        <Reveal>
          <form
            className="flex items-center gap-4 border-b border-border pb-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (query.trim()) addRecentSearch(query.trim());
            }}
          >
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, fabric or colour"
              aria-label="Search products"
              className="w-full bg-transparent py-3 text-2xl outline-none placeholder:text-muted-foreground md:text-3xl"
            />
          </form>
        </Reveal>

        {recentSearches.length > 0 && !query ? (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="label-xs text-muted-foreground">Recent</span>
            {recentSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setQuery(term)}
                className="label-xs min-h-11 border border-border px-4"
              >
                {term}
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-16">
          {query.trim() ? (
            results.length ? (
              <>
                <p className="label-xs text-muted-foreground">
                  {results.length} result{results.length === 1 ? "" : "s"} for “{query}”
                </p>
                <div className="mt-10">
                  <ProductGrid products={results} />
                </div>
              </>
            ) : (
              <div className="border border-dashed border-border px-8 py-20 text-center">
                <h2 className="text-3xl">Nothing matched “{query}”.</h2>
                <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
                  Try a fabric like Nida or Crepe, or browse the full catalogue.
                </p>
                <div className="mt-8 flex justify-center">
                  <ButtonLink to="/shop" variant="outline">
                    Browse all pieces
                  </ButtonLink>
                </div>
              </div>
            )
          ) : (
            <>
              <p className="label-xs text-muted-foreground">Popular right now</p>
              <div className="mt-10">
                <ProductGrid products={suggestions} />
              </div>
            </>
          )}
        </div>

        <button
          type="button"
          className="sr-only"
          onClick={() => navigate({ to: "/shop" })}
        >
          Go to shop
        </button>
      </section>
    </>
  );
}
