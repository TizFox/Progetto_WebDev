<p align="center">
  <img src="./static/logo.svg" alt="Rolling Emporium Logo" width="200"/>
</p>

# Rolling Emporium

An e-commerce platform for selling dice and tabletop role-playing game accessories, developed as a university exam project.

---

## Features

- **Product Catalog** — visible to all visitors, with real-time search by name
- **Authentication** — registration and login via Supabase Auth
- **Cart** — add, remove, and update product quantities
- **Wishlist** — save favourite products or items to buy
- **Order History** — view past orders with product details and total
- **User Profile** — update username, profile picture, and password
- **Payments** — Stripe integration for secure checkout
- **PWA** — installable application with push notification support

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [SvelteKit](https://svelte.dev/docs/kit) |
| Database & Auth | [Supabase](https://supabase.com/) |
| Payments | [Stripe](https://stripe.com/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Language | TypeScript |

---

## Project Structure

```
static/                     # Static assets (logo, icons)
src/
├── app.html                # HTML entry point
├── app.d.ts                # Global TypeScript declarations
├── service-worker.ts       # Service Worker
├── hooks.server.ts         # Server-side hooks (session handling)
├── lib/
│   ├── client/             # Client-side utilities and actions (on cart, wishlist)
│   ├── server/             # Server-side logic (Stripe, Supabase actions)
│   ├── components/         # Reusable Svelte components
│   ├── database.types.ts   # Auto-generated Supabase types
│   ├── logs.ts             # Logging utility
│   ├── theme.css           # Global theme variables
│   └── types.ts            # Shared TypeScript types
└── routes/
    ├── +layout.server.ts   # Global session and products
    ├── +layout.svelte      # Main layout
    ├── +layout.ts          # Layout load function
    ├── +page.svelte        # Home page (product catalog)
    ├── login/              # Login page
    ├── signup/             # Registration page
    ├── cart/               # Cart and Stripe checkout
    ├── wishlist/           # Wishlist page
    ├── history/            # Order history
    ├── order[orderId]/     # Order detail after payment
    ├── product[itemId]/    # Product detail page
    ├── profile/            # User profile management
    ├── offline/            # Fallback page for offline PWA
    └── api/                # API endpoints (Stripe payment intent & user deletion)
```

---

## Install & Running

1. Clone the repository.
2. Download the ".env" from email and put it in "./" of the project.
3. Run "npm install".
4. Run "npm run dev".
5. Open "localhost" link printed in the console.

---

## Notes

- The project uses Stripe in **test mode** — no real payments are processed.
- To test the payment flow, use the Stripe test card: `4242 4242 4242 4242`, `12/34`, `123`.
- Deployment is not included in the scope of this project.
