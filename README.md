# Burqas Kings Launch

Build a complete, premium, production-quality ecommerce website for a modern burqa and modest-fashion brand called:

BURQAS KINGS

This is NOT a simple landing page.

Build a complete multi-page ecommerce web application with a luxury fashion identity, immersive editorial layouts, smooth interactions, responsive design, reusable components, centralized product data, cart, wishlist, search, filtering, checkout, customer account and order tracking.

The website should feel like a combination of:

LUXURY FASHION HOUSE
+
EDITORIAL FASHION MAGAZINE
+
MODERN ECOMMERCE
+
INTERACTIVE CREATIVE WEBSITE

The website must feel original and memorable.

DO NOT copy any existing website.

DO NOT create a generic Shopify-style template.

DO NOT use excessive rounded cards.

DO NOT use neon colors.

DO NOT use cheap-looking promotional graphics.

DO NOT use obvious AI-generated fashion imagery.

==================================================
01 — BRAND IDENTITY

Brand name:

BURQAS KINGS

Create a sophisticated wordmark-style logo using:

BURQAS
KINGS

The word "BURQAS" should have strong editorial typography.

"KINGS" can be smaller with increased letter spacing.

The brand should communicate:

Elegance
Confidence
Modesty
Quality
Craftsmanship
Modern fashion

Create a premium visual identity that works on both light and dark backgrounds.

==================================================
02 — COLOR PALETTE

Primary background:

Warm Ivory
#F5F1E8

Primary dark:

Espresso
#2A211C

Deep background:

Charcoal
#171615

Secondary:

Sand
#D8CBB9

Accent:

Muted Olive
#6D705D

Very subtle premium accent:

Champagne
#B8A88A

Do NOT use neon colors.

Do NOT use bright blue ecommerce colors.

Do NOT overuse gold.

Do NOT use excessive gradients.

The overall visual appearance should be warm, sophisticated and expensive.

==================================================
03 — TYPOGRAPHY

Use two font families.

DISPLAY:

Cormorant Garamond or DM Serif Display.

Use for:

hero headlines

editorial statements

collection names

major headings

BODY:

Inter or Manrope.

Use for:

navigation

product information

descriptions

buttons

forms

metadata

Use strong contrast between large editorial typography and clean UI typography.

Use uppercase small labels with subtle letter spacing.

==================================================
04 — GLOBAL DESIGN LANGUAGE

Every page must feel like the same brand.

Create centralized design tokens for:

Colors
Typography
Spacing
Grid
Borders
Radius
Shadows
Transitions
Breakpoints

Do not hard-code visual styles separately on every page.

Create reusable components.

==================================================
05 — NAVIGATION

Create one global navigation component.

Desktop:

Left:
BURQAS KINGS

Center:
SHOP
COLLECTIONS
LOOKBOOK
OUR STORY
JOURNAL

Right:
SEARCH
WISHLIST
BAG

Navigation should initially feel lightweight and editorial.

When scrolling:

become slightly opaque

subtle backdrop blur

reduce height

smooth transition

Mobile:

Menu
BURQAS KINGS
Bag

Create a fullscreen mobile menu.

Menu items:

SHOP
COLLECTIONS
NEW ARRIVALS
LOOKBOOK
OUR STORY
JOURNAL
CONTACT

Animate menu items elegantly.

==================================================
06 — HOME PAGE

Create a cinematic homepage.

HERO:

Large fullscreen editorial composition.

Headline:

"MODEST.
DEFINED."

Supporting text:

"Contemporary burqas designed around elegance, comfort and confidence."

Small label:

"BURQAS KINGS — 2026"

CTA:

EXPLORE COLLECTION

Use a large realistic fashion image.

Add subtle image movement while scrolling.

Do not use fake-looking AI models.

SECTION:

"MADE FOR
EVERY MOMENT."

Show:

EVERYDAY
SIGNATURE
OCCASION

Use large editorial images.

SECTION:

FEATURED PIECES

Use an interactive horizontal product section.

SECTION:

Brand statement:

"MODESTY IS NOT
A LIMIT.
IT IS A LANGUAGE."

