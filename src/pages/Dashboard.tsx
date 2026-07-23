import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import {
  Activity,
  TrendingUp,
  HeartHandshake,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  ClipboardList,
} from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


const quickActions = [
  { label: "بدء تقييم", icon: ClipboardList, path: "/support" },
  { label: "طلب استشارة", icon: HeartHandshake, path: "/support" },
  { label: "عرض التحليلات", icon: BarChart3, path: "/ai-insights" },
  { label: "حجز مستشار مهني", icon: Briefcase, path: "/career-advisor" },

];

const overviewCards = [
  {
    label: "الدعم النفسي",
    desc: "استشارات ودعم",
    icon: HeartHandshake,
    path: "/support",
    color: "bg-secondary/10 text-secondary",
  },
  {
    label: "المستشار المهني",
    desc: "تقييم المسار الوظيفي",
    icon: Briefcase,
    path: "/career-advisor",
    color: "bg-accent/10 text-accent",
  },
];
export default function Dashboard() {
  const { caseId } = useAuth();
  const navigate = useNavigate();
const [burnoutScore, setBurnoutScore] = useState(0);
const [riskLevel, setRiskLevel] = useState("");
const [status, setStatus] = useState("");

useEffect(() => {
  const loadDashboard = async () => {
    const { data, error } = await supabase
      .from("cases")
      .select("burnout_score, risk_level, status")
      .eq("case_id", caseId)
      .single();

    if (error || !data) return;

    setBurnoutScore(data.burnout_score);
    setRiskLevel(data.risk_level);
    setStatus(data.status);
  };

  if (caseId) {
    loadDashboard();
  }
}, [caseId]);

  const getScoreColor = () => {
    if (burnoutScore < 30) return "text-success";
    if (burnoutScore < 60) return "text-warning";
    return "text-destructive";
  };

  const getStatusIcon = () => {
    if (status === "طبيعي") return <CheckCircle2 className="w-5 h-5 text-success" />;
    if (status === "ضغط") return <AlertTriangle className="w-5 h-5 text-warning" />;
    return <AlertTriangle className="w-5 h-5 text-destructive" />;
  };

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">مرحباً بك</h2>
        <p className="text-muted-foreground text-sm">معرّف الحالة: {caseId}</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border p-5" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">مؤشر الاحتراق</span>
            <Activity className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className={`text-3xl font-bold ${getScoreColor()}`}>{burnoutScore}%</p>
          <div className="w-full bg-muted rounded-full h-2 mt-3">
            <div
              className="h-2 rounded-full bg-warning transition-all"
              style={{ width: `${burnoutScore}%` }}
            />
          </div>
        </div>

        <div className="bg-card rounded-xl border p-5" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">مستوى الخطر</span>
            {getStatusIcon()}
          </div>
          <p className="text-3xl font-bold text-warning">{riskLevel}</p>
          <p className="text-xs text-muted-foreground mt-1">بناءً على آخر تقييم</p>
        </div>

        <div className="bg-card rounded-xl border p-5" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">الحالة الحالية</span>
            {getStatusIcon()}
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-warning" />
            <p className="text-xl font-bold text-foreground">{status}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">يُنصح بإجراء تقييم جديد</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-xl border p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <h3 className="text-lg font-bold text-card-foreground mb-4">إجراءات سريعة</h3>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <Button key={action.label} variant="outline" onClick={() => navigate(action.path)} className="gap-2">
              <action.icon className="w-4 h-4" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {overviewCards.map((card) => (
          <button
            key={card.path}
            onClick={() => navigate(card.path)}
            className="bg-card rounded-xl border p-5 text-right hover:shadow-md transition-all group"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center mb-3`}>
              <card.icon className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-card-foreground group-hover:text-primary transition-colors">{card.label}</h4>
            <p className="text-sm text-muted-foreground">{card.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
