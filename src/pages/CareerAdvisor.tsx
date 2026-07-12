import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function CareerAdvisor() {
  const [advisorType, setAdvisorType] = useState("");
  const [date, setDate] = useState("");
  const [step, setStep] = useState(1);

  return (
    <div className="container py-10 px-4 max-w-4xl">

      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">المستشار المهني</h1>
      <p className="text-muted-foreground mb-8">
        احجز جلسة مع مستشار متخصص واحصل على تحليل لمسارك المهني وتوصيات مخصصة
      </p>

      {/* STEP 1: Booking */}
      {step === 1 && (
        <div className="bg-card p-6 rounded-xl border mb-6">
          <h2 className="font-bold mb-4">حجز موعد</h2>

          <div className="mb-4">
            <label className="block mb-2">نوع المستشار</label>
            <select
              className="w-full border rounded-lg p-2"
              onChange={(e) => setAdvisorType(e.target.value)}
            >
              <option value="">اختر</option>
              <option value="hr">مستشار موارد بشرية</option>
              <option value="financial">مستشار مالي</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">التاريخ</label>
            <input
              type="date"
              className="w-full border rounded-lg p-2"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <Button onClick={() => setStep(2)} className="w-full">
            التالي
          </Button>
        </div>
      )}

      {/* STEP 2: Assessment */}
      {step === 2 && (
        <div className="bg-card p-6 rounded-xl border mb-6">
          <h2 className="font-bold mb-4">التقييم المهني</h2>

          <p className="mb-2">هل تشعر بالحاجة لتطوير مهاراتك؟</p>
          <select className="w-full border rounded-lg p-2 mb-4">
            <option>نعم</option>
            <option>إلى حد ما</option>
            <option>لا</option>
          </select>

          <p className="mb-2">هل تسعى للترقية قريباً؟</p>
          <select className="w-full border rounded-lg p-2 mb-4">
            <option>نعم</option>
            <option>لا</option>
          </select>

          <Button onClick={() => setStep(3)} className="w-full">
            عرض النتائج
          </Button>
        </div>
      )}

      {/* STEP 3: Results */}
      {step === 3 && (
        <div className="bg-card p-6 rounded-xl border">
          <h2 className="font-bold mb-4">نتيجة التحليل</h2>

          <p className="mb-2">
            🔹 حالتك المهنية: <span className="font-bold text-primary">تحتاج تطوير</span>
          </p>

          <p className="mb-2">🔹 المهارات المقترحة:</p>
          <ul className="list-disc pr-5 mb-4 text-sm">
            <li>إدارة الوقت</li>
            <li>مهارات التواصل</li>
            <li>تحليل البيانات</li>
          </ul>

          <p className="mb-2">🎓 دورات مقترحة (بالتعاون مع كلية الأعمال):</p>
          <ul className="list-disc pr-5 text-sm">
            <li>أساسيات الموارد البشرية</li>
            <li>التحليل المالي للمبتدئين</li>
          </ul>

          <Button
  className="w-full mt-6"
  onClick={() => {
    toast.success("تم تأكيد حجزك بنجاح ✅");
  }}
>
  تأكيد الحجز
</Button>
        </div>
      )}

    </div>
  );
}