SECTION:

THE SIGNATURE EDIT

Large image + text.

SECTION:

FABRIC EXPERIENCE

Interactive fabric categories:

NIDA
CREPE
CHIFFON
PREMIUM BLEND

SECTION:

LOOKBOOK

Large editorial campaign imagery.

SECTION:

OUR STORY

"DESIGNED FOR
THE WAY YOU LIVE."

SECTION:

Newsletter.

Footer.

==================================================
07 — SHOP PAGE

Route:

/shop

Create a real product catalogue.

Use editorial product layouts rather than generic ecommerce cards.

Filters:

Collection
Color
Fabric
Size
Style
Price

Sorting:

Featured
Newest
Price Low → High
Price High → Low

Products should support:

Wishlist
Quick View
Color selection
Add to Bag

Use responsive product layouts.

==================================================
08 — COLLECTIONS

Route:

/collections

Create immersive collection sections.

Collections:

EVERYDAY
SIGNATURE
OCCASION
THE EDIT

Use large fullscreen editorial compositions.

Each collection must connect to actual products.

CTA:

SHOP COLLECTION

Use subtle scroll-based transitions.

==================================================
09 — PRODUCT DETAIL

Route:

/product/:slug

Create a premium product detail experience.

Display:

Product images
Product name
Price
Colors
Sizes
Fabric
Description
Stock
Reviews

Large image gallery.

Interactions:

Image zoom
Image switching
Thumbnail navigation
Swipe on mobile

Color selector.

Size selector.

Quantity selector.

Buttons:

ADD TO BAG
BUY NOW

Wishlist.

Sections:

DESCRIPTION
FABRIC & FEEL
FIT & SIZING
CARE
SHIPPING & RETURNS

Related products.

"COMPLETE THE LOOK"

==================================================
10 — NEW ARRIVALS

Route:

/new-arrivals

Automatically show products marked:

isNew = true

Create an editorial fashion-launch layout.

Large featured product.

Product grid.

Filters and sorting.

==================================================
11 — SALE

Route:

/sale

Show products marked:

isSale = true

Display:

Original price
Sale price
Discount

Keep the design premium.

Do NOT use flashing sale graphics.

Do NOT use aggressive red discount banners.

==================================================
12 — LOOKBOOK

Route:

/lookbook

Create an immersive digital fashion magazine.

Large editorial imagery.

Looks:

01 — THE EVERYDAY
02 — AFTER DARK
03 — SIGNATURE
04 — OCCASION

Each look should connect to actual products.

CTA:

SHOP THIS LOOK

Use different image compositions and subtle scroll effects.

==================================================
13 — SEARCH

Route:

/search

Create fullscreen search.

Search products by:

Name
Color
Fabric
Collection
Category

Show:

Popular searches
Live results
Recent searches
No results

Clicking a result opens the correct product.

==================================================
14 — WISHLIST

Route:

/wishlist

Create global wishlist state.

Users can save products from:

Home
Shop
Collections
Product pages
New Arrivals
Sale
Lookbook

Persist wishlist using localStorage for the initial version.

Empty state:

"NOTHING SAVED.
YET."

CTA:

EXPLORE BURQAS

==================================================
15 — CART

Route:

/cart

Create functional cart.

Support:

Add item
Remove item
Quantity changes
Variant information
Subtotal
Discount
Shipping
Tax
Total

Free shipping:

Orders above ₹5,000 → FREE

Below ₹5,000:

₹99 shipping

Show a dynamic free-shipping progress indicator.

Promo codes:

WELCOME10
NEWCOLLECTION
FIRSTORDER

Make these configurable.

==================================================
16 — CHECKOUT

Route:

/checkout

Create a clean, distraction-free checkout.

Sections:

CONTACT
DELIVERY
PAYMENT

Fields:

Name
Email
Phone
Address
City
State
PIN
Country

Payment options:

UPI
Credit/Debit Card
Net Banking
Wallet
Cash on Delivery

IMPORTANT:

Do NOT fake real payment processing.

Create the architecture for future Razorpay/Stripe integration.

