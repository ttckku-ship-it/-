import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink, TrendingUp, Brain, CheckCircle2, AlertTriangle, GraduationCap, BarChart3, Target, Play, Clock, Award } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const mockExams = [
  { title: "اختبار محاكي - لفظي", questions: 30, duration: "25 دقيقة", difficulty: "متوسط", completed: true, score: 78 },
  { title: "اختبار محاكي - كمّي", questions: 25, duration: "30 دقيقة", difficulty: "متقدم", completed: true, score: 65 },
  { title: "اختبار محاكي - شامل (1)", questions: 50, duration: "60 دقيقة", difficulty: "متوسط", completed: false, score: null },
  { title: "اختبار محاكي - شامل (2)", questions: 50, duration: "60 دقيقة", difficulty: "متقدم", completed: false, score: null },
];

const courses = [
  { title: "أساسيات القدرة اللفظية", lessons: 12, duration: "6 ساعات", progress: 100, icon: BookOpen },
  { title: "القدرة الكمية - المستوى المتوسط", lessons: 15, duration: "8 ساعات", progress: 60, icon: BarChart3 },
  { title: "الاستدلال المنطقي", lessons: 10, duration: "5 ساعات", progress: 30, icon: Brain },
  { title: "التحليل والاستنتاج المتقدم", lessons: 18, duration: "10 ساعات", progress: 0, icon: Target },
];

const performanceData = {
  verbal: { score: 78, label: "لفظي", color: "bg-primary" },
  quantitative: { score: 65, label: "كمّي", color: "bg-secondary" },
  logical: { score: 72, label: "استدلال", color: "bg-warning" },
  overall: { score: 71, label: "المعدل العام", color: "bg-primary" },
};

const readinessScore = 68;
const readinessResult = readinessScore >= 80 ? "جاهز للترقية" : readinessScore >= 60 ? "يحتاج تطوير" : "معرض للاحتراق";

