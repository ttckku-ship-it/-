import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function StudentSupport() {
  const [step, setStep] = useState(1);

  return (
    <div className="container py-10 px-4 max-w-3xl">

      <h1 className="text-3xl font-bold mb-4">حصين الطلاب</h1>
      <p className="text-muted-foreground mb-6">
        منصة لدعم الطلاب نفسيًا وأكاديميًا بسرية تامة
      </p>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="bg-card p-6 rounded-xl border">
          <h2 className="font-bold mb-4">اختر نوع المشكلة</h2>

          <select className="w-full border rounded-lg p-2 mb-4">
            <option>ضغط دراسي</option>
            <option>قلق وتوتر</option>
            <option>صعوبة في مادة</option>
            <option>مشاكل مع دكتور</option>
          </select>

          <Button onClick={() => setStep(2)} className="w-full">
            التالي
          </Button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="bg-card p-6 rounded-xl border">
          <h2 className="font-bold mb-4">تقييم الحالة</h2>

          <p>هل تواجه صعوبة في التركيز؟</p>
          <select className="w-full border rounded-lg p-2 mb-4">
            <option>نعم</option>
            <option>أحيانًا</option>
            <option>لا</option>
          </select>

          <Button onClick={() => setStep(3)} className="w-full">
            عرض النتائج
          </Button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="bg-card p-6 rounded-xl border">
          <h2 className="font-bold mb-4">التوصيات</h2>

          <ul className="list-disc pr-5 text-sm mb-4">
            <li>تنظيم جدول مذاكرة يومي</li>
            <li>تقليل المشتتات أثناء الدراسة</li>
            <li>التواصل مع مرشد أكاديمي</li>
          </ul>

          <Button
            className="w-full"
            onClick={() => toast.success("تم إرسال طلبك بنجاح 🎓")}
          >
            إرسال الطلب
          </Button>
        </div>
      )}

    </div>
  );
}