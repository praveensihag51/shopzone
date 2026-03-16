import { useState, useCallback } from "react";

/* ─────────────────────────── DATA ─────────────────────────── */
const PRODUCTS = [
  { id: 1,  name: "Sony WH-1000XM5 Wireless Headphones",    price: 279.99, originalPrice: 349.99,  rating: 4.8, reviews: 12483, category: "Electronics", image: "🎧", badge: "Best Seller", stock: 42 },
  { id: 2,  name: "Apple AirPods Pro (2nd Gen)",             price: 189.99, originalPrice: 249.00,  rating: 4.7, reviews: 8921,  category: "Electronics", image: "🎵", badge: "Prime",       stock: 15 },
  { id: 3,  name: "Samsung 65\" 4K QLED Smart TV",           price: 799.99, originalPrice: 1099.99, rating: 4.6, reviews: 3241,  category: "Electronics", image: "📺", badge: "Deal",        stock: 8  },
  { id: 4,  name: "Nike Air Max 270 Running Shoes",          price: 109.99, originalPrice: 150.00,  rating: 4.5, reviews: 6782,  category: "Clothing",    image: "👟", badge: "Best Seller", stock: 24 },
  { id: 5,  name: "The North Face Insulated Jacket",         price: 149.99, originalPrice: 220.00,  rating: 4.7, reviews: 2341,  category: "Clothing",    image: "🧥", badge: "Prime",       stock: 11 },
  { id: 6,  name: "Instant Pot Duo 7-in-1 Pressure Cooker", price: 69.99,  originalPrice: 99.99,   rating: 4.8, reviews: 18234, category: "Kitchen",     image: "🍲", badge: "Best Seller", stock: 63 },
  { id: 7,  name: "Dyson V15 Detect Cordless Vacuum",        price: 449.99, originalPrice: 649.99,  rating: 4.7, reviews: 4521,  category: "Home",        image: "🔋", badge: "Deal",        stock: 5  },
  { id: 8,  name: "LEGO Technic Bugatti Chiron",             price: 249.99, originalPrice: 369.99,  rating: 4.9, reviews: 7832,  category: "Toys",        image: "🧱", badge: "Prime",       stock: 18 },
  { id: 9,  name: "Kindle Paperwhite 11th Gen",              price: 99.99,  originalPrice: 139.99,  rating: 4.6, reviews: 9210,  category: "Electronics", image: "📚", badge: "Best Seller", stock: 35 },
  { id: 10, name: "Weber Spirit II E-310 Gas Grill",         price: 459.00, originalPrice: 579.00,  rating: 4.5, reviews: 1823,  category: "Outdoor",     image: "🔥", badge: "Deal",        stock: 7  },
  { id: 11, name: "Vitamix 5200 Blender",                    price: 349.99, originalPrice: 449.99,  rating: 4.8, reviews: 5432,  category: "Kitchen",     image: "🥤", badge: "Prime",       stock: 22 },
  { id: 12, name: "GoPro HERO12 Black Action Camera",        price: 299.99, originalPrice: 399.99,  rating: 4.6, reviews: 3201,  category: "Electronics", image: "📷", badge: "New",         stock: 31 },
  { id: 13, name: "Patagonia Down Sweater Hoody",            price: 199.00, originalPrice: 279.00,  rating: 4.7, reviews: 1092,  category: "Clothing",    image: "🏔️", badge: "Prime",      stock: 14 },
  { id: 14, name: "Philips Hue Smart Bulb Starter Kit",      price: 69.99,  originalPrice: 99.99,   rating: 4.5, reviews: 4567,  category: "Home",        image: "💡", badge: "Deal",        stock: 49 },
  { id: 15, name: "Yeti Rambler 30 oz Tumbler",              price: 34.99,  originalPrice: 44.99,   rating: 4.8, reviews: 21045, category: "Kitchen",     image: "☕", badge: "Best Seller", stock: 88 },
  { id: 16, name: "PlayStation 5 Console",                   price: 449.99, originalPrice: 499.99,  rating: 4.9, reviews: 34521, category: "Gaming",      image: "🎮", badge: "Hot",         stock: 3  },
];
const CATEGORIES = ["All","Electronics","Clothing","Kitchen","Home","Toys","Outdoor","Gaming"];

