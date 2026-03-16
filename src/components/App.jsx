import { useState, useCallback } from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import ProductCard from "./ProductCard";
import CartPanel from "./CartPanel";
import ProductDetail from "./ProductDetail";
import CheckoutModal from "./CheckoutModal";
import UserDropdown from "./UserDropdown";
import { PRODUCTS, CATEGORIES } from "./constants";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [showCart, setShowCart] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [notification, setNotification] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notify = (msg) => { setNotification(msg); setTimeout(() => setNotification(""), 2800); };

  const handleLogin = (u) => { setUser(u); setPage("shop"); if (u?.name) notify(`Welcome back, ${u.name}! 👋`); };
  const handleSignup = (u) => { setUser(u); setPage("shop"); notify(`Account created! Welcome, ${u.name}! 🎉`); };
  const handleLogout = () => { setUser(null); setPage("login"); setShowUserMenu(false); setCart([]); };

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? {...i, qty: i.qty+1} : i);
      return [...prev, {...product, qty: 1}];
    });
    notify(`${product.name.slice(0, 28)}… added to cart!`);
  }, []);

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, qty) => qty <= 0 ? removeFromCart(id) : setCart(prev => prev.map(i => i.id === id ? {...i, qty} : i));
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  let filtered = PRODUCTS.filter(p =>
    (category === "All" || p.category === category) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
  );
  if (sortBy === "price-asc") filtered.sort((a,b)=>a.price-b.price);
  else if (sortBy === "price-desc") filtered.sort((a,b)=>b.price-a.price);
  else if (sortBy === "rating") filtered.sort((a,b)=>b.rating-a.rating);
  else if (sortBy === "reviews") filtered.sort((a,b)=>b.reviews-a.reviews);

  if (page === "login") return <LoginPage onLogin={handleLogin} onGoSignup={() => setPage("signup")} />;
  if (page === "signup") return <SignupPage onSignup={handleSignup} onGoLogin={() => setPage("login")} />;

  return (
    <div style={{ fontFamily: "'Helvetica Neue',Arial,sans-serif", background: "#eaeded", minHeight: "100vh" }}>
      <style>{`@keyframes fadeDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* HEADER */}
      <header style={{ background: "#232f3e", padding: "10px 16px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
          <div onClick={() => { setViewProduct(null); setSearch(""); setCategory("All"); }} style={{ color: "#fff", fontSize: 22, fontWeight: 900, letterSpacing: -1, cursor: "pointer", whiteSpace: "nowrap" }}>
            🛒 <span style={{ color: "#ff9900" }}>Shop</span>Zone
          </div>
          <div style={{ flex: 1, display: "flex", borderRadius: 4, overflow: "hidden" }}>
            <select value={category} onChange={e => setCategory(e.target.value)} style={{ background: "#f3f3f3", border: "none", padding: "0 8px", fontSize: 12, cursor: "pointer" }}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…" style={{ flex: 1, padding: "8px 12px", border: "none", fontSize: 15, outline: "none" }} onKeyDown={e => e.key === "Enter" && setViewProduct(null)} />
            <button onClick={() => setViewProduct(null)} style={{ background: "#ff9900", border: "none", padding: "0 16px", cursor: "pointer", fontSize: 18 }}>🔍</button>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <div onClick={() => setShowUserMenu(!showUserMenu)} style={{ color: "#fff", cursor: "pointer", textAlign: "center", userSelect: "none" }}>
                <div style={{ fontSize: 11, color: "#ccc" }}>Hello, {user?.name}</div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>Account ▾</div>
              </div>
              {showUserMenu && <UserDropdown user={user} onLogout={handleLogout} onClose={() => setShowUserMenu(false)} />}
            </div>
            <div style={{ color: "#fff", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#ccc" }}>Returns</div>
              <div style={{ fontWeight: 700, fontSize: 13, cursor: "pointer" }}>& Orders</div>
            </div>
            <div onClick={() => setShowCart(!showCart)} style={{ color: "#fff", cursor: "pointer", display: "flex", alignItems: "flex-end", gap: 4, position: "relative" }}>
              <span style={{ fontSize: 28 }}>🛒</span>
              {cartCount > 0 && <div style={{ position: "absolute", top: -4, right: -4, background: "#ff9900", color: "#fff", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>{cartCount}</div>}
              <span style={{ fontWeight: 700, fontSize: 14 }}>Cart</span>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1400, margin: "8px auto 0", display: "flex", gap: 16, overflowX: "auto" }}>
          {CATEGORIES.map(c => (
            <span key={c} onClick={() => { setCategory(c); setViewProduct(null); }} style={{ color: "#fff", fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", padding: "4px 8px", borderRadius: 3, background: category === c ? "rgba(255,255,255,0.15)" : "transparent" }}>{c}</span>
          ))}
        </div>
      </header>

      {notification && (
        <div style={{ position: "fixed", top: 80, right: 20, background: "#232f3e", color: "#fff", padding: "12px 20px", borderRadius: 6, zIndex: 999, fontSize: 13, maxWidth: 300, borderLeft: "4px solid #ff9900", animation: "fadeDown 0.3s ease" }}>
          {notification}
        </div>
      )}

      {!viewProduct && (
        <div style={{ background: "linear-gradient(135deg, #232f3e 0%, #37475a 100%)", padding: "32px 16px", marginBottom: 8 }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", textAlign: "center" }}>
            <h1 style={{ color: "#fff", fontSize: 36, fontWeight: 900, margin: "0 0 8px" }}>Today's <span style={{ color: "#ff9900" }}>Best Deals</span></h1>
            <p style={{ color: "#ccc", fontSize: 16, margin: "0 0 20px" }}>Free shipping on orders over $25</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              {["Electronics","Clothing","Kitchen","Gaming"].map(c => (
                <button key={c} onClick={() => setCategory(c)} style={{ background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,255,255,0.3)", color: "#fff", padding: "8px 20px", borderRadius: 20, cursor: "pointer", fontWeight: 600 }}>{c}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main style={{ maxWidth: 1400, margin: "0 auto", padding: 16 }}>
        {viewProduct ? (
          <ProductDetail product={viewProduct} onAddToCart={addToCart} onBack={() => setViewProduct(null)}
            onBuyNow={(product, qty) => {
              setCart([{ ...product, qty }]);
              setViewProduct(null);
              setShowCheckout(true);
            }} />
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>
                {category === "All" ? "All Products" : category}
                <span style={{ color: "#565959", fontWeight: 400, fontSize: 14, marginLeft: 8 }}>({filtered.length} results)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13 }}>Sort by:</span>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ padding: "6px 10px", border: "1px solid #ccc", borderRadius: 4, fontSize: 13 }}>
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Customer Review</option>
                  <option value="reviews">Most Reviews</option>
                </select>
              </div>
            </div>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: 60, color: "#888" }}>
                <div style={{ fontSize: 64 }}>🔍</div>
                <h2>No results found</h2>
                <p>Try a different search or category</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
                {filtered.map(p => <ProductCard key={p.id} product={p} onAddToCart={addToCart} onViewProduct={setViewProduct} />)}
              </div>
            )}
          </>
        )}
      </main>

      <footer style={{ background: "#232f3e", color: "#fff", padding: "24px 16px", marginTop: 32 }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#ff9900", marginBottom: 8 }}>🛒 ShopZone</div>
          <p style={{ color: "#999", fontSize: 13 }}>© 2025 ShopZone, Inc. All rights reserved.</p>
        </div>
      </footer>

      {showCart && <CartPanel cart={cart} onRemove={removeFromCart} onUpdateQty={updateQty} onClose={() => setShowCart(false)} onCheckout={() => { setShowCart(false); setShowCheckout(true); }} />}
      {showCart && <div onClick={() => setShowCart(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 999 }} />}
      {showCheckout && <CheckoutModal cart={cart} onClose={() => { setShowCheckout(false); setCart([]); }} />}
    </div>
  );
}

export default App;