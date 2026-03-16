import { useState } from "react";
import { INPUT_STYLE, BTN_PRIMARY } from "./constants";

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

export default SignupPage;