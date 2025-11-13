import React from "react";

export default function ModuleAPage() {
  return (
    <div style={{ border: "1px solid #d1d5db", padding: 16, borderRadius: 12, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto" }}>
      <h2 style={{ marginTop: 0 }}>Module A</h2>
      <p>This is a React micro-frontend exposed via <code>./Page</code> from <code>module-a</code>.</p>
      <ul>
        <li>Built with Webpack Module Federation</li>
        <li>Loaded at runtime by the iframe adaptor</li>
        <li>Can be developed, built, and deployed independently</li>
      </ul>
    </div>
  );
}
