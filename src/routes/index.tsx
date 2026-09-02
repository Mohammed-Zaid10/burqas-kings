import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { Eyebrow, SectionHeading } from "@/components/site/Bits";
import { ButtonLink } from "@/components/site/Button";
import { ProductCard, ProductGrid } from "@/components/site/ProductCard";
import { Reveal } from "@/components/site/Reveal";
import { fabrics, looks, IMAGES } from "@/data/content";
import { COLLECTIONS, products } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Burqas Kings — Modern Modest Tailoring" },
      {
        name: "description",
        content:
          "Modern burqas and modest tailoring made in short runs. Considered fabric, quiet construction and silhouettes made for every moment.",
      },
      { property: "og:title", content: "Burqas Kings — Modern Modest Tailoring" },
      {
        property: "og:description",
        content: "Modern burqas and modest tailoring made in short runs.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = products.filter((p) => p.isNew || p.isSale).slice(0, 8);
  const edit = products.filter((p) => p.collection === "signature").slice(0, 4);

  return (
    <div className="page-enter">
      <section className="relative min-h-[86vh] overflow-hidden bg-charcoal text-ivory">
        <img
          src={heroImg}
          alt="Model wearing a Burqas Kings signature burqa in espresso"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-charcoal/30" />
        <div className="shell relative flex min-h-[86vh] flex-col justify-end pb-20 pt-32">
          <Reveal>
            <span className="label-xs text-ivory/70">Autumn — Winter 2026</span>
            <h1 className="mt-6 max-w-4xl text-6xl leading-[0.95] md:text-8xl lg:text-9xl">
              Modest. Defined.
            </h1>
            <p className="mt-7 max-w-md text-sm leading-relaxed text-ivory/80">
              Burqas cut in short runs from nida, crepe, chiffon and our house blend — designed to hold their
              shape from morning to evening.
            </p>
          </Reveal>
          <Reveal delay={140} className="mt-10 flex flex-wrap gap-3">
            <ButtonLink to="/shop" size="lg" className="bg-ivory text-charcoal hover:bg-ivory/90">
              Shop the collection
            </ButtonLink>
            <ButtonLink
              to="/lookbook"
              variant="outline"
              size="lg"
              className="border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal"
            >
              View lookbook
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <section className="section-y shell">
        <SectionHeading
          eyebrow="Made for every moment"
          title="Three ways to wear the house."
          copy="Everyday, Signature and Occasion — one language of cut, three registers of formality."
          action={
            <ButtonLink to="/collections" variant="outline">
              All collections
            </ButtonLink>
          }
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {COLLECTIONS.slice(0, 3).map((collection, i) => (
            <Reveal key={collection.id} delay={i * 110}>
              <Link
                to="/collections/$id"
                params={{ id: collection.id }}
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={collection.image}
                    alt={`${collection.name} collection`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 text-2xl">{collection.name}</h3>
                <p className="label-xs mt-2 text-muted-foreground">{collection.tagline}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-y border-y border-border bg-card">
        <div className="shell">
          <SectionHeading
            eyebrow="Featured pieces"
            title="New in the atelier."
            action={
              <ButtonLink to="/new-arrivals" variant="outline">
                New arrivals
              </ButtonLink>
            }
          />
        </div>
        <div className="hide-scrollbar mt-12 flex snap-x gap-6 overflow-x-auto px-[max(1.5rem,calc((100vw-1360px)/2))] pb-2">
          {featured.map((product) => (
            <div key={product.id} className="w-[70vw] shrink-0 snap-start sm:w-[42vw] lg:w-[24vw]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <section className="section-y shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>The house</Eyebrow>
          <p className="mt-8 text-3xl leading-snug md:text-5xl">
            We make a small number of pieces, carefully. Nothing is rushed to a season, nothing is added
            because it photographs well.
          </p>
          <div className="mt-10 flex justify-center">
            <ButtonLink to="/story" variant="outline">
              Our story
            </ButtonLink>
          </div>
        </Reveal>
      </section>

      <section className="section-y shell">
        <SectionHeading
          eyebrow="The signature edit"
          title="The house silhouette."
          copy="Sculpted shoulders, deep sleeves, and a fall that stays composed through a long day."
          action={
            <ButtonLink to="/collections/$id" params={{ id: "signature" }} variant="outline">
              Explore signature
            </ButtonLink>
          }
        />
        <ProductGrid items={edit} className="mt-14" />
      </section>

      <section className="section-y border-y border-border bg-card">
        <div className="shell">
          <SectionHeading eyebrow="Fabric experience" title="Four cloths, four characters." />
          <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {fabrics.map((fabric, i) => (
              <Reveal key={fabric.id} delay={i * 90} className="bg-background p-8">
                <p className="font-display text-3xl">{fabric.name}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{fabric.summary}</p>
                <dl className="mt-6 space-y-2 text-xs text-muted-foreground">
                  <div className="flex justify-between gap-4">
                    <dt>Weight</dt>
                    <dd className="text-foreground">{fabric.weight}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Drape</dt>
                    <dd className="text-right text-foreground">{fabric.drape}</dd>
                  </div>
                </dl>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink to="/fabric-care" variant="outline">
              Fabric &amp; care
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section-y shell">
        <SectionHeading
          eyebrow="Lookbook"
          title="Four looks, one light."
          action={
            <ButtonLink to="/lookbook" variant="outline">
              Full lookbook
            </ButtonLink>
          }
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {looks.slice(0, 2).map((look, i) => (
            <Reveal key={look.id} delay={i * 120}>
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <img src={look.image} alt={look.title} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <p className="label-xs mt-5 text-muted-foreground">Look {look.index}</p>
              <h3 className="mt-2 text-2xl">{look.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{look.note}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-charcoal text-ivory">
        <img src={IMAGES.story} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="shell relative grid gap-10 py-24 md:grid-cols-2 md:items-center md:py-32">
          <Reveal>
            <span className="label-xs text-ivory/70">Our story</span>
            <h2 className="mt-5 text-4xl md:text-6xl">Made by hands we know.</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-sm leading-relaxed text-ivory/80">
              Every Burqas Kings piece passes through four pairs of hands in a small atelier. We produce in short
              runs because it is the only way we know how to keep the standard.
            </p>
            <ButtonLink
              to="/story"
              variant="outline"
              className="mt-8 border-ivory/40 text-ivory hover:bg-ivory hover:text-charcoal"
            >
              Read more
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
