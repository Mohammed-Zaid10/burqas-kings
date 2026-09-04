import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PROMO_CODES, SHIPPING } from "@/data/content";
import { products, type Product } from "@/data/products";

export type CartItem = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
};

export type Order = {
  id: string;
  createdAt: string;
  items: CartItem[];
  total: number;
  email: string;
  name: string;
  address: string;
  paymentMethod: string;
  stage: number;
  estimatedDelivery: string;
};

type ShopState = {
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  promo: string | null;
  recentSearches: string[];
  searchOpen: boolean;
  cartOpen: boolean;
  hydrated: boolean;
};

type ShopContextValue = ShopState & {
  addToCart: (product: Product, color: string, size: string, quantity?: number) => void;
  removeFromCart: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  applyPromo: (code: string) => { ok: boolean; message: string };
  clearPromo: () => void;
  addRecentSearch: (term: string) => void;
  clearRecentSearches: () => void;
  setSearchOpen: (open: boolean) => void;
  setCartOpen: (open: boolean) => void;
  placeOrder: (details: Omit<Order, "id" | "createdAt" | "items" | "total" | "stage" | "estimatedDelivery">) => Order;
  totals: {
    subtotal: number;
    discount: number;
    shipping: number;
    tax: number;
    total: number;
    count: number;
    freeShippingRemaining: number;
  };
  wishlistProducts: Product[];
};

const STORAGE_KEY = "burqas-kings-state-v1";

const ShopContext = createContext<ShopContextValue | null>(null);

const DEMO_ORDER: Order = {
  id: "BK-2026-1042",
  createdAt: "2026-08-05T10:15:00.000Z",
  items: [
    {
      key: "demo-1",
      productId: products[0]!.id,
      slug: products[0]!.slug,
      name: products[0]!.name,
      image: products[0]!.images[0]!,
      price: products[0]!.price,
      color: products[0]!.colors[0].name,
      size: "M",
      quantity: 1,
    },
  ],
  total: products[0]!.price + 250,
  email: "demo@burqaskings.example",
  name: "Demo Customer",
  address: "12 Atelier Lane, Mumbai 400001",
  paymentMethod: "UPI",
  stage: 3,
  estimatedDelivery: "2026-08-28",
};

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ShopState>({
    cart: [],
    wishlist: [],
    orders: [DEMO_ORDER],
    promo: null,
    recentSearches: [],
    searchOpen: false,
    cartOpen: false,
    hydrated: false,
  });

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const saved = raw ? JSON.parse(raw) : null;
      setState((prev) => ({
        ...prev,
        cart: saved?.cart ?? [],
        wishlist: saved?.wishlist ?? [],
        orders: saved?.orders?.length ? saved.orders : [DEMO_ORDER],
        promo: saved?.promo ?? null,
        recentSearches: saved?.recentSearches ?? [],
        hydrated: true,
      }));
    } catch {
      setState((prev) => ({ ...prev, hydrated: true }));
    }
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    const { cart, wishlist, orders, promo, recentSearches } = state;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ cart, wishlist, orders, promo, recentSearches }),
      );
    } catch {
      /* storage unavailable */
    }
  }, [state]);

  const addToCart: ShopContextValue["addToCart"] = useCallback(
    (product, color, size, quantity = 1) => {
      const key = `${product.id}-${color}-${size}`;
      setState((prev) => {
        const existing = prev.cart.find((item) => item.key === key);
        const cart = existing
          ? prev.cart.map((item) =>
              item.key === key ? { ...item, quantity: item.quantity + quantity } : item,
            )
          : [
              ...prev.cart,
              {
                key,
                productId: product.id,
                slug: product.slug,
                name: product.name,
                image: product.images[0] ?? "",
                price: product.price,
                color,
                size,
                quantity,
              },
            ];
        return { ...prev, cart };
      });
    },
    [],
  );

  const removeFromCart = useCallback((key: string) => {
    setState((prev) => ({ ...prev, cart: prev.cart.filter((item) => item.key !== key) }));
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setState((prev) => ({
      ...prev,
      cart:
        quantity <= 0
          ? prev.cart.filter((item) => item.key !== key)
          : prev.cart.map((item) => (item.key === key ? { ...item, quantity } : item)),
    }));
  }, []);

  const clearCart = useCallback(() => setState((prev) => ({ ...prev, cart: [], promo: null })), []);

  const toggleWishlist = useCallback((productId: string) => {
    setState((prev) => ({
      ...prev,
      wishlist: prev.wishlist.includes(productId)
        ? prev.wishlist.filter((id) => id !== productId)
        : [...prev.wishlist, productId],
    }));
  }, []);

  const applyPromo = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase();
    if (!PROMO_CODES[normalized]) {
      return { ok: false, message: "That code isn't recognised." };
    }
    setState((prev) => ({ ...prev, promo: normalized }));
    return { ok: true, message: PROMO_CODES[normalized].label };
  }, []);

  const clearPromo = useCallback(() => setState((prev) => ({ ...prev, promo: null })), []);

  const addRecentSearch = useCallback((term: string) => {
    const value = term.trim();
    if (!value) return;
    setState((prev) => ({
      ...prev,
      recentSearches: [value, ...prev.recentSearches.filter((t) => t !== value)].slice(0, 6),
    }));
  }, []);

  const clearRecentSearches = useCallback(
    () => setState((prev) => ({ ...prev, recentSearches: [] })),
    [],
  );

  const setSearchOpen = useCallback(
    (open: boolean) => setState((prev) => ({ ...prev, searchOpen: open })),
    [],
  );
  const setCartOpen = useCallback(
    (open: boolean) => setState((prev) => ({ ...prev, cartOpen: open })),
    [],
  );

  const totals = useMemo(() => {
    const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const promo = state.promo ? PROMO_CODES[state.promo] : null;
    const discount = !promo
      ? 0
      : promo.type === "percent"
        ? Math.round((subtotal * promo.value) / 100)
        : Math.min(promo.value, subtotal);
    const afterDiscount = Math.max(subtotal - discount, 0);
    const shipping =
      subtotal === 0 ? 0 : afterDiscount >= SHIPPING.freeThreshold ? 0 : SHIPPING.flatRate;
    const tax = Math.round(afterDiscount * SHIPPING.taxRate);
    return {
      subtotal,
      discount,
      shipping,
      tax,
      total: afterDiscount + shipping + tax,
      count: state.cart.reduce((sum, item) => sum + item.quantity, 0),
      freeShippingRemaining: Math.max(SHIPPING.freeThreshold - afterDiscount, 0),
    };
  }, [state.cart, state.promo]);

  const placeOrder: ShopContextValue["placeOrder"] = useCallback(
    (details) => {
      const order: Order = {
        ...details,
        id: `BK-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
        items: state.cart,
        total: totals.total,
        stage: 1,
        estimatedDelivery: new Date(Date.now() + 5 * 864e5).toISOString(),
      };
      setState((prev) => ({ ...prev, orders: [order, ...prev.orders], cart: [], promo: null }));
      return order;
    },
    [state.cart, totals.total],
  );

  const wishlistProducts = useMemo(
    () => products.filter((p) => state.wishlist.includes(p.id)),
    [state.wishlist],
  );

  const value: ShopContextValue = {
    ...state,
    addToCart,
    removeFromCart,
    setQuantity,
    clearCart,
    toggleWishlist,
    isWishlisted: (id) => state.wishlist.includes(id),
    applyPromo,
    clearPromo,
    addRecentSearch,
    clearRecentSearches,
    setSearchOpen,
    setCartOpen,
    placeOrder,
    totals,
    wishlistProducts,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
