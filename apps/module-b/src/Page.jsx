import React from "react";

export default function ModuleBPage() {
  return (
    <div style={{ border: "1px solid #d1d5db", padding: 16, borderRadius: 12, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto" }}>
      <h2 style={{ marginTop: 0 }}>Module B</h2>
      <p>Another independent React micro-frontend, exposed as <code>./Page</code> from <code>module-b</code>.</p>
      <p>Swap or iterate page-by-page without touching the shell.</p>
    </div>
  );
}
