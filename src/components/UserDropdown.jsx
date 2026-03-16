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

export default UserDropdown;