import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import { loadRemote } from "./loadRemote";

const mappings = {
  a: { scope: "module_a", remoteUrl: "http://localhost:3001/remoteEntry.js", module: "./Page", title: "Module A" },
  b: { scope: "module_b", remoteUrl: "http://localhost:3002/remoteEntry.js", module: "./Page", title: "Module B" }
};

function useQuery() {
  return useMemo(() => new URLSearchParams(window.location.search), []);
}

function App() {
  const query = useQuery();
  const page = (query.get("page") || "a").toLowerCase();
  const cfg = mappings[page] || mappings.a;

  const [{ Comp, error, loading }, setState] = useState({ Comp: null, error: null, loading: true });

  useEffect(() => {
    let alive = true;
    setState({ Comp: null, error: null, loading: true });
    loadRemote(cfg.remoteUrl, cfg.scope, cfg.module)
      .then((mod) => {
        if (!alive) return;
        const Component = mod.default || mod;
        setState({ Comp: Component, error: null, loading: false });
        document.title = `Adaptor • ${cfg.title}`;
      })
      .catch((e) => {
        if (!alive) return;
        setState({ Comp: null, error: e, loading: false });
      });
    return () => { alive = false; };
  }, [page]);

  if (loading) return <div style={{ padding: 16 }}>Loading {cfg.title}…</div>;
  if (error) return <div style={{ padding: 16, color: "crimson" }}>Failed to load module: {String(error)}</div>;
  if (!Comp) return null;
  return <div style={{ padding: 16 }}><Comp /></div>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
