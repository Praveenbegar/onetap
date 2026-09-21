import { useState } from "react";
import Admin from "../pages/Admin";
import AdminLogin from "../pages/AdminLogin";
import { isAdminLoggedIn, adminLogout } from "../lib/auth";

// Shows the login form until the correct admin ID + password are entered.
export default function AdminGate() {
  const [authed, setAuthed] = useState(isAdminLoggedIn);

  if (!authed) return <AdminLogin onSuccess={() => setAuthed(true)} />;

  return (
    <Admin
      onLogout={() => {
        adminLogout();
        setAuthed(false);
      }}
    />
  );
}
