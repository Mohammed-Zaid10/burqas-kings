import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/site/Bits";
import { ButtonLink } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { IMAGES } from "@/data/content";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — Burqas Kings" },
      { name: "description", content: "How Burqas Kings makes modest tailoring in short runs: fabric, craft and a quiet house silhouette." },
      { property: "og:title", content: "Our Story — Burqas Kings" },
      { property: "og:description", content: "Modest tailoring made in short runs. Considered fabric, quiet construction." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StoryPage,
});

const PILLARS = [
  { title: "Fabric first", copy: "Every metre is hung for seventy-two hours before it is cut. Cloth that collapses is returned." },
  { title: "Short runs", copy: "We make in small numbers so each piece can pass through four pairs of hands before it leaves." },
  { title: "Quiet finishing", copy: "Hems, cuffs and seams are checked by a dedicated pair of hands. Nothing ships unchecked." },
];

function StoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="Made slowly, worn daily."
        copy="Burqas Kings began with one question: what would modest dress look like if it were tailored with the patience of couture and the ease of everyday clothing?"
        image={IMAGES.story}
      />

      <section className="section-y shell grid gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <img src={IMAGES.story} alt="Inside the Burqas Kings atelier" loading="lazy" className="w-full object-cover" />
        </Reveal>
        <Reveal delay={120}>
          <h2 className="text-4xl md:text-5xl">The house silhouette.</h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            A defined shoulder, a generous sleeve, and a long uninterrupted drop. We drafted it once and have
            spent every season since refining it by millimetres rather than reinventing it.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            The result is a wardrobe that reads as calm. Nothing fights the body; everything falls with it.
          </p>
          <ButtonLink to="/shop" variant="outline" className="mt-9">
            Shop the house
          </ButtonLink>
        </Reveal>
      </section>

      <section className="section-y shell">
        <SectionHeading eyebrow="What we hold to" title="Three standards." />
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <p className="label-xs text-muted-foreground">0{i + 1}</p>
              <h3 className="mt-4 text-2xl">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
