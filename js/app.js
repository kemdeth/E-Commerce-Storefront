// ══════════════════════════════════════════════
// app.js — Root App & Entry Point
// Depends on: data.js, icons.js, components.js
// ══════════════════════════════════════════════

function AppInner() {
  const [cartOpen, setCartOpen] = React.useState(false);
  const { addItem } = React.useContext(CartCtx);
  const { toasts, show } = useToast();

  // Add to cart + show toast notification — memoized to avoid re-rendering all ProductCards
  const onAdd = React.useCallback(
    (p) => {
      addItem(p);
      show('"' + p.name + '" added to cart');
    },
    [addItem, show],
  );

  // Close cart drawer on Escape key
  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <Header onCartOpen={() => setCartOpen(true)} />
      <Hero />
      <Stats />
      <ProductsSection onAdd={onAdd} />
      <Footer />
      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
      <Toasts toasts={toasts} />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  );
}

// Mount React to the DOM
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
