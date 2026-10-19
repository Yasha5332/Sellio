# Sellio PRD

Oct 9, 2026 · @Andy

## Overview

Sellio is an online store website for small online sellers in Myanmar, with an admin dashboard where the owner manages products, stock, orders, and payments.

It is built for owners who now sell through Telegram, TikTok, and Viber and want their own store with cash on delivery, QR payment with receipt approval, and Burmese language.

- **Product type:** e-commerce website, delivered as one separate store per client (assumption: not a multi-tenant platform in v1)
- **Market:** Myanmar, mobile-first
- **Customer:** small online shop owners who already work with digital tools
- **Business model (to confirm):** setup fee plus monthly hosting and support
- **Status of v1:** a portfolio-grade product that can also be tested with one real shop

## Problem and opportunity

Small Myanmar online sellers take orders through chat apps, so orders, stock, and payments are tracked by hand and mistakes cost them money.

- **Chat-based selling:** industry blogs say Telegram is now the main social commerce channel and TikTok the main place where buyers find products ([source](https://easysellapp.com/blogs/wiki/myanmar-ecommerce-cod-shopify-market-guide-2026)).
- **Cash on delivery still leads:** mobile wallets such as KBZPay and Wave Money are growing but have not replaced cash, so fake or failed COD orders are a real cost.
- **Payment gap on global platforms:** Shopify merchants in Myanmar report that KBZ Pay, MPU, and Wave Money are not supported natively ([Shopify community thread](https://community.shopify.com/t/how-can-i-integrate-specific-payment-gateways-like-kbz-pay-mpu-wave-money-into-my-ecommerce-site/21929/10)).
- **Delivery and addresses:** many areas have no standard address system, and sellers rely on local couriers such as Bee Express and Ninja Van Myanmar.
- **Rules:** e-commerce operators, including social sellers, are reported to need registration with the Ministry of Commerce. Rules may change.

**Opportunity:** a store that fits this way of selling (shareable links, COD, QR payment proof, township addresses, Burmese) is easier for a small owner to adopt than a general platform.

The facts above come from blogs and forums, not official sources. Confirm them with five to ten local sellers before building.

## Goals, non-goals and success metrics

Version 1 succeeds if one real shop can take, confirm, and ship orders on Sellio for 30 days without manual database work.

**Goals**

1. Let an owner set up a store and take orders from a phone within one day
2. Support cash on delivery and QR payment with receipt approval
3. Prevent overselling and lost orders
4. Alert the owner on Telegram or email for every new order and receipt
5. Work in Burmese (Unicode) and English

**Non-goals for v1**

- Direct KBZPay, Wave Money, or card gateway integration
- Multi-vendor marketplace or multi-tenant SaaS
- Shopee or TikTok Shop sync, native mobile app, reviews, coupons, advanced analytics

**Success metrics** (proposed targets; adjust after talking to owners)

| Metric | Target | How measured |
| --- | --- | --- |
| Order flow | Browse to paid order works on a phone | Manual test script |
| Overselling | 0 oversold orders when 50 buyers race for the last item | Automated test |
| Receipt review | Owner reaches approve or reject in 3 taps from the alert | Test with 3 owners |
| Speed | Product page loads in under 3 seconds on 4G | Lighthouse check |
| Real use | 1 shop live for 30 days with at least 20 real orders | Order records |
| Quality | Checkout and payment flows covered by automated tests, live public URL | CI report |

## Target users

Sellio has three user roles, and the shop owner is the one who pays and decides.

| Role | Who they are | What they need | Main pain today |
| --- | --- | --- | --- |
| Shop owner | Small online seller using Telegram, TikTok, or Viber | See all orders and stock in one place, confirm payments fast | Orders in chats get lost, fake COD orders, manual stock counts |
| Staff | Person who packs and ships for the owner | Update order status, see what to pack | Needs a simple screen, no access to settings or money reports |
| Customer | Mobile buyer, often arriving from a shared link | Find the product, order in few steps, pay by COD or QR | Unclear price and delivery, no order confirmation, distrust of new shops |

**Role permissions (v1)**

- Owner: everything, including store settings, payment QR, staff accounts, and reports
- Staff: products, stock, orders, and receipt review (owner decides whether staff can approve payments)
- Customer: own account, cart, orders, and receipt upload; guest checkout allowed

Draft persona to validate: *Ma Hnin, 27, sells skincare on TikTok and Telegram from Yangon, takes orders by chat, uses a phone for everything.* This persona is an assumption; replace it with real interview findings.

## Scope

Version 1 covers the full path from product page to a shipped, paid order, and leaves growth features for later.

| Module | In v1 (Launch Core) | Should have (Right after launch) | Later |
| --- | --- | --- | --- |
| Storefront | Home with search & cart & language switch, Ad sliders, Categories with sorting & clear filters & count, Product detail (gallery, variants, live stock, delivery info, share button, related products), Search results (same layout as Categories), Cart, Simple limited-time discount (sale price + end time) | Shop info pages (About, Contact via Telegram/phone, Delivery & Return policy), Wishlist | Reviews and ratings, coupons, algorithmic product recommendations |
| Accounts | Guest checkout, customer sign-up, login, forgot password (phone or email), My Account (name, phone, saved addresses, language) | In-app notification center | Social login, saved payment methods |
| Checkout | Address (region, township, landmark), delivery fee, COD or QR payment selection, Payment page (QR, exact amount, order #, slip upload), Order confirmation | Saved payment references | Abandoned-cart reminders, automated wallet/card APIs |
| Orders | Order list with status, order detail page with tracking & "Pay now" button if awaiting payment, cancellation before shipping, printable invoice | Courier API tracking | Automated returns workflow |
| Inventory | Stock per variant (size, color), low-stock alert, stock reservation, brand & in-stock filters | Batch inventory adjustments | Purchase orders, multi-warehouse |
| Admin dashboard | Products (brand, variants, sale price), orders, receipt review, staff roles, store settings, Ad slider management | Customer analytics | Multi-store SaaS |
| Notifications | Telegram Bot & email alerts to owner, customer email status updates | In-app notifications (order approved, shipped) | Viber and SMS alerts |
| Language | Burmese (Unicode) & English switch in header | - | Multi-currency |
| Selling channels | Shareable product & cart links (Telegram, TikTok share buttons) | Telegram channel catalog auto-post | TikTok Shop & Shopee catalog sync |

**Out of scope until a real client asks:** multi-vendor marketplace, native mobile app, and multi-tenant SaaS.

## Delivery model and customization

Sellio is delivered as one shared core plus a separate theme and settings for each client, so a design change never touches the store logic.

- **Demo store:** Sellio's own store with sample products is the reference product and the live demo for sellers.
- **Shared core:** orders, stock, payments, the admin dashboard, and the API stay in one codebase; bug fixes go here and reach every client.
- **Client theme:** layout, colors, fonts, images, and text live in a theme folder per client; a custom design replaces only this part.
- **Client settings:** store name, QR image, delivery fees, languages, and payment methods live in settings or the admin dashboard.
- **Customization levels:** v1 offers logo, colors, fonts, a banner, and two or three themes; a fully custom design is a paid extra.
- **Requirement:** store logic and theme are separated from day one.

## Functional requirements

Every requirement is a user story with a test the team can run; Must items block launch, Should items can slip to v1.1.

### Storefront

| ID | User story | Acceptance criteria | Priority |
| --- | --- | --- | --- |
| S-1 | As a customer, I browse categories and products | Product cards show image, name, price in Kyat, and stock status | Must |
| S-2 | As a customer, I pick a variant such as size or color | Choosing a variant updates price, image, and stock; sold-out variants cannot be added to the cart | Must |
| S-3 | As a customer, I search and filter products | Search works for Burmese and English names; filters by category, brand, price range, and in-stock only | Must |
| S-4 | As a seller, I share a product link on Telegram or TikTok | Each product has a stable URL and dedicated Telegram and TikTok share buttons that open pre-filled share intents | Must |
| S-5 | As a customer, I manage my cart | I can add, change quantity, and remove items; see live total and delivery fee calculation; cart survives a refresh | Must |
| S-6 | As a customer, I navigate via the header | Header provides an instant search bar, cart icon with badge count, and language switcher (Burmese & English) | Must |
| S-7 | As a customer, I sort and filter on Categories | Categories page offers sorting (price low/high, newest, best selling), filters, "Clear filters" button, and active result count | Must |
| S-8 | As a customer, I inspect products in detail | Product detail includes an image gallery with thumbnails, size/color variant selection, live stock status, Myanmar delivery info, share button, and related products | Must |
| S-9 | As a customer, I search from Home | Home search bar directs to search results rendered in the exact same responsive grid layout as Categories | Must |
| S-10 | As a customer, I see limited-time discounts | Products with promotion show sale price and countdown timer (end date/time) directly on Home | Must |
| S-11 | As a customer, I see top-selling gear | Home displays top selling products ranked by units sold in the last 30 days (pre-seeded with demo orders) | Must |
| S-12 | As an owner, I control Ad Sliders | Ad banners on Home (image, destination link, sort order, active status) are managed via Admin dashboard, not in code | Must |

### Checkout and accounts

| ID | User story | Acceptance criteria | Priority |
| --- | --- | --- | --- |
| C-1 | As a customer, I check out as a guest | Order needs only name, phone, and address; no account required | Must |
| C-2 | As a customer, I enter an address that fits Myanmar | I choose region, township from dropdown, free-text address, and landmark; phone number is required | Must |
| C-3 | As a customer, I see the delivery fee before paying | Fee follows owner's rules by region/township and is clearly listed in order total | Must |
| C-4 | As a customer, I choose how to pay | I can select Cash on Delivery (COD) or QR payment (KBZPay / WavePay); disabled methods are hidden | Must |
| C-5 | As a customer, I get proof that my order was placed | After checkout, confirmation page shows order number, summary, and next steps | Must |
| C-6 | As a customer, I authenticate my account | Login, sign up, and forgot password support phone number (09...) or email | Must |
| C-7 | As a customer, I track my orders | "My orders" lists past orders with statuses; order detail page includes tracking timeline and an active "Pay now" button for orders awaiting payment | Must |
| C-8 | As a customer, I manage my profile | "My account" lets me update name, phone, saved delivery addresses with township, and preferred language | Must |

### Trust building (Should have - right after launch)

| ID | User story | Acceptance criteria | Priority |
| --- | --- | --- | --- |
| T-1 | As a buyer, I read shop trust & policy pages | Dedicated pages for About Us, Contact Us (Telegram username/channel, phone, address), and Delivery & Return policies | Should |
| T-2 | As a buyer, I save items to a Wishlist | I can bookmark products to review and add to cart later; saved items persist in local storage and account | Should |
| T-3 | As a customer, I receive in-app notifications | Bell icon in header displays in-app notifications when an order is approved, paid, or shipped | Should |

### Payments (COD and QR with receipt)

| ID | User story | Acceptance criteria | Priority |
| --- | --- | --- | --- |
| P-1 | As a customer, I pay by QR | The order page shows the store's QR code, the exact amount, the order number to use as the transfer note, and the time left to pay | Must |
| P-2 | As a customer, I upload my payment receipt | I upload a JPG or PNG and enter the transaction ID; other file types are rejected; the order becomes Receipt submitted | Must |
| P-3 | As an owner, I am protected from reused receipts | The same transaction ID cannot be used on two orders; the customer sees a clear error | Must |
| P-4 | As an owner, I approve or reject a receipt | I see the receipt image, amount, and order; Approve sets the order to Paid; Reject needs a reason and lets the customer upload again | Must |
| P-5 | As an owner, unpaid QR orders expire | An order with no receipt expires after a set time (default 60 minutes, owner can change) and its stock is released | Must |
| P-6 | As a customer, I pay cash on delivery | A COD order goes straight to Confirmed; the owner marks it Paid when cash is collected | Must |
| P-7 | As a developer, I can add a payment gateway later | Each payment method follows one shared interface, so adding KBZPay or Wave later does not change the checkout code | Should |

### Orders

| ID | User story | Acceptance criteria | Priority |
| --- | --- | --- | --- |
| O-1 | As an owner, I follow each order through clear statuses | Orders move only through the allowed statuses in the flow below; invalid jumps are blocked | Must |
| O-2 | As staff, I update shipping | I can set Packed or Shipped and add a courier name and tracking note | Must |
| O-3 | As an owner, I cancel an order before shipping | Cancelling returns reserved or sold stock and records who cancelled and why | Must |
| O-4 | As a customer, I check my order status | I find my order with order number and phone number and see its status and tracking note | Must |
| O-5 | As an owner, I print an invoice or packing slip | One click gives a printable page with items, totals, and address | Should |
| O-6 | As an owner, I record a refund | I can log a refund amount and reason on an order; Sellio does not move money itself | Should |

### Inventory

| ID | User story | Acceptance criteria | Priority |
| --- | --- | --- | --- |
| I-1 | As an owner or staff, I set stock per variant | Stock counts can be edited and are shown on the product page | Must |
| I-2 | As an owner, I never oversell | When two customers try to buy the last item at once, only one order succeeds; the other sees a sold-out message | Must |
| I-3 | As an owner, stock is held while a customer pays | Stock is reserved at checkout until the order is Paid or expires | Must |
| I-4 | As an owner, I get low-stock alerts | I set a threshold per product; the dashboard and Telegram or email show an alert | Should |
| I-5 | As an owner, I see why stock changed | Every change is logged with who, when, and reason | Should |

### Admin dashboard

| ID | User story | Acceptance criteria | Priority |
| --- | --- | --- | --- |
| A-1 | As an owner, I manage products | I create, edit, and delete products with images, variants, price, category, and a Burmese and English name | Must |
| A-2 | As an owner, I find orders quickly | The order list filters by status, date, and payment method and searches by order number or phone | Must |
| A-3 | As an owner, I manage staff | I add or remove staff accounts with the Owner or Staff role; staff cannot open store settings | Must |
| A-4 | As an owner, I set up my store | I set logo, colors, store name, contact info, QR image, delivery fees, and which payment methods are on | Must |
| A-5 | As an owner, I see today at a glance | Dashboard shows orders awaiting payment, orders to ship, and sales for the week | Should |
| A-6 | As an owner, I see my customers | Customer list shows each person's order history | Should |

### Notifications and language

| ID | User story | Acceptance criteria | Priority |
| --- | --- | --- | --- |
| N-1 | As an owner, I am alerted fast | A new order and a new receipt each trigger a Telegram or email alert with a link to the order | Must |
| N-2 | As a customer, I get updates by email | If I gave an email, I get messages when my order is confirmed, paid, rejected, and shipped | Should |
| L-1 | As a customer, I use Burmese or English | The interface switches language; Burmese text shows correctly on common phones | Must |
| L-2 | As an owner, I write products in both languages | Each product has a Burmese and an English name and description; the store shows the chosen language | Must |

## Key flows and statuses

A QR order becomes Paid only after the owner approves the receipt, while a COD order goes straight to Confirmed.

&#91;embedded content: order and payment flow · COD and QR paths\]

A rejected receipt sends the order back to Awaiting payment so the customer can upload again; an order with no receipt in time expires and its stock is released.

| Status | Meaning | Changed by |
| --- | --- | --- |
| Awaiting payment | QR order placed, no receipt yet; stock is reserved | System on checkout |
| Receipt submitted | Customer uploaded a receipt and transaction ID | Customer |
| Paid | Owner confirmed the money arrived (for COD, set when cash is collected) | Owner (or staff if allowed) |
| Confirmed (COD) | COD order accepted and ready to pack | System on checkout |
| Packed | Items are packed | Staff or owner |
| Shipped | Handed to a courier, with courier name and tracking note | Staff or owner |
| Delivered | Customer received the order | Staff or owner |
| Expired | No receipt before the time limit; stock released | System |
| Cancelled | Cancelled before shipping with a reason; stock goes back | Owner or staff |

## Non-functional requirements

Sellio must be fast on a weak phone connection and must never lose or double-count an order.

| Area | Requirement |
| --- | --- |
| Mobile first | Every customer page is designed for a phone screen first and works on low-end Android browsers |
| Performance | Product page loads in under 3 seconds on 4G; images are compressed and lazy-loaded |
| Correctness | Stock changes, order creation, and status changes run in database transactions so two buyers cannot take the same last item |
| Security | Passwords are hashed; all traffic uses HTTPS; staff and owner routes check roles on the server; receipt uploads accept images only and are stored outside public folders |
| Abuse control | Login, order lookup, and receipt upload are rate limited to reduce guessing and spam |
| Privacy | Collect only name, phone, and address; customers can request deletion; owners see only their own store's data |
| Reliability | Daily database backups with a tested restore; error logging with an alert to the developer |
| Language | Unicode Burmese everywhere (storage, display, search); no Zawgyi support in v1 (to confirm with owners) |
| Accessibility | Readable text size, strong contrast, and large tap targets for phone users |
| Maintainability | Automated tests for checkout, stock, and payment approval; one command to deploy; README and API notes |
| Compliance | Check current Myanmar e-commerce registration and tax rules with a local expert before onboarding a paying client |

## Technical approach and data model

A standard web stack is enough; put the effort into correct stock, payment, and order logic, not exotic tools. The choices below are suggestions to confirm.

| Layer | Suggested choice | Why |
| --- | --- | --- |
| Storefront and admin | Next.js (React) with a mobile-first design | Fast pages, good SEO and link previews for shared products |
| Backend API | Node.js with Express, or Python with FastAPI | Either fits; pick the one you will maintain fastest |
| Database | PostgreSQL (or Supabase) | Transactions and row locks protect stock and orders |
| File storage | Object storage for receipt and product images | Keeps uploads out of the app server and public folders |
| Notifications | Telegram Bot API and email | Matches how sellers already work |
| Hosting | One deployment per client | Simple to start; a store\_id column keeps a later multi-store move possible |
| Quality | Automated tests, CI, error logging, daily backups | Shows professional engineering and protects real shops |

**Core data model (high level)**

| Entity | Key fields | Notes |
| --- | --- | --- |
| Store | name, logo, colors, QR image, languages, payment methods on or off | One row per deployment in v1 |
| User | name, email, role (owner or staff), password hash | Staff accounts for the dashboard |
| Customer | name, phone, email (optional), saved addresses | Guest orders store these on the order |
| Category and Product | names in Burmese and English, description, images, brand, salePrice, saleEndDate, category | Soft delete so old orders stay readable; brand & sale fields support filters & discounts |
| Variant | product, option values (size, color), price, stock, low-stock threshold | Stock lives here, not on the product |
| Order and Order item | number, status, totals, delivery fee, address (region, township, landmark), items with price at purchase | Item prices copied so later price changes do not alter old orders |
| Payment | order, method (COD or QR), amount, status, transaction ID (unique), receipt image, reviewed by | Unique transaction ID blocks reused receipts |
| Stock movement | variant, change, reason, user, time | Powers the stock log and audit |
| Delivery zone | region, township, fee | Drives delivery fee at checkout |
| Banner (Ad Slider) | title, imageUrl, linkUrl, sortOrder, isActive | Managed by owner in admin dashboard for Home hero slider |
| Notification log | channel, target, status | Lets you retry failed alerts |

## Risks and mitigations

The biggest risks are business risks, not technical ones: no paying shop, too much scope, and one person doing everything.

| Risk | Why it matters | Mitigation |
| --- | --- | --- |
| Nobody wants it | Owners may stay on Telegram or free tools | Interview 5 to 10 sellers before building; find one friendly shop to test with |
| Scope grows | A solo developer cannot finish a platform | Keep the v1 list fixed; new ideas go to the Later column |
| Fake or edited receipts | Owner may approve money that never arrived | Dashboard tells owners to confirm in their own wallet or bank app; unique transaction ID; require approval by the owner |
| Wrong or partial transfer | Customer pays a different amount | Show the exact amount in large text; owner can reject or request the difference |
| Unpaid orders lock stock | Real buyers see sold-out items | Reservation expires after a set time; stock returns automatically |
| Owner workload | Manual approval slows as orders grow | Fast approval screen and alerts; add gateway integration when volume justifies it |
| Burmese text problems | Mixed font encodings can break display and search | Use Unicode only; test on common Android phones |
| Rules change | Registration, tax, or payment rules may shift | Review with a local expert before the first paying client; keep legal notes in this doc |
| Support burden | Live shops need quick fixes | Backups, error alerts, and a written support promise before charging money |
| Time | Study, job search, and this project compete | Set weekly hours and milestone dates; ship a smaller v1 rather than slip |

## Roadmap

Build in six gated phases, and treat the pilot with one real shop as the final test before approaching more clients. Dates stay open until you set your weekly hours.

&#91;embedded content: roadmap · 6 phases, 6 gates\]

Each gate is a check you can run yourself; move to the next phase only when it passes. Version 1.1 then picks up the Should items from the requirements.

## Open questions

These decisions change scope or schedule, so settle them before the build starts.

- [ ] **Niche:** one industry first (fashion, cosmetics, food) or a general store?
- [ ] **Deployment:** one separate copy per client, or one system hosting many stores?
- [ ] **Time:** how many hours per week, and what launch date for v1?
- [ ] **Goal:** portfolio only, or is there a real shop ready to test it?
- [ ] **First shop:** which friendly seller will use v1 for 30 days?
- [ ] **Pricing:** setup fee and monthly fee for a paying client
- [ ] **Approval rights:** may staff approve receipts, or only the owner?
- [ ] **Alerts:** Telegram first, or email first?
- [ ] **Burmese fonts:** is Unicode-only acceptable for the target sellers?
- [ ] **Rules:** what registration and tax steps apply to a client store in Myanmar?
- [ ] **Domain and handles:** is Sellio free as a domain and on Telegram, TikTok, and Facebook?

## Key Architecture Decisions and Page Specifications

### 1. Page Matrix and Core Functions

| Page | Core Capabilities (v1) |
| --- | --- |
| **Login, Sign up, Forgot password** | Customer entry for logged-in accounts; supports Myanmar phone numbers (`09...`) or email addresses with SMS/email OTP or reset flow. |
| **Search results** | Triggered from Home/Header search bar; rendered in the exact same responsive product grid layout as Categories. |
| **Cart** | Update quantities, remove items, calculate live subtotal and dynamic township delivery fees; persists across sessions. |
| **Checkout** | Full Myanmar address capture (Region/State, Township dropdown, street address, and landmark), delivery option selector, payment method choice (COD vs KBZPay/WavePay QR). |
| **Payment page (QR)** | Prominent dynamic QR code, exact total amount in MMK, unique order number to quote as transfer memo, and slip/receipt upload with preview. |
| **Order confirmation** | Immediate order placement receipt, unique order reference, breakdown, and transparent next steps (verification & courier dispatch). |
| **My orders** | Full list of customer orders with live status badges; links to order detail page with step-by-step courier tracking and active "Pay Now" action button if status is *Awaiting payment*. |
| **My account** | Customer profile managing name, primary phone number, saved delivery addresses with township, and language selection. |

### 2. Feature Hierarchy

- **In v1 (Launch Core):**
  - Essential 3-page storefront (Home, Categories, Product Detail) + Cart, Checkout, QR Payment, and Order tracking.
  - Simple limited-time flash discount on Home (sale price + countdown end timer).
  - Search bar, cart icon, and Burmese (Unicode) / English language toggle in header.
- **Should Have (Right after launch - Builds trust in Myanmar market):**
  - **Shop Info & Trust Pages:** Dedicated pages for About Us, Contact Us (direct Telegram channel/username, Viber, phone, store location), and clear Delivery & Return/Refund policies. Essential for overcoming local buyer skepticism.
  - **Wishlist / Saved Items:** Bookmarking products for later purchase with persistent storage.
  - **In-App Notifications:** Real-time bell notifications alerting buyers when their order is approved, paid, or shipped.
- **Later:**
  - Customer reviews and star ratings.
  - Promo coupons and checkout voucher codes.
  - Algorithmic product recommendations.

### 3. Page-Level Additions

- **Home Page:**
  - Header with persistent Search Bar, Cart Icon (with live badge counter), and Burmese/English Language Switcher.
  - Dynamic Ad Sliders managed from the Admin dashboard.
  - Limited-time flash discounts with countdown timer.
  - Top-selling curated accessories.
- **Categories Page:**
  - Sorting controls: Price (low-to-high, high-to-low), Newest, Best Selling.
  - Filter panel: Brand, Category, Price Range, and In-Stock Only.
  - Interactive "Clear all filters" button and live product result counter.
- **Product Detail Page:**
  - Interactive multi-image gallery with thumbnails.
  - Variant selectors (Size, Color) with real-time stock availability per variant.
  - Live stock status badge (In Stock / Low Stock / Out of Stock).
  - Transparent Myanmar delivery info (fees & courier transit estimates).
  - One-tap social share buttons targeting Telegram and TikTok.
  - Related / complementary products carousel.

### 4. Decisions on Architectural Points

1. **Limited-Time Discounts:**
   - *Decision:* Keep a lightweight, high-impact version in v1 for Home. Products include an optional `salePrice` and `saleEndDate` timestamp. A front-end countdown timer displays remaining hours/minutes on Home and Product cards.
2. **Top Selling Products:**
   - *Decision:* Defined as total units sold in the rolling last 30 days. For the demo store reference build, realistic sample order history data is seeded so the section populates meaningfully right away.
3. **Brand Filter:**
   - *Decision:* Add an explicit `brand` string field to the Product schema. Only filters for attributes genuinely present on inventory (Brand, Category, Price Range, In-Stock) are rendered to avoid empty filter dead-ends.
4. **Ad Sliders (Hero Banners):**
   - *Decision:* Hero banners must be dynamically configurable by the shop owner via the Admin dashboard (`imageUrl`, `title`, `linkUrl`, `sortOrder`, `isActive`), never hardcoded in template code.

