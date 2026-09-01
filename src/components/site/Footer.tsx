import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { CONTACT } from "@/data/content";

const COLUMNS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All pieces", to: "/shop" },
      { label: "Collections", to: "/collections" },
      { label: "Lookbook", to: "/lookbook" },
      { label: "Wishlist", to: "/wishlist" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Size & Fit", to: "/size-guide" },
      { label: "Fabric & Care", to: "/fabric-care" },
      { label: "Track Order", to: "/track" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "House",
    links: [
      { label: "Our Story", to: "/story" },
      { label: "Journal", to: "/journal" },
      { label: "Contact", to: "/contact" },
      { label: "Account", to: "/account" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="shell grid gap-14 py-20 lg:grid-cols-[1.4fr_2fr]">
        <div>
          <p className="font-display text-2xl uppercase tracking-[0.28em]">Burqas Kings</p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Modest tailoring made in short runs. Considered fabric, quiet construction, and a silhouette that
            stays with you.
          </p>
          <form
            className="mt-8 flex max-w-sm border-b border-border"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.includes("@")) {
                toast.error("Enter a valid email address.");
                return;
              }
              toast.success("You're on the list. Welcome to the house.");
              setEmail("");
            }}
          >
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button type="submit" className="label-xs px-2">
              Join
            </button>
          </form>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="label-xs text-muted-foreground">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="rule-link text-sm text-foreground/80 hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="shell flex flex-col gap-3 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Burqas Kings. All rights reserved.</p>
        <p>
          {CONTACT.email} · {CONTACT.instagram}
        </p>
      </div>
    </footer>
  );
}
