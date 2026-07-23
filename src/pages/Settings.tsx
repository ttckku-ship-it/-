import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Shield, User, Activity, BarChart3, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const { caseId, logout } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [supportCount, setSupportCount] = useState(0);
  const [careerCount, setCareerCount] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data } = await supabase
      .from("cases")
      .select("*")
      .eq("case_id", caseId)
      .single();

    if (!data) return;

    setUser(data);

    const { count: supportBookings } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("case_id", data.id);

    const { count: careerBookings } = await supabase
      .from("career_bookings")
      .select("*", { count: "exact", head: true })
      .eq("case_id", data.id);

    setSupportCount(supportBookings || 0);
    setCareerCount(careerBookings || 0);
  }

  return (
    <div className="space-y-6 max-w-3xl">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">
          الإعدادات
        </h2>

        <p className="text-muted-foreground text-sm">
          معلومات الحساب وإدارة الجلسات
        </p>
      </div>

      {/* معلومات الحساب */}
      <div
        className="bg-card rounded-xl border p-6"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="flex items-center gap-3 mb-5">
          <User className="w-5 h-5 text-primary" />
          <h3 className="font-bold">معلومات الحساب</h3>
        </div>

        <div className="space-y-3">

          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">
              الاسم
            </span>

            <span className="font-medium">
              {user?.full_name}
            </span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-muted-foreground">
              البريد الإلكتروني
            </span>

            <span>
              {user?.email}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">
              معرف الحالة
            </span>

            <code>{caseId}</code>
          </div>

        </div>
      </div>

      {/* حالة الحساب */}
      <div
        className="bg-card rounded-xl border p-6"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="flex items-center gap-3 mb-5">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="font-bold">
            الحالة الحالية
          </h3>
        </div>

        <div className="space-y-3">

          <div className="flex justify-between">
            <span>مؤشر الاحتراق</span>

            <span className="font-bold">
              {user?.burnout_score ?? 0}%
            </span>
          </div>

          <div className="flex justify-between">
            <span>مستوى الخطر</span>

            <span>
              {user?.risk_level ?? "--"}
            </span>
          </div>

          <div className="flex justify-between">
            <span>تاريخ إنشاء الحساب</span>

            <span>
              {user?.created_at?.split("T")[0]}
            </span>
          </div>

        </div>
      </div>

      {/* الإحصائيات */}
      <div
        className="bg-card rounded-xl border p-6"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="flex items-center gap-3 mb-5">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="font-bold">
            الإحصائيات
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="bg-muted rounded-lg p-4 text-center">
            <p className="text-3xl font-bold">
              {supportCount}
            </p>

            <p className="text-sm text-muted-foreground">
              جلسات الدعم النفسي
            </p>
          </div>

          <div className="bg-muted rounded-lg p-4 text-center">
            <p className="text-3xl font-bold">
              {careerCount}
            </p>

            <p className="text-sm text-muted-foreground">
              جلسات المستشار المهني
            </p>
          </div>

        </div>
      </div>

      {/* حماية البيانات */}
      <div className="p-5 bg-accent rounded-xl">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-accent-foreground mt-1" />

          <div>
            <p className="font-semibold text-accent-foreground">
              حماية البيانات
            </p>

            <p className="text-sm text-accent-foreground/80 mt-1">
              جميع بياناتك محفوظة داخل النظام ولا يتم مشاركتها مع أي جهة خارجية،
              ويتم استخدام معرف الحالة بدلاً من المعلومات الشخصية داخل النظام.
            </p>
          </div>
        </div>
      </div>

      {/* تسجيل الخروج */}
      <Button
        variant="destructive"
        className="w-full"
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        <LogOut className="w-4 h-4 ml-2" />
        تسجيل الخروج
      </Button>

    </div>
  );
}