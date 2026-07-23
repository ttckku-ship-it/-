import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [role, setRole] = useState<"employee" | "student">("employee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("cases")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    setLoading(false);

    if (error || !data) {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      return;
    }

    // يبقى المشروع يعتمد على case_id
    login(data.case_id, role);

    if (role === "student") {
      navigate("/student-dashboard");
    } else {
      navigate("/dashboard");
    }
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
            اختر نوع المستخدم ثم أدخل البريد الإلكتروني وكلمة المرور
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* البريد الإلكتروني */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              البريد الإلكتروني
            </label>

            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
            />
          </div>

          {/* كلمة المرور */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              كلمة المرور
            </label>

            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>

          {error && (
            <p className="text-destructive text-sm">{error}</p>
          )}

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

        {/* العودة */}
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