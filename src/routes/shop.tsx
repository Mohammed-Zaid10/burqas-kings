import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Crumbs, Empty, PageHero } from "@/components/site/Bits";
import { Button, ButtonLink } from "@/components/site/Button";
import { ProductGrid } from "@/components/site/ProductCard";
import { inr } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  COLLECTIONS,
  COLORS,
  FABRICS,
  PRICE_BOUNDS,
  SIZES,
  STYLES,
  products,
  type Product,
} from "@/data/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Burqas — Burqas Kings" },
      {
        name: "description",
        content:
          "Browse the full Burqas Kings catalogue. Filter by collection, fabric, colour, size, style and price across 24 modest pieces.",
      },
      { property: "og:title", content: "Shop All Burqas — Burqas Kings" },
      { property: "og:description", content: "The full Burqas Kings catalogue, filterable by fabric, colour and cut." },
    ],
  }),
  component: ShopPage,
});

type Sort = "featured" | "new" | "price-asc" | "price-desc" | "rating";

const SORTS: { id: Sort; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "new", label: "Newest" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "rating", label: "Top rated" },
];

function toggle<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function ShopPage() {
  const [collections, setCollections] = useState<string[]>([]);
  const [fabricList, setFabricList] = useState<string[]>([]);
  const [colorList, setColorList] = useState<string[]>([]);
  const [sizeList, setSizeList] = useState<string[]>([]);
  const [styleList, setStyleList] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(PRICE_BOUNDS.max);
  const [sort, setSort] = useState<Sort>("featured");
  const [panelOpen, setPanelOpen] = useState(false);

  const filtered = useMemo(() => {
    const match = (p: Product) =>
      (!collections.length || collections.includes(p.collection)) &&
      (!fabricList.length || fabricList.includes(p.fabric)) &&
      (!colorList.length || p.colors.some((c) => colorList.includes(c.name))) &&
      (!sizeList.length || p.sizes.some((s) => sizeList.includes(s))) &&
      (!styleList.length || styleList.includes(p.style)) &&
      p.price <= maxPrice;

    const list = products.filter(match);
    switch (sort) {
      case "new":
        return [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [collections, fabricList, colorList, sizeList, styleList, maxPrice, sort]);

  const clearAll = () => {
    setCollections([]);
    setFabricList([]);
    setColorList([]);
    setSizeList([]);
    setStyleList([]);
    setMaxPrice(PRICE_BOUNDS.max);
  };

  const activeCount =
    collections.length + fabricList.length + colorList.length + sizeList.length + styleList.length +
    (maxPrice < PRICE_BOUNDS.max ? 1 : 0);

  const filters = (
    <div className="space-y-10">
      <FilterGroup title="Collection">
        {COLLECTIONS.map((c) => (
          <Chip key={c.id} active={collections.includes(c.id)} onClick={() => setCollections(toggle(collections, c.id))}>
            {c.name}
          </Chip>
        ))}
      </FilterGroup>
      <FilterGroup title="Fabric">
        {FABRICS.map((f) => (
          <Chip key={f} active={fabricList.includes(f)} onClick={() => setFabricList(toggle(fabricList, f))}>
            {f}
          </Chip>
        ))}
      </FilterGroup>
      <FilterGroup title="Colour">
        {Object.values(COLORS).map((c) => (
          <button
            key={c.name}
            type="button"
            onClick={() => setColorList(toggle(colorList, c.name))}
            aria-pressed={colorList.includes(c.name)}
            className={cn(
              "flex min-h-11 items-center gap-2 border px-3 text-xs",
              colorList.includes(c.name) ? "border-foreground" : "border-border",
            )}
          >
            <span className="h-3 w-3 rounded-full border border-border" style={{ backgroundColor: c.hex }} />
            {c.name}
          </button>
        ))}
      </FilterGroup>
      <FilterGroup title="Size">
        {SIZES.map((s) => (
          <Chip key={s} active={sizeList.includes(s)} onClick={() => setSizeList(toggle(sizeList, s))}>
            {s}
          </Chip>
        ))}
      </FilterGroup>
      <FilterGroup title="Style">
        {STYLES.map((s) => (
          <Chip key={s} active={styleList.includes(s)} onClick={() => setStyleList(toggle(styleList, s))}>
            {s}
          </Chip>
        ))}
      </FilterGroup>
      <div>
        <p className="label-xs">Max price</p>
        <input
          type="range"
          min={PRICE_BOUNDS.min}
          max={PRICE_BOUNDS.max}
          step={100}
          value={maxPrice}
          aria-label="Maximum price"
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="mt-4 w-full accent-[var(--espresso)]"
        />
        <p className="mt-2 text-xs text-muted-foreground">Up to {inr(maxPrice)}</p>
      </div>
      <Button variant="outline" onClick={clearAll} className="w-full">
        Clear filters
      </Button>
    </div>
  );

  return (
    <div className="page-enter">
      <PageHero
        eyebrow="Catalogue"
        title="Shop all"
        copy="Twenty-four pieces across four collections. Filter by the things that actually matter — cloth, cut and colour."
        compact
      />
      <div className="shell pt-8">
        <Crumbs items={[{ label: "Home", to: "/" }, { label: "Shop" }]} />
      </div>

      <div className="shell grid gap-12 pb-24 pt-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28">{filters}</div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
            <p className="label-xs text-muted-foreground">{filtered.length} pieces</p>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="lg:hidden" onClick={() => setPanelOpen(true)}>
                Filters{activeCount ? ` (${activeCount})` : ""}
              </Button>
              <label htmlFor="sort" className="sr-only">
                Sort products
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="label-xs min-h-11 border border-border bg-background px-4"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length ? (
            <ProductGrid items={filtered} className="mt-12" />
          ) : (
            <div className="mt-12">
              <Empty
                title="Nothing matches yet"
                copy="Try widening the price range or clearing a filter or two."
                action={
                  <Button variant="outline" onClick={clearAll}>
                    Clear filters
                  </Button>
                }
              />
            </div>
          )}

          <div className="mt-16 flex flex-wrap gap-3">
            <ButtonLink to="/new-arrivals" variant="outline">
              New arrivals
            </ButtonLink>
            <ButtonLink to="/sale" variant="outline">
              Sale
            </ButtonLink>
          </div>
        </div>
      </div>

      {panelOpen ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-background p-6 lg:hidden">
          <div className="flex items-center justify-between">
            <p className="label-xs">Filters</p>
            <Button variant="ghost" onClick={() => setPanelOpen(false)}>
              Close
            </Button>
          </div>
          <div className="mt-8">{filters}</div>
          <Button className="mt-8 w-full" onClick={() => setPanelOpen(false)}>
            Show {filtered.length} pieces
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="label-xs">{title}</p>
      <div className="mt-4 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "min-h-11 border px-3 text-xs transition-colors",
        active ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground",
      )}
    >
      {children}
    </button>
  );
}