For development, create a clearly simulated payment flow.

==================================================
17 — ORDER CONFIRMATION

After successful simulated checkout:

Show:

"ORDER CONFIRMED"

Order number.

Products.

Total.

Estimated delivery.

Buttons:

TRACK ORDER
CONTINUE SHOPPING

==================================================
18 — CUSTOMER ACCOUNT

Route:

/account

Create:

Overview
Orders
Wishlist
Addresses
Account Details
Preferences

For initial version, use local/demo account state.

Keep architecture ready for real authentication later.

==================================================
19 — ORDER TRACKING

Route:

/track-order

Allow users to enter:

Order Number

Show:

ORDERED
CONFIRMED
PACKED
SHIPPED
OUT FOR DELIVERY
DELIVERED

Show estimated delivery.

Create realistic demo tracking data.

==================================================
20 — SIZE & FIT

Route:

/size-guide

Create an interactive size finder.

Ask:

Height
Preferred fit
Silhouette

Optional:

Bust
Shoulder
Sleeve

Recommend:

XS
S
M
L
XL
XXL

Also include:

Size chart
How to measure
Fit explanations
Length guide

==================================================
21 — FABRIC & CARE

Route:

/fabric-care

Create interactive fabric exploration.

Fabrics:

NIDA
CREPE
CHIFFON
PREMIUM BLEND

Show:

Texture
Weight
Drape
Breathability
Opacity
Care instructions

Connect fabrics to real products.

==================================================
22 — OUR STORY

Route:

/our-story

Create an emotional editorial story.

Hero:

"MORE THAN
A GARMENT."

Main statement:

"WE BELIEVE
MODESTY CAN
BE MODERN."

Sections:

Origin
Craft
Materials
Design philosophy
Brand promise

Principles:

COMFORT
SIMPLICITY
CRAFT
CONFIDENCE

Use large authentic imagery.

==================================================
23 — JOURNAL

Route:

/journal

Create an editorial fashion magazine.

Categories:

STYLE
FABRIC
GUIDES
BEHIND THE BRAND
EDITORIAL

Create realistic sample articles.

Each article should have:

Image
Category
Title
Excerpt
Date
Read time

Create article detail routes.

==================================================
24 — CONTACT

Route:

/contact

Create:

Contact form
FAQ
Order support
Product questions
Size support
General enquiries

Do not invent real company information.

Use editable placeholder contact information.

==================================================
25 — GLOBAL PRODUCT DATA

Create a centralized product database/data layer.

Create at least 24 realistic sample products.

Each product:

id
name
slug
price
originalPrice
salePrice
description
images
colors
sizes
fabric
collection
category
isNew
isSale
discount
stock
rating
reviewCount

Example names:

Noor
Aya
Safa
Maryam
Lina
Zahra
Hana
Amira
Inaya
Ayla
Mira
Hiba

Make all data easy to replace later.

==================================================
26 — GLOBAL CART STATE

Create centralized cart state.

Cart must work across the entire website.

Adding a product anywhere updates:

Cart count
Cart drawer
Cart page
Checkout

Persist cart using localStorage.

Do not store sensitive payment information.

==================================================
27 — GLOBAL WISHLIST STATE

Create centralized wishlist state.

Persist using localStorage.

Update wishlist count everywhere.

==================================================
28 — SEARCH + FILTERING

Search and filters must use the same centralized product data.

No duplicated product datasets.

==================================================
29 — ANIMATION SYSTEM

Create one consistent animation system.

Use:

Smooth scrolling
Image reveals
Typography reveals
Subtle parallax
Horizontal scrolling
Page transitions
Hover interactions
Magnetic buttons where appropriate

Animations should feel:

Slow
Elegant
Precise
Premium

Avoid:

Bouncy animations
Excessive effects
Long loading animations
Unnecessary motion

Respect:

prefers-reduced-motion

==================================================
30 — IMAGE STYLE

Product photography should look like a professional fashion campaign.

Maintain consistency in:

Lighting
Background
Image ratio
Color treatment
Model styling
Product proportions

Do NOT use obvious AI-generated imagery.

