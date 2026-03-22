# PixelMarket – Digital Products Store

A modern e-commerce storefront for digital products, built as a portfolio project to demonstrate frontend development skills.

## Live Demo

[ecommecefrontstore.netlify.app](https://ecommecefrontstore.netlify.app)

## Features

- Product grid with category filter and live search
- Slide-in cart drawer with quantity controls
- Persistent cart using localStorage
- Skeleton loader on initial render
- Toast notifications on add to cart
- Fully wired navigation — header and footer links control filters and scroll
- Keyboard accessible (Escape closes drawer, aria labels throughout)
- Responsive layout for mobile and desktop

## Tech Stack

- React 18 (via CDN — no build step)
- Babel Standalone (JSX in browser)
- Vanilla CSS with CSS custom properties
- Netlify (static hosting)

## Project Structure

```
E-Commerce Storefront/
├── index.html        ← entire app (React components + styles)
├── 404.html          ← SPA fallback for Netlify routing
└── README.md
```

## What I Learned

- Lifting state up to share filter/search between Header, Hero, Footer, and ProductsSection
- Using `requestAnimationFrame` before scroll so React re-renders before DOM scroll fires
- Cart context pattern with `useCallback` and `localStorage` sync via `useEffect`
- Accessibility attributes: `role`, `aria-label`, `aria-modal`, `aria-pressed`
