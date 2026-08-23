/**
 * BURQAS KINGS — single source of truth for the product catalogue.
 * Replace image imports / entries here and the whole site updates.
 */
import productBlack from "@/assets/product-black.jpg";
import productSand from "@/assets/product-sand.jpg";
import editorialEveryday from "@/assets/everyday.jpg";
import editorialSignature from "@/assets/signature.jpg";
import editorialOccasion from "@/assets/occasion.jpg";
import editorialNight from "@/assets/lookbook-2.jpg";

export type CollectionId = "everyday" | "signature" | "occasion" | "the-edit";
export type FabricId = "Nida" | "Crepe" | "Chiffon" | "Premium Blend";
export type SizeId = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type ProductColor = {
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number | null;
  salePrice: number | null;
  description: string;
  images: string[];
  colors: ProductColor[];
  sizes: SizeId[];
  fabric: FabricId;
  collection: CollectionId;
  category: string;
  style: string;
  isNew: boolean;
  isSale: boolean;
  discount: number;
  stock: number;
  rating: number;
  reviewCount: number;
};

export const COLORS: Record<string, ProductColor> = {
  espresso: { name: "Espresso Black", hex: "#171615" },
  sand: { name: "Sand", hex: "#D8CBB9" },
  olive: { name: "Muted Olive", hex: "#6D705D" },
  champagne: { name: "Champagne", hex: "#B8A88A" },
  charcoal: { name: "Charcoal", hex: "#2A211C" },
  ivory: { name: "Ivory", hex: "#F5F1E8" },
};

export const COLLECTIONS: {
  id: CollectionId;
  name: string;
  tagline: string;
  description: string;
  image: string;
}[] = [
  {
    id: "everyday",
    name: "Everyday",
    tagline: "Quiet ease, worn daily",
    description:
      "Weightless nida and soft crepe cut for movement. Pieces built for school runs, long commutes and unhurried afternoons.",
    image: editorialEveryday,
  },
  {
    id: "signature",
    name: "Signature",
    tagline: "The house silhouette",
    description:
      "Our defining line — sculpted shoulders, deep sleeves and a fall that holds its shape from morning to evening.",
    image: editorialSignature,
  },
  {
    id: "occasion",
    name: "Occasion",
    tagline: "For the evenings that matter",
    description:
      "Chiffon layers, hand-finished detail and a restrained shimmer. Ceremony without noise.",
    image: editorialOccasion,
  },
  {
    id: "the-edit",
    name: "The Edit",
    tagline: "A small, considered selection",
    description:
      "Limited cuts and material experiments from the atelier, released in short runs.",
    image: editorialNight,
  },
];

export const SIZES: SizeId[] = ["XS", "S", "M", "L", "XL", "XXL"];
export const FABRICS: FabricId[] = ["Nida", "Crepe", "Chiffon", "Premium Blend"];
export const STYLES = ["Closed", "Open Front", "Kaftan", "Layered"] as const;

const IMG = {
  black: productBlack,
  sand: productSand,
  everyday: editorialEveryday,
  signature: editorialSignature,
  occasion: editorialOccasion,
  night: editorialNight,
};

type Seed = [
  name: string,
  price: number,
  collection: CollectionId,
  fabric: FabricId,
  style: string,
  colorKeys: string[],
  imageKeys: (keyof typeof IMG)[],
  flags: { isNew?: boolean; sale?: number; stock?: number },
];

