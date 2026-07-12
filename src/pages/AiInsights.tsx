import { BarChart3, TrendingDown, TrendingUp, Users, Activity, CheckCircle2 } from "lucide-react";

const insights = [
  "ارتفاع مؤشر الاحتراق بنسبة 15% خلال الشهر الماضي",
  "يُنصح بزيادة فترات الراحة بين المهام المتتالية",
  "أظهرت بيانات التفاعل تحسناً في الحالة النفسية بعد الجلسات الأخيرة",
];

export default function AiInsights() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">التحليلات الذكية</h2>
        <p className="text-muted-foreground text-sm">رؤى مبنية على الذكاء الاصطناعي لمتابعة حالتك</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border p-4 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
          <Activity className="w-5 h-5 text-warning mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">42%</p>
          <p className="text-xs text-muted-foreground">مؤشر الاحتراق</p>
        </div>
        <div className="bg-card rounded-xl border p-4 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
          <TrendingDown className="w-5 h-5 text-success mx-auto mb-2" />
          <p className="text-2xl font-bold text-success">-8%</p>
          <p className="text-xs text-muted-foreground">تغيّر شهري</p>
        </div>
        <div className="bg-card rounded-xl border p-4 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
          <Users className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">5</p>
          <p className="text-xs text-muted-foreground">جلسات دعم</p>
        </div>
        <div className="bg-card rounded-xl border p-4 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
          <TrendingUp className="w-5 h-5 text-secondary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">78%</p>
          <p className="text-xs text-muted-foreground">جاهزية الترقية</p>
        </div>
      </div>

      {/* Trends chart placeholder */}
      <div className="bg-card rounded-xl border p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <h3 className="text-lg font-bold text-card-foreground mb-4">اتجاهات الاحتراق الوظيفي</h3>
        <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">الرسوم البيانية ستظهر بعد جمع بيانات كافية</p>
          </div>
        </div>
      </div>

      {/* AI recommendations */}
      <div className="bg-card rounded-xl border p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <h3 className="text-lg font-bold text-card-foreground mb-4">توصيات ذكية</h3>
        <ul className="space-y-3">
          {insights.map((insight, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
              <span className="text-sm text-muted-foreground">{insight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
