import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Shield, Bell, Eye, Key } from "lucide-react";

export default function SettingsPage() {
  const { caseId } = useAuth();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold text-foreground">الإعدادات</h2>
        <p className="text-muted-foreground text-sm">إدارة حسابك وإعدادات الخصوصية</p>
      </div>

      {/* Case ID */}
      <div className="bg-card rounded-xl border p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-3 mb-4">
          <Key className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-card-foreground">معرّف الحالة</h3>
        </div>
        <div className="p-3 bg-muted rounded-lg text-center">
          <code className="text-lg tracking-widest text-foreground" dir="ltr">{caseId}</code>
        </div>
        <p className="text-xs text-muted-foreground mt-2">هذا المعرّف مشفّر ولا يمكن ربطه بهويتك الحقيقية</p>
      </div>

      {/* Privacy */}
      <div className="bg-card rounded-xl border p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-3 mb-4">
          <Eye className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-card-foreground">إعدادات الخصوصية</h3>
        </div>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-lg bg-muted/50 cursor-pointer">
            <span className="text-sm text-foreground">إخفاء البيانات من التقارير الإحصائية</span>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
          </label>
          <label className="flex items-center justify-between p-3 rounded-lg bg-muted/50 cursor-pointer">
            <span className="text-sm text-foreground">تشفير المحادثات</span>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
          </label>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-xl border p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-card-foreground">الإشعارات</h3>
        </div>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-lg bg-muted/50 cursor-pointer">
            <span className="text-sm text-foreground">تذكيرات التقييم</span>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
          </label>
          <label className="flex items-center justify-between p-3 rounded-lg bg-muted/50 cursor-pointer">
            <span className="text-sm text-foreground">مواعيد الجلسات</span>
            <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
          </label>
          <label className="flex items-center justify-between p-3 rounded-lg bg-muted/50 cursor-pointer">
            <span className="text-sm text-foreground">نتائج التحليلات</span>
            <input type="checkbox" className="w-4 h-4 accent-primary" />
          </label>
        </div>
      </div>

      {/* Security note */}
      <div className="p-4 bg-accent rounded-xl">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-accent-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium text-accent-foreground">حماية البيانات</p>
            <p className="text-xs text-accent-foreground/70 mt-1">
              جميع البيانات مفصولة بالكامل عن الهوية الشخصية. لا يمكن لأي جهة إدارية الوصول للبيانات الفردية.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
