import { useState } from "react";
import { Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { adminLogin } from "../lib/auth";
import usePageTitle from "../lib/usePageTitle";

export default function AdminLogin({ onSuccess }) {
  usePageTitle("Admin Login");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (adminLogin(id, password)) {
      onSuccess();
    } else {
      setError("Incorrect ID or password. Please try again.");
      setPassword("");
    }
  };

  return (
    <section className="page">
      <div className="container">
        <div className="info-card login-card">
          <span className="why-icon"><Lock size={22} /></span>
          <h1>Admin Login</h1>
          <p>Sign in to manage OneTap resources.</p>

          <form className="form" onSubmit={submit}>
            <label>
              Admin ID
              <input
                required
                autoFocus
                autoComplete="username"
                value={id}
                onChange={(e) => { setId(e.target.value); setError(""); }}
                placeholder="Enter your admin ID"
              />
            </label>

            <label>
              Password
              <span className="pw-field">
                <input
                  required
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>

            {error && <p className="form-error" role="alert">{error}</p>}

            <button className="btn btn-primary btn-lg" type="submit"><LogIn size={16} /> Login</button>
          </form>
        </div>
      </div>
    </section>
  );
}
