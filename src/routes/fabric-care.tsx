import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Bits";
import { Reveal } from "@/components/site/Reveal";
import { fabrics, IMAGES } from "@/data/content";

export const Route = createFileRoute("/fabric-care")({
  head: () => ({
    meta: [
      { title: "Fabric & Care — Burqas Kings" },
      { name: "description", content: "Nida, Crepe, Chiffon and our Premium Blend: weight, drape, opacity and how to care for each." },
      { property: "og:title", content: "Fabric & Care — Burqas Kings" },
      { property: "og:description", content: "House fabrics explained, with washing and storage guidance for each." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FabricCarePage,
});

function FabricCarePage() {
  return (
    <>
      <PageHero
        eyebrow="Fabric & care"
        title="Know the cloth."
        copy="Four house fabrics, each chosen for a different kind of day. Here is how they behave and how to keep them."
        image={IMAGES.fabric}
      />

      <section className="section-y shell space-y-20">
        {fabrics.map((fabric, i) => (
          <Reveal key={fabric.id} delay={i * 80}>
            <article className="grid gap-10 border-t border-border pt-10 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <h2 className="text-4xl">{fabric.name}</h2>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{fabric.summary}</p>
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
                <dl className="space-y-4 text-sm">
                  {[
                    ["Texture", fabric.texture],
                    ["Weight", fabric.weight],
                    ["Drape", fabric.drape],
                    ["Breathability", fabric.breathability],
                    ["Opacity", fabric.opacity],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-6 border-b border-border pb-3">
                      <dt className="label-xs text-muted-foreground">{label}</dt>
                      <dd className="text-right text-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div>
                  <p className="label-xs text-muted-foreground">Care</p>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                    {fabric.care.map((line) => (
                      <li key={line}>— {line}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>
    </>
  );
}
