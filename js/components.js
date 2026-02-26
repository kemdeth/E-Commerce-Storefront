// ══════════════════════════════════════════════
// components.js — React Components
// Depends on: data.js, icons.js
// ══════════════════════════════════════════════

const { useState, useEffect, useContext, createContext, useCallback, useRef } =
  React;

/* ─────────────────────────────────────────────
   CART CONTEXT
   Manages global cart state + localStorage sync
───────────────────────────────────────────── */
const CartCtx = createContext(null);

function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("pm_cart") || "[]");
    } catch {
      return [];
    }
  });

  // Sync to localStorage on every change
  useEffect(() => {
    localStorage.setItem("pm_cart", JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((p) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === p.id);
      return existing
        ? prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...p, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQty = useCallback((id, delta) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i,
      ),
    );
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const inCart = (id) => items.some((i) => i.id === id);

  return (
    <CartCtx.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        totalItems,
        totalPrice,
        inCart,
      }}
    >
      {children}
    </CartCtx.Provider>
  );
}

/* ─────────────────────────────────────────────
   TOAST HOOK
   Returns toasts array + show() function
───────────────────────────────────────────── */
function useToast() {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((msg) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg }]);
    // Fade out after 2.6s, remove from DOM after 2.9s
    setTimeout(
      () =>
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, out: true } : t)),
        ),
      2600,
    );
    setTimeout(
      () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      2900,
    );
  }, []);

  return { toasts, show };
}

