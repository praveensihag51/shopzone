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

export default StarRating;