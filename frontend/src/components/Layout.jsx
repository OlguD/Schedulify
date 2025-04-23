import Sidebar from "./Sidebar";
import { Button } from "./ui/button";
import { Bell, Moon, Sun } from "lucide-react";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-64">
        {" "}
        {/* ml-64 ekledik - sidebar genişliği kadar */}
        <header className="h-16 border-b border-border px-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Dashboard</h1>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Sun className="w-5 h-5 dark:hidden" />
              <Moon className="w-5 h-5 hidden dark:block" />
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
