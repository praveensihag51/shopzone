import { useState } from "react";

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

export default CheckoutModal;