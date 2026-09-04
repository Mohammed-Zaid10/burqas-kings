import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Bits";
import { Reveal } from "@/components/site/Reveal";
import { articles } from "@/data/content";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "Journal — Burqas Kings" },
      { name: "description", content: "Essays on drape, fabric, sizing and life inside the Burqas Kings atelier." },
      { property: "og:title", content: "Journal — Burqas Kings" },
      { property: "og:description", content: "Writing on modest dressing, house fabrics and craft." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JournalPage,
});

function JournalPage() {
  return (
    <>
      <PageHero eyebrow="Journal" title="Notes from the house." copy="Fabric, fit and the thinking behind the cut." compact />

      <section className="section-y shell grid gap-14 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, i) => (
          <Reveal key={article.slug} delay={(i % 3) * 100}>
            <article>
              <Link to="/journal/$slug" params={{ slug: article.slug }} className="group block">
                <div className="overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-editorial)] group-hover:scale-105"
                  />
                </div>
                <p className="label-xs mt-6 text-muted-foreground">
                  {article.category} · {formatDate(article.date)} · {article.readTime}
                </p>
                <h2 className="mt-3 text-2xl group-hover:underline">{article.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
              </Link>
            </article>
          </Reveal>
        ))}
      </section>
    </>
  );
}
