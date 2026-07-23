import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register() {
    if (!fullName || !email || !password) {
      toast.error("يرجى تعبئة جميع البيانات");
      return;
    }

    // التحقق من عدم وجود البريد مسبقاً
    const { data: existingUser } = await supabase
      .from("cases")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingUser) {
      toast.error("البريد الإلكتروني مستخدم مسبقًا");
      return;
    }

    // إنشاء معرف حالة فريد
    const newCaseId = `CASE-${Date.now()}`;

    const { error } = await supabase.from("cases").insert({
      case_id: newCaseId,
      full_name: fullName,
      email,
      password,
    });

    if (error) {
      toast.error("فشل إنشاء الحساب");
      return;
    }

    toast.success("تم إنشاء الحساب بنجاح");

    // الانتقال إلى صفحة تسجيل الدخول
    navigate("/login");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="bg-card rounded-2xl p-8 w-full max-w-md shadow-2xl animate-fade-in">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <img
              src="/logo.png"
              alt="logo"
              className="w-12 h-12 rounded-lg object-cover"
            />
          </div>

          <h1 className="text-2xl font-bold text-card-foreground">
            إنشاء حساب
          </h1>

          <p className="text-sm text-muted-foreground mt-2">
            أنشئ حسابًا جديدًا للوصول إلى خدمات حصين كلينك
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              الاسم الكامل
            </label>

            <Input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="أدخل الاسم الكامل"
            />
          </div>

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

          <Button
            className="w-full"
            size="lg"
            onClick={register}
          >
            إنشاء الحساب
          </Button>

        </div>

        {/* Security Note */}
        <div className="mt-6 p-4 bg-muted rounded-xl">
          <p className="text-xs text-muted-foreground text-center">
            🔒 يتم استخدام بياناتك فقط لتسجيل الدخول وإدارة حسابك.
          </p>
        </div>

        {/* Back */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-6 mx-auto transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          لديك حساب بالفعل؟ تسجيل الدخول
        </button>

      </div>
    </div>
  );
}