// Front-end login gate for the /admin page.
// The session is kept in sessionStorage, so it ends when the browser tab is closed.
import site from "../config/site";

const KEY = "onetap_admin_session";

export function isAdminLoggedIn() {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false; // storage blocked - treat as logged out
  }
}

export function adminLogin(id, password) {
  const ok = id.trim() === site.adminId && password === site.adminPassword;
  if (ok) {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* storage blocked - the login still works for this page view */
    }
  }
  return ok;
}

export function adminLogout() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* nothing to clear */
  }
}
