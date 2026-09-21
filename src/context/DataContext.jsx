import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import bundled from "../data/resources.json";
import site from "../config/site";
import { sheetToResources } from "../lib/sheet";

const STORAGE_KEY = "onetap_admin_data_v1";
const DataContext = createContext(null);

function readLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function DataProvider({ children }) {
  // priority: Google Sheet  >  admin (local browser) edits  >  bundled resources.json
  const [local, setLocal] = useState(readLocal);
  const [sheetResources, setSheetResources] = useState(null);
  const [loading, setLoading] = useState(Boolean(site.sheetUrl));

  const categories = local?.categories || bundled.categories;

  useEffect(() => {
    if (!site.sheetUrl) return;
    let alive = true;
    fetch(site.sheetUrl)
      .then((r) => r.text())
      .then((csv) => {
        if (!alive) return;
        const list = sheetToResources(csv, categories);
        if (list.length) setSheetResources(list);
      })
      .catch(() => {})
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resources = sheetResources || local?.resources || bundled.resources;
  const source = sheetResources ? "sheet" : local ? "local" : "bundled";

  const saveLocal = useCallback((next) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setLocal(next);
  }, []);

  const resetLocal = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setLocal(null);
  }, []);

  const value = useMemo(
    () => ({ resources, categories, source, loading, saveLocal, resetLocal }),
    [resources, categories, source, loading, saveLocal, resetLocal]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => useContext(DataContext);
