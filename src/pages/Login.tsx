import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

export default function Login() {
  const [role, setRole] = useState<"employee" | "student">("employee");
  const [caseId, setCaseId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!caseId.trim()) {
      setError("يرجى إدخال معرّف الحالة");
      return;
    }

    if (caseId.trim().length < 4) {
      setError("معرّف الحالة يجب أن يكون 4 أحرف على الأقل");
      return;
    }

    setLoading(true);

    // Simulate verification
    setTimeout(() => {
      login(caseId.trim(), role);

      if (role === "student") {
        navigate("/student-dashboard");
      } else {
        navigate("/dashboard");
      }
    }, 800);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="bg-card rounded-2xl p-8 w-full max-w-md shadow-2xl animate-fade-in">
        
        {/* Logo + Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <img
              src="/logo.png"
              alt="logo"
              className="w-12 h-12 rounded-lg object-cover"
            />
          </div>

          <h1 className="text-2xl font-bold text-card-foreground">
            تسجيل الدخول
          </h1>

          <p className="text-sm text-muted-foreground mt-2">
            اختر نوع المستخدم ثم أدخل معرّف الحالة
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Role Selection */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setRole("employee")}
              className={`flex-1 p-2 rounded-lg border text-sm transition ${
                role === "employee"
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              👨‍💼 موظف
            </button>

            <button
              type="button"
              onClick={() => setRole("student")}
              className={`flex-1 p-2 rounded-lg border text-sm transition ${
                role === "student"
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              🎓 طالب
            </button>
          </div>

          {/* Case ID */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              معرّف الحالة (Case ID)
            </label>

            <Input
              type="text"
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              placeholder="أدخل معرّف الحالة"
              className="text-center text-lg tracking-widest"
              dir="ltr"
            />

            {error && (
              <p className="text-destructive text-sm mt-2">{error}</p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={loading}
          >
            {loading ? "جاري التحقق..." : "دخول"}
          </Button>
        </form>

        {/* Security Note */}
        <div className="mt-6 p-4 bg-muted rounded-xl">
          <p className="text-xs text-muted-foreground text-center">
            🔒 جميع البيانات مشفّرة. لا يتم حفظ أي معلومات شخصية.
          </p>
        </div>

        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-6 mx-auto transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          العودة للرئيسية
        </button>
      </div>
    </div>
  );
}