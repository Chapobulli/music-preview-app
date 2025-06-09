import React from "react";

export function Button({ children, ...props }) {
  return (
    <button {...props} style={{ padding: "8px 16px", borderRadius: "4px", border: "1px solid #ccc" }}>
      {children}
    </button>
  );
}