export default function Promotions() {
  const [activeTab, setActiveTab] = useState<"courses" | "exams" | "analysis">("courses");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">الترقيات والجاهزية</h2>
        <p className="text-muted-foreground text-sm">ربط الأداء بالحالة النفسية لتقييم الجاهزية للترقية</p>
      </div>

      {/* Two main blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Block 1: Qudurat */}
        <div className="bg-card rounded-xl border p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-card-foreground mb-2">قدرات</h3>
          <p className="text-sm text-muted-foreground mb-4">
            دورات تدريبية واختبارات محاكية مع تحليل مفصّل للأداء ونسبة الجاهزية
          </p>
          <ul className="space-y-2 mb-5">
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="w-4 h-4 text-primary" />
              دورات تدريبية متخصصة
            </li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <Play className="w-4 h-4 text-primary" />
              اختبارات محاكية (Mock Exams)
            </li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <BarChart3 className="w-4 h-4 text-primary" />
              تحليل مفصّل للأداء
            </li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="w-4 h-4 text-primary" />
              نسبة الجاهزية
            </li>
          </ul>
          <Button className="w-full gap-2" onClick={() => setActiveTab("courses")}>
            <ExternalLink className="w-4 h-4" />
            بدء التدريب
          </Button>
        </div>

        {/* Block 2: Masar */}
        <div className="bg-card rounded-xl border p-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-secondary" />
          </div>
          <h3 className="text-lg font-bold text-card-foreground mb-2">نظام مسار</h3>
          <p className="text-sm text-muted-foreground mb-4">
            متابعة مسار الترقيات والأداء الوظيفي. تكامل مع النظام الرسمي لتقييم جاهزيتك.
          </p>
          <ul className="space-y-2 mb-5">
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 text-secondary" />
              تقييم الأداء الوظيفي
            </li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 text-secondary" />
              متطلبات الترقية
            </li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 text-secondary" />
              تتبع التقدم
            </li>
          </ul>
          <Button variant="secondary" className="w-full gap-2">
            <ExternalLink className="w-4 h-4" />
            عرض التفاصيل
          </Button>
        </div>
      </div>

      {/* Tabs for Qudurat details */}
      <div className="bg-card rounded-xl border p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex gap-2 mb-6 border-b border-border pb-3">
          <Button variant={activeTab === "courses" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("courses")} className="gap-2">
            <BookOpen className="w-4 h-4" /> الدورات التدريبية
          </Button>
          <Button variant={activeTab === "exams" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("exams")} className="gap-2">
            <Play className="w-4 h-4" /> الاختبارات المحاكية
          </Button>
          <Button variant={activeTab === "analysis" ? "default" : "ghost"} size="sm" onClick={() => setActiveTab("analysis")} className="gap-2">
            <BarChart3 className="w-4 h-4" /> تحليل الأداء
          </Button>
        </div>

        {/* Courses Tab */}
        {activeTab === "courses" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-card-foreground">الدورات التدريبية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course) => (
                <div key={course.title} className="border rounded-lg p-4 bg-muted/30">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <course.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-card-foreground">{course.title}</h4>
                      <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                        <span>{course.lessons} درس</span>
                        <span>•</span>
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">التقدم</span>
                      <span className="font-medium text-foreground">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                  <Button size="sm" variant={course.progress === 100 ? "outline" : "default"} className="w-full mt-2">
                    {course.progress === 100 ? "مراجعة" : course.progress > 0 ? "متابعة" : "ابدأ الآن"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exams Tab */}
        {activeTab === "exams" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-card-foreground">الاختبارات المحاكية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockExams.map((exam) => (
                <div key={exam.title} className="border rounded-lg p-4 bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-sm text-card-foreground">{exam.title}</h4>
                    {exam.completed && (
                      <span className="flex items-center gap-1 text-xs text-success">
                        <CheckCircle2 className="w-3 h-3" /> مكتمل
                      </span>
                    )}
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{exam.questions} سؤال</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{exam.duration}</span>
                    <span>{exam.difficulty}</span>
                  </div>
                  {exam.completed && exam.score !== null && (
                    <div className="mb-3 p-2 rounded-lg bg-primary/5 text-center">
                      <span className="text-2xl font-bold text-primary">{exam.score}%</span>
                      <p className="text-xs text-muted-foreground">النتيجة</p>
                    </div>
                  )}
                  <Button size="sm" variant={exam.completed ? "outline" : "default"} className="w-full">
                    {exam.completed ? "إعادة الاختبار" : "ابدأ الاختبار"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analysis Tab */}
        {activeTab === "analysis" && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-card-foreground">تحليل مفصّل للأداء</h3>
            
            {/* Performance breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.values(performanceData).map((item) => (
                <div key={item.label} className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold text-foreground">{item.score}%</p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Detailed bars */}
            <div className="space-y-3">
              {Object.values(performanceData).filter(d => d.label !== "المعدل العام").map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium text-foreground">{item.score}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full ${item.color} transition-all`} style={{ width: `${item.score}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <h4 className="font-bold text-sm text-success mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> نقاط القوة</h4>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• الفهم القرائي والتحليل اللفظي</li>
                  <li>• الاستنتاج المنطقي</li>
                  <li>• إدارة الوقت في الاختبارات</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <h4 className="font-bold text-sm text-destructive mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> نقاط الضعف</h4>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• المسائل الكمية المتقدمة</li>
                  <li>• التناسب والنسب المئوية</li>
                  <li>• المقارنات العددية</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Readiness Score */}
      <div className="bg-card rounded-xl border p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <h3 className="text-lg font-bold text-card-foreground mb-4">نسبة الجاهزية للترقية</h3>
        
        {/* Big readiness gauge */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 mb-3">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
              <circle cx="50" cy="50" r="40" fill="none" stroke={readinessScore >= 80 ? "hsl(var(--success))" : readinessScore >= 60 ? "hsl(var(--warning))" : "hsl(var(--destructive))"} strokeWidth="10" strokeLinecap="round" strokeDasharray={`${readinessScore * 2.51} 251`} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-foreground">{readinessScore}%</span>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${readinessScore >= 80 ? "bg-success/10 text-success" : readinessScore >= 60 ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"}`}>
            {readinessScore >= 80 ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            {readinessResult}
          </div>
        </div>

        {/* Progress tracking */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">قدرات</span>
              <span className="font-medium text-foreground">{performanceData.overall.score}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="h-2 rounded-full bg-primary" style={{ width: `${performanceData.overall.score}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">الأداء الوظيفي</span>
              <span className="font-medium text-foreground">78%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="h-2 rounded-full bg-secondary" style={{ width: "78%" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">الحالة النفسية</span>
              <span className="font-medium text-foreground">52%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="h-2 rounded-full bg-warning" style={{ width: "52%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
