import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Bits";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/size-guide")({
  head: () => ({
    meta: [
      { title: "Size & Fit Guide — Burqas Kings" },
      { name: "description", content: "Measurements for every Burqas Kings size, plus how to measure at home in five minutes." },
      { property: "og:title", content: "Size & Fit Guide — Burqas Kings" },
      { property: "og:description", content: "Bust, shoulder, sleeve and length measurements for XS to XXL." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SizeGuidePage,
});

const ROWS = [
  ["XS", "32", "13.5", "22", "54"],
  ["S", "34", "14", "22.5", "55"],
  ["M", "36", "14.5", "23", "56"],
  ["L", "38", "15", "23.5", "57"],
  ["XL", "41", "15.5", "24", "58"],
  ["XXL", "44", "16", "24.5", "58"],
];

const STEPS = [
  "Stand relaxed against a wall wearing the shoes you would usually wear.",
  "Measure the fullest part of the bust without compressing the tape.",
  "Measure shoulder point to shoulder point across the back.",
  "Measure from the shoulder to the floor for total length.",
];

function SizeGuidePage() {
  return (
    <>
      <PageHero
        eyebrow="Size & fit"
        title="Find your fall."
        copy="Our cuts already allow generous ease. If you are between sizes, size up for a more relaxed column."
        compact
      />

      <section className="section-y shell grid gap-16 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <caption className="sr-only">Size chart in inches</caption>
              <thead>
                <tr className="label-xs border-b border-border text-left text-muted-foreground">
                  <th scope="col" className="py-4">Size</th>
                  <th scope="col" className="py-4">Bust</th>
                  <th scope="col" className="py-4">Shoulder</th>
                  <th scope="col" className="py-4">Sleeve</th>
                  <th scope="col" className="py-4">Length</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row[0]} className="border-b border-border/60">
                    {row.map((cell, i) => (
                      <td key={i} className={i === 0 ? "py-4 font-medium" : "py-4 text-muted-foreground"}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-xs text-muted-foreground">All measurements in inches.</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <h2 className="text-3xl">Measuring at home</h2>
          <ol className="mt-6 space-y-5 text-sm leading-relaxed text-muted-foreground">
            {STEPS.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="label-xs text-foreground">0{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>
    </>
  );
}
