import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, User, BarChart, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen p-4 flex flex-col fixed">
      {" "}
      {/* fixed ekleyin ve min-h-screen yerine h-screen kullanın */}
      <div className="flex items-center gap-2 mb-8">
        <Calendar className="w-8 h-8 text-sidebar-primary" />
        <h2 className="text-xl font-bold text-sidebar-foreground">
          Schedulify
        </h2>
      </div>
      <nav className="space-y-2">
        <NavItem icon={Home} to="/" label="My Contents" />
        <NavItem icon={Calendar} to="/schedule" label="Scheduled Contents" />
        <NavItem icon={User} to="/accounts" label="My Accounts" />
        <NavItem icon={BarChart} to="/analytics" label="Analytics" />
        <NavItem icon={Settings} to="/settings" label="Settings" />
      </nav>
      <div className="mt-auto">
        <Button
          variant="outline"
          className="w-full border-sidebar-border text-sidebar-foreground"
        >
          <User className="w-4 h-4 mr-2" />
          Profile
        </Button>
      </div>
    </aside>
  );
}

function NavItem({ icon: Icon, to, label }) {
  // useLocation hook'u ile aktif route'u alabiliriz
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md",
        "transition-colors",
        isActive
          ? "bg-sidebar-accent text-sidebar-foreground"
          : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground",
      )}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  );
}
