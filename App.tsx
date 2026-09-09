import React from "react";
import { EnhancedAppShell } from "./src/next/EnhancedAppShell";

// v1.1: full expansion - 10 activities plus a hold-to-unlock Parent Gate
// in front of settings. See src/next/EnhancedAppShell.tsx for the screen
// graph, and src/screens/*.tsx for the original 4 activities that remain
// available (SafeAppShell) if you ever want to roll back to the minimal set.
export default function App() {
  return <EnhancedAppShell />;
}
