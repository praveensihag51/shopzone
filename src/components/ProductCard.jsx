import { useState } from "react";
import StarRating from "./StarRating";

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

export default ProductCard;