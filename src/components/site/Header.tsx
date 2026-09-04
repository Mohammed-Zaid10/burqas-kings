import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAuthSession } from "@/hooks/useAuthSession";
import { useShop } from "@/store/shop";

const NAV = [
  { label: "Shop", to: "/shop" },
  { label: "Collections", to: "/collections" },
  { label: "Lookbook", to: "/lookbook" },
  { label: "Fabric & Care", to: "/fabric-care" },
  { label: "Journal", to: "/journal" },
  { label: "Our Story", to: "/story" },
] as const;

export function Header() {
  const { totals, wishlist, setSearchOpen, setCartOpen } = useShop();
  const { user } = useAuthSession();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="label-xs bg-foreground py-2.5 text-center text-background">
        Complimentary shipping on orders over ₹5,000 · Made in short runs
      </div>
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-colors duration-500",
          scrolled ? "border-border bg-background/90 backdrop-blur-xl" : "border-transparent bg-background",
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-6 md:h-20">
          <button
            type="button"
            className="lg:hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/" className="font-display text-xl tracking-[0.28em] uppercase md:text-2xl">
            Burqas Kings
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="label-xs rule-link text-foreground/80 hover:text-foreground"
                activeProps={{ className: "label-xs rule-link text-foreground" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-5">
            <button type="button" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search className="h-[18px] w-[18px]" />
            </button>
            <Link to="/wishlist" aria-label="Wishlist" className="relative hidden sm:block">
              <Heart className="h-[18px] w-[18px]" />
              {wishlist.length > 0 ? (
                <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-foreground px-1 text-[10px] text-background">
                  {wishlist.length}
                </span>
              ) : null}
            </Link>
            <Link
              to={user ? "/account" : "/auth"}
              aria-label={user ? "Account" : "Sign in"}
              className="hidden sm:block"
            >
              <User className="h-[18px] w-[18px]" />
            </Link>
            <button type="button" aria-label="Open bag" className="relative" onClick={() => setCartOpen(true)}>
              <ShoppingBag className="h-[18px] w-[18px]" />
              {totals.count > 0 ? (
                <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-foreground px-1 text-[10px] text-background">
                  {totals.count}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 bg-background lg:hidden">
          <div className="shell flex h-16 items-center justify-between">
            <span className="font-display text-xl uppercase tracking-[0.28em]">Menu</span>
            <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="shell mt-8 flex flex-col gap-6">
            {[{ label: "Home", to: "/" }, ...NAV, { label: "Wishlist", to: "/wishlist" }, { label: "Account", to: "/account" }, { label: "Track Order", to: "/track" }, { label: "Contact", to: "/contact" }].map(
              (item) => (
                <Link key={item.to} to={item.to} className="text-3xl">
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      ) : null}
    </>
  );
}
