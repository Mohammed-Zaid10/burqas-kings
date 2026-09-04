import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Crumbs } from "@/components/site/Bits";
import { Reveal } from "@/components/site/Reveal";
import { articles } from "@/data/content";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found — Burqas Kings" }, { name: "robots", content: "noindex" }] };
    }
    const { article } = loaderData;
    return {
      meta: [
        { title: `${article.title} — Burqas Kings Journal` },
        { name: "description", content: article.excerpt },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <article className="section-y shell">
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Journal", to: "/journal" }, { label: article.title }]} />

      <header className="mt-10 max-w-3xl">
        <p className="label-xs text-muted-foreground">
          {article.category} · {formatDate(article.date)} · {article.readTime}
        </p>
        <h1 className="mt-5 text-5xl md:text-6xl">{article.title}</h1>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
      </header>

      <Reveal className="mt-14">
        <img src={article.image} alt={article.title} className="aspect-[16/9] w-full object-cover" />
      </Reveal>

      <div className="mt-14 max-w-2xl space-y-6 text-base leading-relaxed text-muted-foreground">
        {article.body.map((para) => (
          <p key={para.slice(0, 24)}>{para}</p>
        ))}
      </div>

      <section className="mt-24 border-t border-border pt-14">
        <h2 className="text-3xl">Keep reading</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {more.map((a) => (
            <Link key={a.slug} to="/journal/$slug" params={{ slug: a.slug }} className="group block">
              <img src={a.image} alt={a.title} loading="lazy" className="aspect-[4/5] w-full object-cover" />
              <p className="label-xs mt-5 text-muted-foreground">{a.category}</p>
              <h3 className="mt-2 text-xl group-hover:underline">{a.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