/* ─────────────────────── SHARED STYLES ─────────────────────── */
const INPUT_STYLE = {
  width: "100%", padding: "10px 12px", border: "1px solid #a6a6a6",
  borderRadius: 4, fontSize: 14, boxSizing: "border-box", outline: "none",
};
const BTN_PRIMARY = {
  width: "100%", background: "#ffd814", border: "1px solid #fcd200",
  borderRadius: 6, padding: "10px", fontWeight: 700, fontSize: 15, cursor: "pointer",
};
const BTN_SECONDARY = {
  width: "100%", background: "#fff", border: "1px solid #d5d9d9",
  borderRadius: 6, padding: "10px", fontWeight: 600, fontSize: 14,
  cursor: "pointer", color: "#0f1111",
};

/* ───────────────────────── LOGIN PAGE ───────────────────────── */
function LoginPage({ onLogin, onGoSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = () => {
    setError("");
    if (!email) { setError("Enter your email or mobile number"); return; }
    if (!password) { setError("Enter your password"); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin({ name: email.split("@")[0] || "Customer", email }); }, 900);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "'Helvetica Neue',Arial,sans-serif" }}>
      <style>{`
        @keyframes authFade { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
        .auth-box { animation: authFade 0.35s ease-out; }
      `}</style>

      {/* Logo */}
      <div style={{ padding: "24px 0 18px", cursor: "pointer" }} onClick={() => onLogin({ name: "Guest", email: "" })}>
        <span style={{ fontSize: 30, fontWeight: 900, letterSpacing: -1 }}>🛒 <span style={{ color: "#ff9900" }}>Shop</span>Zone</span>
      </div>

      <div className="auth-box" style={{ width: 360, border: "1px solid #ddd", borderRadius: 8, padding: "28px 30px", boxSizing: "border-box", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        <h1 style={{ fontSize: 26, fontWeight: 600, margin: "0 0 20px" }}>Sign in</h1>

        {error && (
          <div style={{ background: "#fff7f0", border: "1px solid #e77600", borderRadius: 4, padding: "10px 12px", fontSize: 13, color: "#c40000", marginBottom: 16 }}>
            ⚠️ {error}
          </div>
        )}

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 5 }}>Email or mobile number</label>
          <input value={email} onChange={e => setEmail(e.target.value)} style={INPUT_STYLE} placeholder="you@example.com"
            onKeyDown={e => e.key === "Enter" && handle()} />
        </div>

        <div style={{ marginBottom: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <label style={{ fontSize: 13, fontWeight: 700 }}>Password</label>
            <span style={{ fontSize: 12, color: "#0066c0", cursor: "pointer" }}>Forgot password?</span>
          </div>
          <div style={{ position: "relative" }}>
            <input value={password} onChange={e => setPassword(e.target.value)}
              type={showPw ? "text" : "password"} style={{ ...INPUT_STYLE, paddingRight: 70 }}
              placeholder="At least 6 characters" onKeyDown={e => e.key === "Enter" && handle()} />
            <span onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: "#0066c0", cursor: "pointer" }}>
              {showPw ? "Hide" : "Show"}
            </span>
          </div>
        </div>

        <button onClick={handle} disabled={loading} style={{ ...BTN_PRIMARY, opacity: loading ? 0.75 : 1 }}>
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <p style={{ fontSize: 11, color: "#555", margin: "14px 0 0", lineHeight: 1.6 }}>
          By signing in, you agree to ShopZone's <span style={{ color: "#0066c0", cursor: "pointer" }}>Conditions of Use</span> and <span style={{ color: "#0066c0", cursor: "pointer" }}>Privacy Notice</span>.
        </p>

        <div style={{ borderTop: "1px solid #eee", margin: "18px 0 12px" }} />

        <div style={{ fontSize: 13, marginBottom: 14 }}>
          New to ShopZone?{" "}
          <button onClick={onGoSignup} style={{ background: "none", border: "none", color: "#0066c0", cursor: "pointer", fontSize: 13, padding: 0, fontWeight: 600 }}>
            Create your account
          </button>
        </div>

        <button onClick={() => onLogin({ name: "Guest", email: "guest@shopzone.com" })} style={BTN_SECONDARY}>
          Continue as Guest
        </button>
      </div>

      {/* Social */}
      <div style={{ width: 360, marginTop: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <div style={{ flex: 1, height: 1, background: "#ddd" }} />
          <span style={{ fontSize: 12, color: "#767676" }}>Or sign in with</span>
          <div style={{ flex: 1, height: 1, background: "#ddd" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {[["G", "#4285f4", "Google"], ["🍎", "#000", "Apple"], ["f", "#1877f2", "Facebook"]].map(([icon, color, label]) => (
            <button key={label} onClick={() => onLogin({ name: label + " User", email: `${label.toLowerCase()}@social.com` })}
              style={{ padding: "9px 4px", border: `1.5px solid ${color}`, borderRadius: 6, background: "#fff", cursor: "pointer", fontWeight: 700, color, fontSize: 14 }}>
              {icon} {label}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 28, fontSize: 12, color: "#767676", textAlign: "center", paddingBottom: 24 }}>
        © 2025 ShopZone, Inc. · <span style={{ cursor: "pointer", color: "#0066c0" }}>Privacy</span> · <span style={{ cursor: "pointer", color: "#0066c0" }}>Terms</span>
      </div>
    </div>
  );
}

/* ──────────────────────── SIGNUP PAGE ──────────────────────── */
function SignupPage({ onSignup, onGoLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [strength, setStrength] = useState(0);

  const calcStrength = (pw) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    if (k === "password") setStrength(calcStrength(v));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Enter your name";
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (form.password.length < 6) e.password = "Minimum 6 characters required";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const handle = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onSignup({ name: form.name, email: form.email }); }, 900);
  };

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", "#cc0c39", "#e77600", "#007600", "#007600"];

  const Field = ({ label, field, type = "text", placeholder, hasToggle }) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 5 }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          value={form[field]}
          onChange={e => set(field, e.target.value)}
          type={hasToggle && showPw ? "text" : type}
          style={{ ...INPUT_STYLE, borderColor: errors[field] ? "#c40000" : "#a6a6a6", paddingRight: hasToggle ? 70 : 12 }}
          placeholder={placeholder}
          onKeyDown={e => e.key === "Enter" && handle()}
        />
        {hasToggle && (
          <span onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: "#0066c0", cursor: "pointer" }}>
            {showPw ? "Hide" : "Show"}
          </span>
        )}
      </div>
      {errors[field] && <div style={{ color: "#c40000", fontSize: 12, marginTop: 4 }}>⚠️ {errors[field]}</div>}
      {field === "password" && form.password && (
        <div style={{ marginTop: 6 }}>
          <div style={{ display: "flex", gap: 3, marginBottom: 3 }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= strength ? strengthColor[strength] : "#e0e0e0", transition: "background 0.3s" }} />
            ))}
          </div>
          <span style={{ fontSize: 11, color: strengthColor[strength], fontWeight: 600 }}>{strengthLabel[strength]} password</span>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "'Helvetica Neue',Arial,sans-serif" }}>
      <style>{`@keyframes authFade{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}.auth-box{animation:authFade 0.35s ease-out;}`}</style>

      <div style={{ padding: "24px 0 18px", cursor: "pointer" }} onClick={onGoLogin}>
        <span style={{ fontSize: 30, fontWeight: 900, letterSpacing: -1 }}>🛒 <span style={{ color: "#ff9900" }}>Shop</span>Zone</span>
      </div>

      <div className="auth-box" style={{ width: 390, border: "1px solid #ddd", borderRadius: 8, padding: "28px 30px", boxSizing: "border-box", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        <h1 style={{ fontSize: 26, fontWeight: 600, margin: "0 0 4px" }}>Create account</h1>
        <p style={{ fontSize: 13, color: "#555", margin: "0 0 20px" }}>Join millions of happy ShopZone customers.</p>

        <Field label="Your name" field="name" placeholder="First and last name" />
        <Field label="Email" field="email" placeholder="you@example.com" />
        <Field label="Password" field="password" type="password" placeholder="At least 6 characters" hasToggle />
        <Field label="Re-enter password" field="confirm" type="password" placeholder="Re-enter your password" />

        <button onClick={handle} disabled={loading} style={{ ...BTN_PRIMARY, opacity: loading ? 0.75 : 1 }}>
          {loading ? "Creating account…" : "Create your ShopZone account"}
        </button>

        <p style={{ fontSize: 11, color: "#555", margin: "14px 0 0", lineHeight: 1.6 }}>
          By creating an account, you agree to ShopZone's <span style={{ color: "#0066c0", cursor: "pointer" }}>Conditions of Use</span> and <span style={{ color: "#0066c0", cursor: "pointer" }}>Privacy Notice</span>.
        </p>

        <div style={{ borderTop: "1px solid #eee", margin: "18px 0 0" }} />
        <p style={{ fontSize: 13, marginTop: 14 }}>
          Already have an account?{" "}
          <button onClick={onGoLogin} style={{ background: "none", border: "none", color: "#0066c0", cursor: "pointer", fontSize: 13, padding: 0, fontWeight: 600 }}>
            Sign in
          </button>
        </p>
      </div>

      {/* Benefits */}
      <div style={{ width: 390, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 18, paddingBottom: 28 }}>
        {[["🚚","Free Delivery","On orders over $25"],["🔄","Easy Returns","30-day return policy"],["🔒","Secure Checkout","256-bit encryption"],["⭐","Prime Benefits","Exclusive deals & more"]].map(([icon, title, sub]) => (
          <div key={title} style={{ background: "#f7f8f8", borderRadius: 8, padding: 14, textAlign: "center" }}>
            <div style={{ fontSize: 22 }}>{icon}</div>
            <div style={{ fontSize: 12, fontWeight: 700, marginTop: 4 }}>{title}</div>
            <div style={{ fontSize: 11, color: "#565959" }}>{sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────── STAR RATING ──────────────────── */
function StarRating({ rating, count }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <div style={{ display: "flex" }}>
        {[1,2,3,4,5].map(i => <span key={i} style={{ color: i <= Math.round(rating) ? "#f59e0b" : "#d1d5db", fontSize: 13 }}>★</span>)}
      </div>
      <span style={{ color: "#0066c0", fontSize: 12, cursor: "pointer" }}>({count?.toLocaleString()})</span>
    </div>
  );
}

/* ──────────────────── PRODUCT CARD ──────────────────── */
function ProductCard({ product, onAddToCart, onViewProduct }) {
  const [added, setAdded] = useState(false);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const badgeColors = { "Best Seller": "#c45500", "Prime": "#0066c0", "Deal": "#cc0c39", "New": "#007600", "Hot": "#e31c22" };

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div onClick={() => onViewProduct(product)} style={{ background: "#fff", borderRadius: 8, padding: 16, cursor: "pointer", border: "1px solid #ddd", transition: "box-shadow 0.2s, transform 0.15s", position: "relative", display: "flex", flexDirection: "column", gap: 8 }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
      {product.badge && <div style={{ position: "absolute", top: 10, left: 10, background: badgeColors[product.badge] || "#555", color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>{product.badge}</div>}
      <div style={{ fontSize: 72, textAlign: "center", padding: "20px 0", background: "#f7f8f8", borderRadius: 6 }}>{product.image}</div>
      <div style={{ fontSize: 14, fontWeight: 500, color: "#0f1111", lineHeight: 1.4, minHeight: 40 }}>{product.name}</div>
      <StarRating rating={product.rating} count={product.reviews} />
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span style={{ fontSize: 22, fontWeight: 700 }}>${product.price.toFixed(2)}</span>
        <span style={{ fontSize: 13, color: "#565959", textDecoration: "line-through" }}>${product.originalPrice.toFixed(2)}</span>
        <span style={{ fontSize: 13, color: "#cc0c39", fontWeight: 600 }}>-{discount}%</span>
      </div>
      {product.stock < 10 && <div style={{ fontSize: 12, color: "#cc0c39", fontWeight: 500 }}>Only {product.stock} left!</div>}
      <button onClick={handleAdd} style={{ background: added ? "#067d62" : "#ffd814", border: "none", borderRadius: 20, padding: "8px 12px", fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "background 0.3s", color: added ? "#fff" : "#0f1111", marginTop: "auto" }}>
        {added ? "✓ Added to Cart" : "Add to Cart"}
      </button>
    </div>
  );
}

/* ──────────────────── CART PANEL ──────────────────── */
function CartPanel({ cart, onRemove, onUpdateQty, onClose, onCheckout }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const itemCount = cart.reduce((s, i) => s + i.qty, 0);
  return (
    <div style={{ position: "fixed", right: 0, top: 0, height: "100vh", width: 380, background: "#fff", boxShadow: "-4px 0 20px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column", zIndex: 1000, animation: "slideIn 0.25s ease-out" }}>
      <style>{`@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>
      <div style={{ background: "#232f3e", color: "#fff", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Cart ({itemCount})</span>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer" }}>×</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", color: "#888", padding: 40 }}><div style={{ fontSize: 48 }}>🛒</div><p>Your cart is empty</p></div>
        ) : cart.map(item => (
          <div key={item.id} style={{ display: "flex", gap: 10, padding: 12, border: "1px solid #eee", borderRadius: 8 }}>
            <div style={{ fontSize: 36 }}>{item.image}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4, lineHeight: 1.3 }}>{item.name}</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>${(item.price * item.qty).toFixed(2)}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                <button onClick={() => onUpdateQty(item.id, item.qty - 1)} style={{ width: 24, height: 24, border: "1px solid #ccc", background: "#f0f2f2", cursor: "pointer", borderRadius: 3 }}>−</button>
                <span style={{ fontSize: 13 }}>{item.qty}</span>
                <button onClick={() => onUpdateQty(item.id, item.qty + 1)} style={{ width: 24, height: 24, border: "1px solid #ccc", background: "#f0f2f2", cursor: "pointer", borderRadius: 3 }}>+</button>
                <button onClick={() => onRemove(item.id)} style={{ background: "none", border: "none", color: "#cc0c39", fontSize: 12, cursor: "pointer" }}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div style={{ padding: 16, borderTop: "2px solid #eee" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 16 }}>
            <span>Subtotal ({itemCount}):</span>
            <span style={{ fontWeight: 700 }}>${total.toFixed(2)}</span>
          </div>
          <button onClick={onCheckout} style={{ width: "100%", background: "#ffd814", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

/* ──────────────────── PRODUCT DETAIL ──────────────────── */
function ProductDetail({ product, onAddToCart, onBuyNow, onBack }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#0066c0", cursor: "pointer", fontSize: 14, marginBottom: 16 }}>← Back to results</button>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, background: "#fff", padding: 32, borderRadius: 8, border: "1px solid #ddd" }}>
        <div style={{ background: "#f7f8f8", borderRadius: 8, padding: 40, textAlign: "center", fontSize: 120 }}>{product.image}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h1 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>{product.name}</h1>
          <StarRating rating={product.rating} count={product.reviews} />
          <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 28, fontWeight: 700 }}>${product.price.toFixed(2)}</span>
              <span style={{ fontSize: 14, color: "#565959", textDecoration: "line-through" }}>${product.originalPrice.toFixed(2)}</span>
              <span style={{ color: "#cc0c39", fontWeight: 600 }}>-{discount}%</span>
            </div>
            <div style={{ fontSize: 13, color: "#007600", marginTop: 4 }}>FREE Returns · FREE Delivery</div>
          </div>
          <div style={{ fontSize: 14, color: product.stock < 10 ? "#cc0c39" : "#007600", fontWeight: 600 }}>
            {product.stock < 10 ? `Only ${product.stock} left!` : "In Stock"}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <label style={{ fontSize: 13 }}>Qty:</label>
            <select value={qty} onChange={e => setQty(Number(e.target.value))} style={{ padding: "4px 8px", border: "1px solid #ccc", borderRadius: 4 }}>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <button onClick={() => { for(let i=0;i<qty;i++) onAddToCart(product); setAdded(true); setTimeout(()=>setAdded(false),2000); }}
            style={{ background: added?"#067d62":"#ffd814", border:"none", borderRadius:24, padding:"12px", fontWeight:700, fontSize:15, cursor:"pointer", color:added?"#fff":"#0f1111", transition:"background 0.3s" }}>
            {added ? "✓ Added!" : "Add to Cart"}
          </button>
          <button onClick={() => onBuyNow(product, qty)}
            style={{ background: "#ff9900", border: "none", borderRadius: 24, padding: "12px", fontWeight: 700, fontSize: 15, cursor: "pointer", color: "#fff" }}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────── CHECKOUT MODAL ──────────────────── */
function CheckoutModal({ cart, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name:"", email:"", address:"", city:"", card:"", expiry:"", cvv:"" });
  const [done, setDone] = useState(false);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:2000, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ background:"#fff", borderRadius:8, padding:32, width:480, maxWidth:"95vw" }}>
        {done ? (
          <div style={{ textAlign:"center", padding:20 }}>
            <div style={{ fontSize:64 }}>✅</div>
            <h2 style={{ color:"#007600" }}>Order Placed!</h2>
            <p>Your items will arrive in 2-3 business days.</p>
            <p style={{ fontWeight:700 }}>Total: ${total.toFixed(2)}</p>
            <button onClick={onClose} style={{ background:"#ffd814", border:"none", padding:"10px 24px", borderRadius:20, fontWeight:700, cursor:"pointer", marginTop:12 }}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20 }}>
              {["Shipping","Payment","Review"].map((s,i) => (
                <div key={s} style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <div style={{ width:24, height:24, borderRadius:"50%", background:step>i?"#007600":step===i+1?"#ff9900":"#ccc", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700 }}>{step>i?"✓":i+1}</div>
                  <span style={{ fontSize:13, fontWeight:step===i+1?700:400 }}>{s}</span>
                </div>
              ))}
            </div>
            {step===1 && <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <h3 style={{ margin:0 }}>Shipping</h3>
              {[["Full Name","name"],["Email","email"],["Address","address"],["City","city"]].map(([label,key]) => (
                <div key={key}><label style={{ fontSize:13, display:"block", marginBottom:4 }}>{label}</label>
                <input value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} style={{ width:"100%", padding:"8px 10px", border:"1px solid #ccc", borderRadius:4, boxSizing:"border-box" }} placeholder={label}/></div>
              ))}
            </div>}
            {step===2 && <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <h3 style={{ margin:0 }}>Payment</h3>
              {[["Card Number","card","1234 5678 9012 3456"],["Expiry","expiry","MM/YY"],["CVV","cvv","123"]].map(([label,key,ph]) => (
                <div key={key}><label style={{ fontSize:13, display:"block", marginBottom:4 }}>{label}</label>
                <input value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} style={{ width:"100%", padding:"8px 10px", border:"1px solid #ccc", borderRadius:4, boxSizing:"border-box" }} placeholder={ph}/></div>
              ))}
            </div>}
            {step===3 && <div>
              <h3 style={{ margin:"0 0 12px" }}>Review</h3>
              {cart.map(item=>(
                <div key={item.id} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #eee", fontSize:14 }}>
                  <span>{item.image} {item.name} ×{item.qty}</span>
                  <span style={{ fontWeight:700 }}>${(item.price*item.qty).toFixed(2)}</span>
                </div>
              ))}
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:12, fontWeight:700, fontSize:16 }}><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>}
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:20 }}>
              <button onClick={step===1?onClose:()=>setStep(step-1)} style={{ background:"#f0f2f2", border:"1px solid #ccc", padding:"8px 20px", borderRadius:6, cursor:"pointer" }}>{step===1?"Cancel":"Back"}</button>
              <button onClick={()=>step<3?setStep(step+1):setDone(true)} style={{ background:step===3?"#ff9900":"#ffd814", border:"none", padding:"8px 24px", borderRadius:6, fontWeight:700, cursor:"pointer" }}>{step===3?"Place Order":"Continue"}</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ──────────────────── USER DROPDOWN ──────────────────── */
function UserDropdown({ user, onLogout, onClose }) {
  return (
    <>
      <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:199 }} />
      <div style={{ position:"absolute", top:"100%", right:0, background:"#fff", border:"1px solid #ddd", borderRadius:8, boxShadow:"0 4px 20px rgba(0,0,0,0.15)", padding:16, zIndex:200, width:220, marginTop:8 }}>
        <div style={{ borderBottom:"1px solid #eee", paddingBottom:10, marginBottom:10 }}>
          <div style={{ fontWeight:700, fontSize:15 }}>Hello, {user.name}!</div>
          <div style={{ fontSize:12, color:"#555" }}>{user.email}</div>
        </div>
        {[["📦","Your Orders"],["❤️","Wishlist"],["🔔","Notifications"],["⚙️","Settings"]].map(([icon, label]) => (
          <div key={label} onClick={onClose} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 4px", cursor:"pointer", borderRadius:4, fontSize:13 }}
            onMouseEnter={e=>e.currentTarget.style.background="#f7f8f8"}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            {icon} {label}
          </div>
        ))}
        <div style={{ borderTop:"1px solid #eee", marginTop:8, paddingTop:8 }}>
          <button onClick={onLogout} style={{ width:"100%", background:"#f0f2f2", border:"1px solid #ddd", padding:"8px", borderRadius:6, cursor:"pointer", fontSize:13, fontWeight:600 }}>Sign Out</button>
        </div>
      </div>
    </>
  );
}

/* ──────────────────── MAIN APP ──────────────────── */
export default function App() {
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
