# Crave – Food Delivery (Frontend Demo)

A single-page food delivery UI built with vanilla HTML/CSS/JavaScript.

This is a **frontend-only demo**: no backend, no real payments, and no real user authentication. Data is stored in your browser via `localStorage`.

## Features

- Browse restaurants and view menus
- Search restaurants by name/cuisine
- Add items to cart, adjust quantities, clear cart
- Promo code support: `CRAVE10` (10% discount)
- Sign up / sign in (stored locally in the browser)
- Checkout flow with order review + address validation
- Order confirmation screen with simulated ETA + status steps
- Toast notifications and responsive UI

## Tech Stack

- `index.html`: layout + UI structure
- `styles.css`: styling (design tokens, layout, components)
- `app.js`: app logic (rendering, cart, auth, checkout)
- No frameworks and no build step

## Project Structure

- `index.html` – main page
- `styles.css` – app styles
- `app.js` – app logic and data
- `assets/` – local images (logo, burger, pizza)

## Local Storage Keys

The app persists state in the browser:

- `craveCart` – cart items + quantities
- `craveUsers` – registered users (email/password stored in plaintext for demo purposes)
- `craveUser` – currently signed-in user
- `craveOrders` – order history records

To reset everything, clear site data for the domain in your browser (or clear `localStorage`).

## Run Locally

Any static file server works. Examples:

```bash
python -m http.server 5173 --bind 127.0.0.1
```

Then open `http://127.0.0.1:5173/`.

## Deploy

This project can be deployed as a static site (for example via Vercel).

## Notes / Limitations

- Authentication is **not secure** (demo only).
- Restaurant/menu data is hardcoded in `app.js`.
- Images for some restaurants are loaded from Unsplash URLs; an internet connection is required for those images.

