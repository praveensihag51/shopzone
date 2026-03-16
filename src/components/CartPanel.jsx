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

export default CartPanel;