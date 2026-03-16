import { useState } from "react";
import StarRating from "./StarRating";

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

export default ProductDetail;