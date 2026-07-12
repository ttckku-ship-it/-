import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16 px-4">

          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              className="w-12 h-12 rounded-lg object-cover"
              alt="logo"
            />
            <span className="text-xl font-bold">حصين كلينك</span>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate("/login")}>
              <LogIn className="w-4 h-4 ml-2" />
              تسجيل الدخول
            </Button>

            <Button onClick={() => navigate("/login")}>
              <UserPlus className="w-4 h-4 ml-2" />
              إنشاء حساب
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      {/* Hero */}
<section
  className="flex items-center justify-center min-h-[70vh] px-4 text-center"
  style={{ background: "var(--gradient-hero)" }}
>
  <div className="max-w-3xl flex flex-col items-center">

    {/* BIG CENTER LOGO */}
    <img
      src="/logo.png"
      alt="logo"
      className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover mb-6 shadow-lg"
    />

    <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
      حصين كلينك
    </h1>

    <p className="text-lg md:text-xl text-primary-foreground/80 mb-6">
      منصة ذكية لإدارة الصحة النفسية والاحتراق الوظيفي
    </p>

    <p className="text-sm text-primary-foreground/70">
      نظام موحد يخدم الموظفين والطلاب في بيئة آمنة وسرية بالكامل
    </p>

  </div>
</section>
      {/* Info Sections */}
      <section className="container py-16 px-4 grid md:grid-cols-2 gap-6">

        {/* Employees */}
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-3">👨‍💼 الموظفين</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            يقدم النظام أدوات لتحليل الأداء الوظيفي، متابعة مستوى الاحتراق الوظيفي،
            تقديم الدعم النفسي، وخدمات التطوير المهني والترقيات.
          </p>
        </div>

        {/* Students */}
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-3">🎓 الطلاب</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            منصة دعم متكاملة للطلاب تشمل المشاكل الأكاديمية، الضغوط الدراسية،
            الإرشاد النفسي، وتوجيههم لمسارات تعليمية ومهنية أفضل.
          </p>
        </div>

      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-muted-foreground py-6 border-t">
        © جميع الحقوق محفوظة - حصين كلينك
      </footer>

    </div>
  );
}