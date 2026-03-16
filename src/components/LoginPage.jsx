import { useState } from "react";
import { INPUT_STYLE, BTN_PRIMARY, BTN_SECONDARY } from "./constants";

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

export default LoginPage;