/* ─────────────────────────────────────────────
   TOASTS DISPLAY
───────────────────────────────────────────── */
function Toasts({ toasts }) {
  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div key={t.id} className={"toast" + (t.out ? " out" : "")}>
          <ICheck n={14} c="var(--green)" /> {t.msg}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SKELETON LOADER
   Shown while products are "loading"
───────────────────────────────────────────── */
function Skeleton() {
  return (
    <div className="skel-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.1rem",
        }}
      >
        <div
          className="skel"
          style={{ width: 48, height: 48, borderRadius: 12 }}
        />
        <div
          className="skel"
          style={{ width: 58, height: 22, borderRadius: 4 }}
        />
      </div>
      <div
        className="skel"
        style={{ height: 15, width: "68%", marginBottom: 8 }}
      />
      <div
        className="skel"
        style={{ height: 12, width: "94%", marginBottom: 6 }}
      />
      <div
        className="skel"
        style={{ height: 12, width: "78%", marginBottom: "1.5rem" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="skel" style={{ height: 26, width: 55 }} />
        <div
          className="skel"
          style={{ height: 34, width: 86, borderRadius: 8 }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PRODUCT CARD
───────────────────────────────────────────── */
function ProductCard({ p, onAdd, delay }) {
  const { inCart } = useContext(CartCtx);
  const added = inCart(p.id);
  const PI = PICONS[p.icon];

  // Badge style lookup
  const badgeClass =
    { popular: "b-popular", new: "b-new", sale: "b-sale" }[p.badge] || "";
  const badgeLabel =
    { popular: "Popular", new: "New", sale: "Sale" }[p.badge] || "";

  return (
    <div className="pcard" style={{ animationDelay: delay + "ms" }}>
      <div className="card-top">
        <div className="picon" style={{ background: p.ibg }}>
          {PI && <PI n={22} c={p.ic} />}
        </div>
        {p.badge && <div className={"pbadge " + badgeClass}>{badgeLabel}</div>}
      </div>

      <div className="pname">{p.name}</div>
      <div className="pdesc">{p.desc}</div>

      <div className="ptags">
        {p.tags.map((tag) => (
          <span key={tag} className="ptag">
            {tag}
          </span>
        ))}
      </div>

      <div className="card-foot">
        <div>
          <div className="pprice">${p.price}</div>
          <div className="pprice-note">One-time · Lifetime access</div>
        </div>
        <button
          className={"add-btn" + (added ? " added" : "")}
          onClick={() => !added && onAdd(p)}
        >
          {added ? (
            <>
              <ICheck n={13} c="var(--green)" /> Added
            </>
          ) : (
            <>
              <IPlus n={13} /> Add
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CART ITEM ROW (inside the drawer)
───────────────────────────────────────────── */
function CartItemRow({ item }) {
  const { removeItem, updateQty } = useContext(CartCtx);
  const PI = PICONS[item.icon];

  return (
    <div className="citem">
      <div className="citem-icon" style={{ background: item.ibg }}>
        {PI && <PI n={18} c={item.ic} />}
      </div>
      <div className="citem-info">
        <div className="citem-name">{item.name}</div>
        <div className="citem-price">
          ${item.price.toFixed(2)} each ·{" "}
          <span style={{ color: "var(--text2)" }}>
            ${(item.price * item.qty).toFixed(2)}
          </span>
        </div>
      </div>
      <div className="qty">
        <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>
          <IMinus n={11} />
        </button>
        <span className="qty-num">{item.qty}</span>
        <button className="qty-btn" onClick={() => updateQty(item.id, +1)}>
          <IPlus n={11} />
        </button>
      </div>
      <button
        className="rm-btn"
        onClick={() => removeItem(item.id)}
        title="Remove"
      >
        <ITrash n={14} />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CART DRAWER
───────────────────────────────────────────── */
function CartDrawer({ onClose }) {
  const { items, totalItems, totalPrice } = useContext(CartCtx);

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="drawer-head">
          <div>
            <div className="drawer-title">Your Cart</div>
            <div className="drawer-sub">
              {totalItems} item{totalItems !== 1 ? "s" : ""}
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <IClose n={13} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <svg
              width="68"
              height="68"
              viewBox="0 0 72 72"
              fill="none"
              stroke="var(--text3)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 9h7l5.5 32h29L57 18H19" />
              <circle cx="28" cy="60" r="3.5" />
              <circle cx="44" cy="60" r="3.5" />
              <path d="M32 30L40 38M40 30L32 38" strokeWidth="2.5" />
            </svg>
            <div className="cart-empty-title">Your cart is empty</div>
            <div className="cart-empty-sub">
              Browse products and add them here.
            </div>
          </div>
        ) : (
          <div className="drawer-items">
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </div>
        )}

        <div className="drawer-foot">
          <div className="total-row">
            <span className="total-label">Total</span>
            <span className="total-amt">${totalPrice.toFixed(2)}</span>
          </div>
          <button className="checkout-btn" disabled={items.length === 0}>
            Proceed to Checkout <IArrow n={14} />
          </button>
          <div className="secure-note">
            <ILock n={13} /> Secure checkout · Instant download
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   HEADER
───────────────────────────────────────────── */
function Header({ onCartOpen }) {
  const { totalItems } = useContext(CartCtx);
  const [bump, setBump] = useState(false);
  const prev = useRef(totalItems);

  // Animate badge when item is added
  useEffect(() => {
    if (totalItems > prev.current) {
      setBump(true);
      setTimeout(() => setBump(false), 400);
    }
    prev.current = totalItems;
  }, [totalItems]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="header">
      <button
        className="logo-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ILogo n={30} /> PixelMarket
      </button>
      <nav className="nav-links">
        <button className="nav-link" onClick={() => scrollTo("sec-products")}>
          <IGrid n={14} /> Browse
        </button>
        <button className="nav-link" onClick={() => scrollTo("sec-templates")}>
          <IBag n={14} /> Templates
        </button>
        <button className="nav-link" onClick={() => scrollTo("sec-bundles")}>
          <IBox n={14} /> Bundles
        </button>
        <button
          className="cart-btn"
          onClick={onCartOpen}
          aria-label={`Open cart, ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
        >
          <ICart n={16} /> Cart
          <span
            className={"cart-badge" + (bump ? " bump" : "")}
            aria-hidden="true"
          >
            {totalItems}
          </span>
        </button>
      </nav>
    </header>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero">
      <div className="hero-glow1" />
      <div className="hero-glow2" />
      <div className="hero-chip">
        <ISpark n={13} /> New releases weekly
      </div>
      <h1>
        Assets built for
        <br />
        <span className="grad">modern interfaces</span>
      </h1>
      <p className="hero-sub">
        Premium UI kits, templates &amp; design resources for developers and
        designers who ship fast.
      </p>
      <div className="hero-btns">
        <button
          className="btn-primary"
          onClick={() => scrollTo("sec-products")}
        >
          <IGrid n={15} /> Browse Products
        </button>
        <button className="btn-ghost" onClick={() => scrollTo("sec-bundles")}>
          View Bundles <IArrow n={15} />
        </button>
      </div>
    </section>
  );
}

function StatStar() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="#fbbf24"
      style={{ display: "inline", verticalAlign: "middle", marginLeft: "2px" }}
    >
      <path d="M7 1.5l1.6 3.4 3.7.5-2.7 2.6.6 3.7L7 9.9l-3.2 1.8.6-3.7L1.7 5.4l3.7-.5z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   STATS BAR
───────────────────────────────────────────── */
function Stats() {
  return (
    <div className="stats">
      <div className="stat">
        <div className="stat-num">500+</div>
        <div className="stat-label">Design Files</div>
      </div>
      <div className="stat">
        <div className="stat-num">12K</div>
        <div className="stat-label">Customers</div>
      </div>
      <div className="stat">
        <div
          className="stat-num"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "3px",
          }}
        >
          4.9 <StatStar />
        </div>
        <div className="stat-label">Avg Rating</div>
      </div>
      <div className="stat">
        <div className="stat-num">Free</div>
        <div className="stat-label">Updates Forever</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PRODUCTS SECTION
   Includes: search, filter, product grid,
   Templates anchor, Bundles anchor
───────────────────────────────────────────── */
function ProductsSection({ onAdd }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [loading, setLoading] = useState(true);

  // Simulate a loading delay (like a real API call)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 950);
    return () => clearTimeout(t);
  }, []);

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = cat === "All" || p.cat === cat;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section className="products-section">
      {/* ── All Products ── */}
      <div id="sec-products">
        <div className="section-top">
          <div>
            <div className="section-label">Featured Products</div>
            <div className="section-sub">
              Handpicked for quality and usability
            </div>
          </div>
          <div className="controls">
            <div className="search-wrap">
              <span className="search-icon-pos">
                <ISearch n={15} />
              </span>
              <input
                className="search-input"
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="pills">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  className={"pill" + (cat === c ? " active" : "")}
                  onClick={() => setCat(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)
          ) : filtered.length === 0 ? (
            <div className="empty">
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                stroke="var(--text3)"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="26" cy="26" r="18" />
                <path d="M39 39L54 54" />
                <path d="M20 20L32 32M32 20L20 32" strokeWidth="2.5" />
              </svg>
              <div className="empty-title">No products found</div>
              <div className="empty-sub">
                Try a different search or category
              </div>
            </div>
          ) : (
            filtered.map((p, i) => (
              <ProductCard key={p.id} p={p} onAdd={onAdd} delay={i * 60} />
            ))
          )}
        </div>
      </div>

      {/* ── Templates Anchor ── */}
      <div className="anchor" id="sec-templates">
        <div
          className="anchor-badge"
          style={{
            background: "rgba(52,211,153,0.1)",
            border: "1px solid rgba(52,211,153,0.2)",
            color: "var(--green)",
          }}
        >
          <IBag n={13} /> Templates
        </div>
        <div className="anchor-title">Ready-to-ship templates</div>
        <div className="anchor-sub">
          Drop-in templates built for speed. Customize once, deploy anywhere.
        </div>
        <div className="grid">
          {PRODUCTS.filter((p) => p.cat === "Templates").map((p, i) => (
            <ProductCard key={p.id} p={p} onAdd={onAdd} delay={i * 80} />
          ))}
        </div>
      </div>

      {/* ── Bundles Anchor ── */}
      <div className="anchor" id="sec-bundles">
        <div
          className="anchor-badge"
          style={{
            background: "var(--accent-dim)",
            border: "1px solid rgba(124,111,247,0.2)",
            color: "#a5a0ff",
          }}
        >
          <IBox n={13} /> Bundles
        </div>
        <div className="anchor-title">Save more with bundles</div>
        <div className="anchor-sub">
          Get all UI Kits or all Templates at a discounted price. Best value for
          teams and solo devs.
        </div>
        <div className="bundle-grid">
          {BUNDLES.map((b, i) => {
            const BI = PICONS[b.icon];
            return (
              <div
                key={b.name}
                className="bcard"
                style={{ animationDelay: i * 80 + "ms" }}
              >
                <div className="bicon" style={{ background: b.ibg }}>
                  {BI && <BI n={24} c={b.ic} />}
                </div>
                <div className="bname">{b.name}</div>
                <div className="bdesc">{b.desc}</div>
                <div className="bpricing">
                  <div className="bprice">${b.price}</div>
                  <div className="borig">${b.orig}</div>
                  <div className="bsave">Save ${b.orig - b.price}</div>
                </div>
                <button className="bbtn">
                  Get Bundle <IArrow n={13} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="footer-logo">
          <ILogo n={24} /> PixelMarket
        </div>
        <div className="footer-tagline">
          Premium assets for modern interfaces.
        </div>
      </div>

      <div className="footer-links">
        <div className="footer-col">
          <div className="footer-col-title">Products</div>
          <a className="footer-link" href="#sec-products">
            UI Kits
          </a>
          <a className="footer-link" href="#sec-templates">
            Templates
          </a>
          <a className="footer-link" href="#sec-bundles">
            Bundles
          </a>
          <a className="footer-link" href="#sec-products">
            Icons
          </a>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Support</div>
          <a className="footer-link" href="#">
            Documentation
          </a>
          <a className="footer-link" href="#">
            License
          </a>
          <a className="footer-link" href="#">
            Refund Policy
          </a>
          <a className="footer-link" href="#">
            Contact
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copy">
          © {year} PixelMarket. All rights reserved.
        </div>
        <div className="footer-badges">
          <div className="footer-badge">
            <ILock n={11} /> Secure Payments
          </div>
          <div className="footer-badge">
            <ICheck n={11} c="var(--green)" /> Instant Download
          </div>
        </div>
      </div>
    </footer>
  );
}
