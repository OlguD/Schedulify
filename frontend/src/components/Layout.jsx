import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Button } from "./ui/button";
import { Bell, Moon, Sun } from "lucide-react";

export default function Layout({ children }) {
  const [theme, setTheme] = useState(() => {
    // localStorage'dan tema tercihini al veya sistem tercihini kontrol et
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme;
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light"; // Varsayılan tema
  });
  useEffect(() => {
    // Tema değiştiğinde HTML element'ine dark class'ını ekle/kaldır
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    // Tema tercihini localStorage'a kaydet
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-64">
        <header className="h-16 border-b border-border px-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Dashboard</h1>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
