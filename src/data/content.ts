import lookbook1 from "@/assets/lookbook-1.jpg";
import lookbook2 from "@/assets/lookbook-2.jpg";
import everyday from "@/assets/everyday.jpg";
import signature from "@/assets/signature.jpg";
import occasion from "@/assets/occasion.jpg";
import fabricImg from "@/assets/fabric.jpg";
import storyImg from "@/assets/story.jpg";

export const IMAGES = {
  lookbook1,
  lookbook2,
  everyday,
  signature,
  occasion,
  fabric: fabricImg,
  story: storyImg,
};

export type Fabric = {
  id: string;
  name: string;
  summary: string;
  texture: string;
  weight: string;
  drape: string;
  breathability: string;
  opacity: string;
  care: string[];
};

export const fabrics: Fabric[] = [
  {
    id: "nida",
    name: "Nida",
    summary: "The everyday workhorse — matte, opaque and quietly structured.",
    texture: "Smooth matte face with a dry hand",
    weight: "Medium — 165 gsm",
    drape: "Soft column, holds a straight fall",
    breathability: "High",
    opacity: "Fully opaque",
    care: ["Machine wash cold on gentle", "Do not bleach", "Warm iron on reverse", "Line dry in shade"],
  },
  {
    id: "crepe",
    name: "Crepe",
    summary: "A fine grain surface that moves with you and resists creasing.",
    texture: "Subtle pebbled grain",
    weight: "Light — 140 gsm",
    drape: "Fluid with gentle swing",
    breathability: "High",
    opacity: "Opaque",
    care: ["Hand wash or gentle cycle", "Reshape while damp", "Cool iron", "Dry flat"],
  },
  {
    id: "chiffon",
    name: "Chiffon",
    summary: "Sheer overlay fabric reserved for occasion layering.",
    texture: "Airy, near weightless",
    weight: "Very light — 60 gsm",
    drape: "Floating, catches movement",
    breathability: "Very high",
    opacity: "Sheer — always layered",
    care: ["Dry clean recommended", "Do not wring", "Steam only", "Store on a padded hanger"],
  },
  {
    id: "premium-blend",
    name: "Premium Blend",
    summary: "Our house blend — the fall of crepe with the resilience of nida.",
    texture: "Silk-touch with matte finish",
    weight: "Medium light — 155 gsm",
    drape: "Sculptural, returns to shape",
    breathability: "High",
    opacity: "Fully opaque",
    care: ["Dry clean or hand wash cold", "Do not tumble dry", "Warm iron on reverse", "Store folded"],
  },
];

export type Look = {
  id: string;
  index: string;
  title: string;
  note: string;
  image: string;
  productSlugs: string[];
};

export const looks: Look[] = [
  {
    id: "the-everyday",
    index: "01",
    title: "The Everyday",
    note: "Sand nida, low light, no occasion required.",
    image: everyday,
    productSlugs: ["aya", "lina", "mira", "nida"],
  },
  {
    id: "after-dark",
    index: "02",
    title: "After Dark",
    note: "Satin-touch blends and a deliberate silhouette for evening.",
    image: lookbook2,
    productSlugs: ["amira", "iman", "hiba"],
  },
  {
    id: "signature",
    index: "03",
    title: "Signature",
    note: "The house cut, photographed against a single light.",
    image: signature,
    productSlugs: ["noor", "safa", "yusra", "areeba"],
  },
  {
    id: "occasion",
    index: "04",
    title: "Occasion",
    note: "Chiffon layering, hand finishing, dusk.",
    image: occasion,
    productSlugs: ["maryam", "zahra", "malak", "rimsha"],
  },
];

export type Article = {
  slug: string;
  title: string;
  category: "Style" | "Fabric" | "Guides" | "Behind the Brand" | "Editorial";
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  body: string[];
};

