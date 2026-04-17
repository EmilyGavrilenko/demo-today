"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="theme-toggle" aria-label="Theme switcher">
        <button type="button" aria-label="System theme" style={{ opacity: 0.3 }}>
          💻
        </button>
        <button type="button" aria-label="Light theme" style={{ opacity: 0.3 }}>
          ☀️
        </button>
        <button type="button" aria-label="Dark theme" style={{ opacity: 0.3 }}>
          🌙
        </button>
      </div>
    );
  }

  return (
    <div className="theme-toggle" role="radiogroup" aria-label="Theme switcher">
      <button
        type="button"
        role="radio"
        aria-checked={theme === "system"}
        aria-label="System theme"
        data-active={theme === "system"}
        onClick={() => setTheme("system")}
      >
        💻
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={theme === "light"}
        aria-label="Light theme"
        data-active={theme === "light"}
        onClick={() => setTheme("light")}
      >
        ☀️
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={theme === "dark"}
        aria-label="Dark theme"
        data-active={theme === "dark"}
        onClick={() => setTheme("dark")}
      >
        🌙
      </button>
    </div>
  );
}
