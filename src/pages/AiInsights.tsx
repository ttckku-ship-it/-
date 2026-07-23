import { BarChart3, TrendingDown, TrendingUp, Users, Activity, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { analyzeCase } from "@/lib/aiEngine";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AiInsights() {
 const { caseId } = useAuth();

  const [assessment, setAssessment] = useState<any>(null);
  const [bookingCount, setBookingCount] = useState(0);
  const [career, setCareer] = useState<any>(null);
  const analysis =
  assessment &&
  analyzeCase({
    burnout: assessment.burnout_score,
    risk: assessment.risk_level,
    sessions: bookingCount,
    careerScore: career?.score ?? 0,
  });
const [chartData, setChartData] = useState<any[]>([]);
  async function loadData() {
    const { data: userCase } = await supabase
      .from("cases")
      .select("id")
      .eq("case_id", caseId)
      .single();

    if (!userCase) return;

    const { data: assessment } = await supabase
      .from("assessments")
      .select("*")
      .eq("case_id", userCase.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    const { count } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("case_id", userCase.id);

    const { data: career } = await supabase
      .from("career_bookings")
      .select("*")
      .eq("case_id", userCase.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

      const { data: assessments } = await supabase
  .from("assessments")
  .select("burnout_score, created_at")
  .eq("case_id", userCase.id)
  .order("created_at", { ascending: true });

setChartData(
  (assessments || []).map((item) => ({
    date: new Date(item.created_at).toLocaleDateString("ar-SA"),
    score: item.burnout_score,
  }))
);

    setAssessment(assessment);
    setBookingCount(count || 0);
    setCareer(career);
  }

  useEffect(() => {
    loadData();
  },  []);

  const insights: string[] = [];

if (assessment) {
  insights.push(
    `آخر تقييم للاحتراق الوظيفي: ${assessment.burnout_score}% (${assessment.risk_level}).`
  );
}

if (bookingCount > 0) {
  insights.push(
    `لديك ${bookingCount} جلسة دعم نفسي مسجلة.`
  );
}

if (career) {
  insights.push(
    `آخر تقييم مهني: ${career.result} بدرجة ${career.score}/12.`
  );
}

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
<p className="text-2xl font-bold text-foreground">
  {assessment?.burnout_score ?? 0}%
</p>          <p className="text-xs text-muted-foreground">مؤشر الاحتراق</p>
        </div>
        <div className="bg-card rounded-xl border p-4 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
          <TrendingDown className="w-5 h-5 text-success mx-auto mb-2" />
          <p className="text-2xl font-bold text-success">-8%</p>
          <p className="text-xs text-muted-foreground">تغيّر شهري</p>
        </div>
        <div className="bg-card rounded-xl border p-4 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
          <Users className="w-5 h-5 text-primary mx-auto mb-2" />
<p className="text-2xl font-bold text-foreground">
  {bookingCount}
</p>          <p className="text-xs text-muted-foreground">جلسات دعم</p>
        </div>
        <div className="bg-card rounded-xl border p-4 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
          <TrendingUp className="w-5 h-5 text-secondary mx-auto mb-2" />
<p className="text-2xl font-bold text-foreground">
  {career ? Math.round((career.score / 12) * 100) : "--"}%
</p>          <p className="text-xs text-muted-foreground">جاهزية الترقية</p>
        </div>
      </div>

      {/* Trends chart placeholder */}
      <div className="bg-card rounded-xl border p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <h3 className="text-lg font-bold text-card-foreground mb-4">اتجاهات الاحتراق الوظيفي</h3>
       <div className="h-72">
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="date" />

      <YAxis domain={[0, 100]} />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="score"
        stroke="#2563eb"
        strokeWidth={3}
      />
    </LineChart>
  </ResponsiveContainer>
</div>
      </div>

<div
  className="bg-card rounded-xl border p-6"
  style={{ boxShadow: "var(--shadow-card)" }}
>
  <h3 className="text-lg font-bold mb-4">
    🤖 تحليل النظام الذكي
  </h3>

  {analysis ? (
    <div className="space-y-4">

      <div className="flex justify-between">
        <span>درجة الحالة</span>
        <span className="font-bold">
          {analysis.score}/100
        </span>
      </div>

      <div className="flex justify-between">
        <span>مستوى الحالة</span>
        <span
          className={`font-bold ${
            analysis.level === "مرتفع"
              ? "text-red-500"
              : analysis.level === "متوسط"
              ? "text-yellow-500"
              : "text-green-600"
          }`}
        >
          {analysis.level}
        </span>
      </div>

<div className="space-y-5">

  <div>
    <h4 className="font-semibold mb-2">📋 ملخص الحالة</h4>
    <div className="border rounded-lg p-4 bg-muted/30">
      {analysis.summary}
    </div>
  </div>

  <div>
    <h4 className="font-semibold mb-2">📌 أسباب القرار</h4>

    <ul className="list-disc pr-5 space-y-2">
      {analysis.reasons.map((reason, index) => (
        <li key={index}>
          {reason}
        </li>
      ))}
    </ul>
  </div>

  <div>
    <h4 className="font-semibold mb-2">💡 التوصية</h4>

    <div className="border rounded-lg p-4 bg-primary/5">
      {analysis.recommendation}
    </div>
  </div>

</div>

    </div>
  ) : (
    <p>لا توجد بيانات كافية للتحليل.</p>
  )}
</div>

      {/* AI recommendations */}
      <div className="bg-card rounded-xl border p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <h3 className="text-lg font-bold text-card-foreground mb-4">آخر التحديثات</h3>
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
