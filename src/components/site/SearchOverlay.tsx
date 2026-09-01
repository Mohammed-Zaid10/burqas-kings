import { useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { searchProducts } from "@/data/products";
import { inr } from "@/lib/format";
import { useShop } from "@/store/shop";

const SUGGESTIONS = ["Nida", "Occasion", "Open Front", "Chiffon", "Signature", "Sand"];

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, recentSearches, addRecentSearch, clearRecentSearches } = useShop();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchOpen) setQuery("");
  }, [searchOpen]);

  const results = useMemo(() => searchProducts(query).slice(0, 6), [query]);

  const go = (slug: string) => {
    addRecentSearch(query || slug);
    setSearchOpen(false);
    navigate({ to: "/product/$slug", params: { slug } });
  };

  return (
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogContent
        showCloseButton={false}
        className="top-0 max-w-none translate-y-0 gap-0 rounded-none border-0 border-b border-border bg-background p-0 sm:max-w-none"
      >
        <DialogTitle className="sr-only">Search products</DialogTitle>
        <div className="shell py-6">
          <div className="flex items-center gap-4 border-b border-border pb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pieces, fabrics, collections"
              className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
            />
            <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto py-6">
            {query.length === 0 ? (
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <p className="label-xs text-muted-foreground">Suggestions</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setQuery(s)}
                        className="label-xs border border-border px-3 py-2 hover:bg-muted"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                {recentSearches.length > 0 ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="label-xs text-muted-foreground">Recent</p>
                      <button type="button" onClick={clearRecentSearches} className="label-xs text-muted-foreground rule-link">
                        Clear
                      </button>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {recentSearches.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setQuery(s)}
                          className="label-xs border border-border px-3 py-2 hover:bg-muted"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : results.length === 0 ? (
              <p className="text-sm text-muted-foreground">No pieces match “{query}”.</p>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((product) => (
                  <li key={product.id}>
                    <button
                      type="button"
                      onClick={() => go(product.slug)}
                      className="flex w-full items-center gap-4 border border-transparent p-2 text-left hover:border-border"
                    >
                      <img src={product.images[0]} alt="" className="h-20 w-16 object-cover" />
                      <span>
                        <span className="block text-base">{product.name}</span>
                        <span className="label-xs block text-muted-foreground">{product.fabric}</span>
                        <span className="mt-1 block text-sm">{inr(product.price)}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
