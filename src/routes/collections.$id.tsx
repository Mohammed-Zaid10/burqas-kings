import { createFileRoute, notFound } from "@tanstack/react-router";
import { Crumbs, PageHero } from "@/components/site/Bits";
import { ProductGrid } from "@/components/site/ProductCard";
import { COLLECTIONS, products, type CollectionId } from "@/data/products";

export const Route = createFileRoute("/collections/$id")({
  loader: ({ params }) => {
    const collection = COLLECTIONS.find((c) => c.id === (params.id as CollectionId));
    if (!collection) throw notFound();
    return { collection };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Collection unavailable — Burqas Kings" }, { name: "robots", content: "noindex" }] };
    }
    const { collection } = loaderData;
    return {
      meta: [
        { title: `${collection.name} Collection — Burqas Kings` },
        { name: "description", content: collection.description },
        { property: "og:title", content: `${collection.name} Collection — Burqas Kings` },
        { property: "og:description", content: collection.tagline },
      ],
    };
  },
  component: CollectionDetail,
});

function CollectionDetail() {
  const { collection } = Route.useLoaderData();
  const items = products.filter((p) => p.collection === collection.id);

  return (
    <div className="page-enter">
      <PageHero
        eyebrow={collection.tagline}
        title={collection.name}
        copy={collection.description}
        image={collection.image}
      />
      <div className="shell py-10">
        <Crumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Collections", to: "/collections" },
            { label: collection.name },
          ]}
        />
        <p className="label-xs mt-8 text-muted-foreground">{items.length} pieces</p>
        <ProductGrid items={items} className="mt-8 pb-24" />
      </div>
    </div>
  );
}
