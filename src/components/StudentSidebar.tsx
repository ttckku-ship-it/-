import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Heart,
  BookOpen,
  MessageCircle,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "لوحة الطالب", path: "/student-dashboard", icon: LayoutDashboard },
  { label: "الدعم الطلابي", path: "/student-support", icon: Heart },
  { label: "مشاكلي الدراسية", path: "/student-cases", icon: BookOpen },
  { label: "استشارات أكاديمية", path: "/student-advisor", icon: MessageCircle },
  { label: "تحليلات الأداء", path: "/student-insights", icon: BarChart3 },
  { label: "الإعدادات", path: "/settings", icon: Settings },
];

export default function StudentSidebar({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full">

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 right-0 h-full z-40 flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >

        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
          <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0">
            <img
              src="/logo.png"
              alt="logo"
              className="w-16 h-16 rounded-lg object-cover"
            />
          </div>

          {!collapsed && (
            <span className="text-lg font-bold tracking-wide">
              حصين الطلاب 🎓
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 transition-colors"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span>تسجيل الخروج</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div
        className={cn(
          "flex-1 transition-all duration-300",
          collapsed ? "mr-16" : "mr-64"
        )}
      >

        {/* Top bar */}
        <header className="sticky top-0 z-30 h-14 bg-background/80 backdrop-blur-md border-b flex items-center px-6 gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <Menu className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
          </Button>

          <h1 className="text-sm font-medium text-muted-foreground">
            {navItems.find((i) => i.path === location.pathname)?.label ??
              "حصين الطلاب"}
          </h1>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}