export const articles: Article[] = [
  {
    slug: "the-language-of-drape",
    title: "The Language of Drape",
    category: "Editorial",
    excerpt:
      "Why the way a fabric falls says more about a garment than any embellishment ever could.",
    date: "2026-07-18",
    readTime: "6 min",
    image: fabricImg,
    body: [
      "Drape is the first thing you notice and the last thing you can fake. Before a colour registers, before a cuff detail is read, the eye has already measured how a garment moves through space.",
      "In our studio we test every metre by hanging it for seventy-two hours. Fabric that collapses is returned. Fabric that holds a soft column stays.",
      "The result is a wardrobe that reads as calm. Nothing is fighting the body; everything is falling with it.",
    ],
  },
  {
    slug: "nida-versus-crepe",
    title: "Nida or Crepe: Choosing Your Base",
    category: "Fabric",
    excerpt: "Two house fabrics, two very different days. A practical comparison.",
    date: "2026-06-02",
    readTime: "4 min",
    image: fabricImg,
    body: [
      "Nida is the fabric we recommend for a first Burqas Kings piece. It is opaque, matte and forgiving — it travels well and photographs quietly.",
      "Crepe is lighter and more expressive. It swings. If you spend your days moving between rooms, meetings and streets, crepe will feel more alive.",
      "Neither is more formal than the other. Formality lives in the cut, not the cloth.",
    ],
  },
  {
    slug: "measuring-at-home",
    title: "How to Measure at Home",
    category: "Guides",
    excerpt: "Three measurements, one tape, five minutes. Get your size right the first time.",
    date: "2026-05-21",
    readTime: "5 min",
    image: storyImg,
    body: [
      "Stand relaxed against a wall in the shoes you would usually wear. Have someone else hold the tape if you can.",
      "Measure shoulder to floor for length, across the back for shoulder width, and the fullest part of the bust without compressing.",
      "Compare against our size chart, then size up if you prefer a relaxed fall. Our cuts already allow generous ease.",
    ],
  },
  {
    slug: "inside-the-atelier",
    title: "Inside the Atelier",
    category: "Behind the Brand",
    excerpt: "A morning with the team who cut, pin and finish every Burqas Kings piece.",
    date: "2026-04-09",
    readTime: "7 min",
    image: storyImg,
    body: [
      "The room is quiet before eight. Bolts are stacked by weight rather than colour, which tells you something about how the team thinks.",
      "Each piece passes through four pairs of hands. The last pair does nothing but check hems.",
      "We produce in short runs. It is slower, and it is the only way we know how to keep the standard.",
    ],
  },
  {
    slug: "black-is-not-one-colour",
    title: "Black Is Not One Colour",
    category: "Style",
    excerpt: "Espresso, charcoal, true black — how to build a wardrobe in a single shade.",
    date: "2026-03-14",
    readTime: "5 min",
    image: lookbook2,
    body: [
      "Worn together, three blacks read as depth rather than repetition. The trick is contrast in finish, not in hue.",
      "Pair a matte nida base with a satin-touch overlay and the outfit gains dimension without a single additional colour.",
      "If you own one piece in espresso and one in charcoal, you already have a layered wardrobe.",
    ],
  },
  {
    slug: "dressing-for-long-days",
    title: "Dressing for Long Days",
    category: "Style",
    excerpt: "What to wear when the day starts at dawn and ends somewhere formal.",
    date: "2026-02-01",
    readTime: "4 min",
    image: everyday,
    body: [
      "Choose a base that does not crease. Crepe and our premium blend both recover from a full day seated.",
      "Keep one occasion layer folded in your bag. A chiffon overlay weighs almost nothing and changes the register of an outfit instantly.",
      "Comfort is not the opposite of formality. It is the requirement for it.",
    ],
  },
];

export const faqs = [
  {
    q: "How long does delivery take?",
    a: "Metro cities receive orders in 2–4 working days. Other pin codes take 4–7 working days. You will receive tracking as soon as the parcel leaves the atelier.",
  },
  {
    q: "What is your returns policy?",
    a: "Unworn pieces with tags intact can be returned within 14 days of delivery. Occasion pieces that have been altered are final sale.",
  },
  {
    q: "Do you offer alterations?",
    a: "Yes. Length adjustments are offered at no cost on Signature and Occasion pieces. Add a note at checkout and our team will contact you.",
  },
  {
    q: "How do I choose a size?",
    a: "Use the interactive size finder on our Size & Fit page, or write to us with your height and preferred fit and we will recommend a size.",
  },
  {
    q: "Are the fabrics prayer friendly?",
    a: "All base fabrics are fully opaque and breathable. Chiffon is only ever used as an overlay above an opaque base.",
  },
];

export const CONTACT = {
  email: "hello@burqaskings.example",
  phone: "+91 00000 00000",
  hours: "Monday to Saturday, 10:00 – 18:00 IST",
  address: "Atelier address — placeholder, replace before launch",
  instagram: "@burqaskings",
};

/** Promo codes — configurable. */
export const PROMO_CODES: Record<string, { type: "percent" | "flat"; value: number; label: string }> = {
  WELCOME10: { type: "percent", value: 10, label: "10% off your first order" },
  NEWCOLLECTION: { type: "percent", value: 15, label: "15% off the new collection" },
  FIRSTORDER: { type: "flat", value: 500, label: "₹500 off your first order" },
};

export const SHIPPING = {
  freeThreshold: 5000,
  flatRate: 99,
  taxRate: 0.05,
};

export const TRACKING_STAGES = [
  "Ordered",
  "Confirmed",
  "Packed",
  "Shipped",
  "Out for delivery",
  "Delivered",
] as const;