If image assets are unavailable, create clearly replaceable image placeholders rather than relying on inconsistent random images.

==================================================
31 — RESPONSIVE DESIGN

Fully responsive.

Desktop:
1440px+
Immersive editorial experience.

Tablet:
768–1439px.

Mobile:
390–767px.

Test approximately:

390px
430px
768px
1024px
1440px
1920px

No horizontal overflow.

Mobile must be intentionally designed.

==================================================
32 — ACCESSIBILITY

Implement:

Semantic HTML
Keyboard navigation
Focus states
ARIA labels
Alt text
Accessible forms
Readable contrast
Touch targets around 44px minimum
Reduced-motion support

==================================================
33 — PERFORMANCE

Optimize the application.

Use:

Lazy-loaded images
Responsive images
WebP/AVIF where possible
Code splitting
Reusable components
Efficient animations

Do not load heavy 3D/WebGL libraries globally.

Only use advanced effects where they improve the experience.

==================================================
34 — SEO

Create:

Unique page titles
Meta descriptions
Open Graph metadata
Semantic headings
Clean URLs
Product metadata

Dynamic product pages should have dynamic titles and descriptions.

==================================================
35 — FOOTER

Create one reusable footer.

BURQAS KINGS

SHOP
Burqas
New Arrivals
Collections
Sale

DISCOVER
Lookbook
Our Story
Journal

CUSTOMER CARE
Size Guide
Fabric & Care
Shipping
Returns
Order Tracking
FAQ

CONTACT
Email
Phone
Social

Newsletter:

"JOIN THE LIST"

==================================================
36 — ERROR / EMPTY STATES

Create beautiful states for:

Empty cart
Empty wishlist
No search results
Product not found
Order not found
Out of stock
Invalid promo
Form errors
Loading
Payment failure

All states must use the same Burqas Kings visual identity.

==================================================
37 — COMPONENT ARCHITECTURE

Create reusable components:

Header
MobileMenu
Footer
Button
ProductCard
ProductGrid
ProductGallery
WishlistButton
CartDrawer
SearchOverlay
FilterPanel
QuickView
Modal
Toast
Accordion
Input
Select
ProductSwatches
SizeSelector
PageTransition
EditorialImage
HorizontalScroller
Newsletter
Breadcrumbs

Do not duplicate components.

==================================================
38 — FINAL EXPERIENCE

The final website should feel like:

A PREMIUM BURQA FASHION HOUSE

not:

a basic clothing store.

The first impression should be:

"BURQAS KINGS feels different."

The website should be memorable because of:

Typography
Photography
Composition
Motion
Interaction
Storytelling
Product presentation

Not because of excessive effects.

==================================================
39 — DEVELOPMENT QUALITY

Before considering the project complete, test this complete flow:

HOME
→ SHOP
→ FILTER
→ PRODUCT
→ COLOR
→ SIZE
→ ADD TO BAG
→ CONTINUE SHOPPING
→ WISHLIST
→ CART
→ QUANTITY
→ PROMO CODE
→ CHECKOUT
→ SIMULATED PAYMENT
→ ORDER CONFIRMATION
→ ORDER TRACKING
→ ACCOUNT
→ ORDERS

Fix:

Broken routes
Console errors
Broken buttons
Broken images
State inconsistencies
Mobile layout problems
Overflow issues

Do not leave dead buttons.

Do not claim simulated functionality is real.

==================================================
40 — MOST IMPORTANT INSTRUCTION

BUILD THIS AS ONE CONNECTED APPLICATION.

Do not create 18 disconnected pages.

Do not generate random designs for individual pages.

Use ONE design system.

Use ONE product data source.

Use ONE cart state.

Use ONE wishlist state.

Use ONE navigation system.

Use ONE animation language.

Use ONE brand identity.

Every page must feel like it belongs to BURQAS KINGS.

Start by creating the application architecture, global design system and reusable components.

Then build all 18 pages using those components.

Prioritize functionality, consistency, performance and premium visual quality.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://burqas-kings.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/eb54b8bc-5b03-45a4-a8a7-97e51573dac8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
