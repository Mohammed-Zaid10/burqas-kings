import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/Bits";
import { ButtonLink } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { faqs } from "@/data/content";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Burqas Kings" },
      { name: "description", content: "Answers on delivery times, returns, alterations, sizing and fabric opacity." },
      { property: "og:title", content: "FAQ — Burqas Kings" },
      { property: "og:description", content: "Delivery, returns, alterations and sizing questions answered." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <PageHero eyebrow="Help" title="Questions, answered." compact />

      <section className="section-y shell max-w-3xl">
        <div className="border-t border-border">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 60}>
                <div className="border-b border-border">
                  <h2>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex min-h-14 w-full items-center justify-between gap-6 py-5 text-left text-lg"
                    >
                      {item.q}
                      <span aria-hidden className="text-muted-foreground">{isOpen ? "−" : "+"}</span>
                    </button>
                  </h2>
                  {isOpen ? (
                    <p className="max-w-2xl pb-6 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-14 flex flex-wrap gap-4">
          <ButtonLink to="/contact">Contact the studio</ButtonLink>
          <ButtonLink to="/size-guide" variant="outline">
            Size & fit
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
