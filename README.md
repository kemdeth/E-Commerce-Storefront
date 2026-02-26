# PixelMarket — Digital Products Store

A digital product storefront built with **React** (via CDN), **vanilla CSS**, and component-based architecture.

## Project Structure

```
pixelmarket/
│
├── index.html          ← App shell, loads all scripts in order
│
├── css/
│   └── style.css       ← All styles, CSS variables, responsive design
│
├── js/
│   ├── data.js         ← Product & bundle data arrays
│   ├── icons.js        ← SVG icon components 
│   ├── components.js   ← All React components + CartContext + hooks
│   └── app.js          ← Root App component, ReactDOM.render
│
└── README.md
```

## Features

- **React components** — Header, Hero, ProductCard, CartDrawer, Stats, Footer
- **Context API** — Global cart state via `CartCtx` (no Redux needed)
- **Custom hooks** — `useToast()` for notifications
- **Live search** — Filters products as you type
- **Category filter pills** — UI Kits / Templates / Icons
- **Quantity controls** — +/− in cart with dynamic total
- **Skeleton loader** — Shimmer cards simulate API loading
- **Smooth scroll navigation** — All nav links scroll to sections
- **localStorage persistence** — Cart survives page refresh
- **SVG icon system** — All icons hand-crafted, no emoji
- **Animated cart badge** — Bounces when item is added
- **Toast notifications** — Replaces alert()
- **Keyboard support** — Escape closes cart drawer
- **Responsive** — Mobile-friendly layout

## Tech Stack

- React 18 (CDN)
- Babel Standalone (JSX transpiling in browser)
- Vanilla CSS with CSS custom properties
- localStorage for cart persistence
- Google Fonts (Syne + DM Sans)

## How to Run

Just open `index.html` in a browser — no build step needed.

To deploy on **GitHub Pages**:

1. Push the folder to a GitHub repo
2. Go to Settings → Pages → Source: main branch
3. Your site is live at `https://yourusername.github.io/pixelmarket`

## Interview Talking Points

- "I used React's **Context API** for global state instead of prop drilling"
- "Each component has a **single responsibility** — ProductCard only renders a card"
- "The **useToast hook** extracts notification logic out of the component"
- "I simulated a **loading state** with setTimeout to show skeleton UIs"
- "Icons are **custom SVG components** — crisp at any size, no external library"