const SEEDS: Seed[] = [
  ["Noor", 4890, "signature", "Nida", "Closed", ["espresso", "sand", "olive"], ["black", "signature", "everyday"], { isNew: true }],
  ["Aya", 3990, "everyday", "Crepe", "Open Front", ["sand", "champagne"], ["sand", "everyday"], {}],
  ["Safa", 5490, "signature", "Crepe", "Layered", ["espresso", "charcoal"], ["signature", "black"], { sale: 15 }],
  ["Maryam", 7290, "occasion", "Chiffon", "Layered", ["champagne", "ivory"], ["occasion", "sand"], { isNew: true }],
  ["Lina", 3490, "everyday", "Nida", "Closed", ["espresso", "sand"], ["black", "everyday"], {}],
  ["Zahra", 6890, "occasion", "Premium Blend", "Kaftan", ["champagne", "olive"], ["occasion", "night"], {}],
  ["Hana", 4290, "everyday", "Crepe", "Closed", ["olive", "sand"], ["sand", "everyday"], { sale: 20 }],
  ["Amira", 8490, "the-edit", "Premium Blend", "Layered", ["espresso", "charcoal"], ["night", "signature"], { isNew: true }],
  ["Inaya", 4590, "signature", "Nida", "Open Front", ["espresso", "olive"], ["black", "signature"], {}],
  ["Ayla", 5290, "occasion", "Chiffon", "Kaftan", ["ivory", "champagne"], ["occasion", "sand"], {}],
  ["Mira", 3790, "everyday", "Nida", "Closed", ["sand", "ivory"], ["sand", "everyday"], { stock: 3 }],
  ["Hiba", 6190, "signature", "Crepe", "Layered", ["charcoal", "olive"], ["signature", "night"], { sale: 10 }],
  ["Dania", 4990, "the-edit", "Crepe", "Open Front", ["olive", "espresso"], ["signature", "black"], { isNew: true }],
  ["Rania", 7890, "occasion", "Premium Blend", "Layered", ["champagne", "charcoal"], ["occasion", "night"], {}],
  ["Sana", 3290, "everyday", "Nida", "Closed", ["espresso", "sand"], ["black", "everyday"], { sale: 25 }],
  ["Yusra", 5690, "signature", "Premium Blend", "Closed", ["espresso", "champagne"], ["black", "signature"], {}],
  ["Malak", 6490, "occasion", "Chiffon", "Kaftan", ["ivory", "sand"], ["occasion", "sand"], { isNew: true }],
  ["Nida", 3890, "everyday", "Nida", "Open Front", ["sand", "olive"], ["sand", "everyday"], {}],
  ["Iman", 5990, "the-edit", "Crepe", "Layered", ["charcoal", "espresso"], ["night", "black"], { stock: 2 }],
  ["Salma", 4390, "everyday", "Crepe", "Closed", ["olive", "espresso"], ["everyday", "black"], {}],
  ["Rimsha", 7490, "occasion", "Premium Blend", "Layered", ["champagne", "ivory"], ["occasion", "sand"], { sale: 12 }],
  ["Areeba", 4790, "signature", "Nida", "Closed", ["espresso", "charcoal"], ["black", "signature"], {}],
  ["Zoya", 8990, "the-edit", "Chiffon", "Kaftan", ["champagne", "olive"], ["night", "occasion"], { isNew: true }],
  ["Farah", 4190, "everyday", "Crepe", "Open Front", ["sand", "champagne"], ["sand", "everyday"], {}],
];

const DESCRIPTIONS: Record<CollectionId, string> = {
  everyday:
    "An unlined, easy-fall silhouette drafted for daily wear. The shoulder sits soft, the sleeve moves freely and the hem clears the floor by a considered inch.",
  signature:
    "The house cut. A defined shoulder line, generous sleeve and a long, uninterrupted drop that holds its architecture through the day.",
  occasion:
    "Layered for evening. A fluid base under sheer overlay, finished by hand at the cuff and hem so the movement stays quiet.",
  "the-edit":
    "A short-run piece from the atelier. Made in small numbers, with material and construction details we are still exploring.",
};

export const products: Product[] = SEEDS.map((seed, index) => {
  const [name, price, collection, fabric, style, colorKeys, imageKeys, flags] = seed;
  const discount = flags.sale ?? 0;
  const isSale = discount > 0;
  const salePrice = isSale ? Math.round((price * (100 - discount)) / 100 / 10) * 10 : null;

  return {
    id: `BK-${String(index + 1).padStart(3, "0")}`,
    name,
    slug: name.toLowerCase(),
    price: salePrice ?? price,
    originalPrice: isSale ? price : null,
    salePrice,
    description: DESCRIPTIONS[collection],
    images: imageKeys.map((key) => IMG[key]),
    colors: colorKeys.map((key) => COLORS[key]),
    sizes: SIZES.slice(0, index % 3 === 0 ? 6 : 5),
    fabric,
    collection,
    category: collection === "occasion" ? "Occasion Burqa" : "Burqa",
    style,
    isNew: Boolean(flags.isNew),
    isSale,
    discount,
    stock: flags.stock ?? 8 + ((index * 3) % 20),
    rating: Number((4.3 + ((index % 6) * 0.1)).toFixed(1)),
    reviewCount: 12 + ((index * 7) % 140),
  };
});

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const getRelated = (product: Product, count = 4) =>
  products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      const score = (p: Product) =>
        (p.collection === product.collection ? 2 : 0) + (p.fabric === product.fabric ? 1 : 0);
      return score(b) - score(a);
    })
    .slice(0, count);

export const searchProducts = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    [p.name, p.fabric, p.collection, p.category, p.style, ...p.colors.map((c) => c.name)]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
};

export const PRICE_BOUNDS = {
  min: Math.min(...products.map((p) => p.price)),
  max: Math.max(...products.map((p) => p.price)),
};
