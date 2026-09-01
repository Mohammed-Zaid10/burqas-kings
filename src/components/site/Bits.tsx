import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("label-xs text-muted-foreground", className)}>{children}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
      )}
    >
      <Reveal className="max-w-2xl">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl">{title}</h2>
        {copy ? <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">{copy}</p> : null}
      </Reveal>
      {action ? <Reveal delay={120}>{action}</Reveal> : null}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  copy,
  image,
  compact = false,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  image?: string;
  compact?: boolean;
}) {
  return (
    <header className={cn("relative overflow-hidden border-b border-border bg-card", image && "text-ivory")}>
      {image ? (
        <>
          <img src={image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-charcoal/60" />
        </>
      ) : null}
      <div className={cn("shell relative", compact ? "py-16 md:py-24" : "py-24 md:py-36")}>
        <Reveal className="max-w-3xl">
          {eyebrow ? (
            <span className={cn("label-xs", image ? "text-ivory/70" : "text-muted-foreground")}>{eyebrow}</span>
          ) : null}
          <h1 className="mt-5 text-5xl md:text-7xl">{title}</h1>
          {copy ? (
            <p className={cn("mt-6 max-w-xl text-sm leading-relaxed", image ? "text-ivory/80" : "text-muted-foreground")}>
              {copy}
            </p>
          ) : null}
        </Reveal>
      </div>
    </header>
  );
}

export function Crumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="label-xs flex flex-wrap items-center gap-2 text-muted-foreground">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {item.to ? (
            <Link to={item.to} className="rule-link hover:text-foreground">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
          {i < items.length - 1 ? <span aria-hidden>/</span> : null}
        </span>
      ))}
    </nav>
  );
}

export function Empty({ title, copy, action }: { title: string; copy: string; action?: ReactNode }) {
  return (
    <div className="border border-dashed border-border px-8 py-20 text-center">
      <h3 className="text-3xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">{copy}</p>
      {action ? <div className="mt-8 flex justify-center">{action}</div> : null}
    </div>
  );
}
