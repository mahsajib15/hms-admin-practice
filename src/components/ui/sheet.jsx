import React from "react";

export function Sheet({ children }) {
  return <div className="sheet">{children}</div>;
}

export function SheetTrigger({ children }) {
  return <div className="sheet-trigger">{children}</div>;
}

export function SheetContent({ children }) {
  return <div className="sheet-content">{children}</div>;
}