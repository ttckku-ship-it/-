import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

export default function CareerAdvisor() {
  const [advisorType, setAdvisorType] = useState("");
  const [date, setDate] = useState("");
  const [step, setStep] = useState(1);
  const { caseId } = useAuth();
  const [answers, setAnswers] = useState({
  q1: "",
  q2: "",
  q3: "",
  q4: "",
  q5: "",
  q6: "",
});

async function confirmBooking() {
  if (!advisorType || !date) {
  toast.error("يرجى اختيار نوع المستشار والتاريخ");
  return;
}
  const { data: userCase } = await supabase
    .from("cases")
    .select("id")
    .eq("case_id", caseId)
    .single();

  if (!userCase) {
    toast.error("تعذر العثور على المستخدم");
    return;
  }

  const { error } = await supabase
    .from("career_bookings")
   .insert({
  case_id: userCase.id,
  advisor_type: advisorType,
  appointment_date: date,
  result: result,
  score: score,
});

  if (error) {
    toast.error("حدث خطأ أثناء الحجز");
    return;
  }

  toast.success("تم تأكيد الحجز بنجاح ✅");
}

function calculateScore() {
  let score = 0;

  Object.values(answers).forEach((answer) => {
    if (answer === "yes") score += 2;
    else if (answer === "maybe") score += 1;
  });

  return score;
}

const score = calculateScore();

let result = "";
let skills: string[] = [];
let courses: string[] = [];

if (score >= 10) {
  result = "جاهز للتطوير";
  skills = [
    "القيادة",
    "إدارة الفرق",
    "التخطيط الاستراتيجي",
  ];
  courses = [
    "القيادة الإدارية",
    "إدارة المشاريع",
  ];
} else if (score >= 6) {
  result = "يحتاج تطوير";
  skills = [
    "إدارة الوقت",
    "التواصل",
    "حل المشكلات",
  ];
  courses = [
    "مهارات التواصل",
    "إدارة الوقت",
  ];
} else {
  result = "يحتاج دعم مهني";
  skills = [
    "بناء الثقة المهنية",
    "التطوير الذاتي",
    "التخطيط الوظيفي",
  ];
  courses = [
    "أساسيات التطوير المهني",
    "بناء المسار الوظيفي",
  ];
}

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

      {step === 2 && (
  <div className="bg-card p-6 rounded-xl border mb-6">
    <h2 className="font-bold mb-4">التقييم المهني</h2>

    {[
      "هل لديك خطة تطوير مهنية؟",
      "هل ترغب بالترقية؟",
      "هل تشعر أن مهاراتك الحالية كافية؟",
      "هل حضرت دورة تدريبية خلال آخر سنة؟",
      "هل تستطيع إدارة ضغط العمل؟",
      "هل ترغب بتغيير مسارك الوظيفي؟",
    ].map((question, index) => (
      <div key={index} className="mb-4">
        <p className="mb-2">{question}</p>

        <select
          className="w-full border rounded-lg p-2"
          value={answers[`q${index + 1}` as keyof typeof answers]}
          onChange={(e) =>
            setAnswers({
              ...answers,
              [`q${index + 1}`]: e.target.value,
            })
          }
        >
          <option value="">اختر</option>
          <option value="yes">نعم</option>
          <option value="maybe">إلى حد ما</option>
          <option value="no">لا</option>
        </select>
      </div>
    ))}

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
<p className="mb-2">
  🔹 حالتك المهنية:
  <span className="font-bold text-primary"> {result}</span>
</p>

<p className="mb-2">
  🔹 الدرجة:
  <span className="font-bold text-primary"> {score} / 12</span>
</p>          </p>

          <p className="mb-2">🔹 المهارات المقترحة:</p>
<ul className="list-disc pr-5 mb-4 text-sm">
  {skills.map((skill) => (
    <li key={skill}>{skill}</li>
  ))}
</ul>

          <p className="mb-2">🎓 دورات مقترحة (بالتعاون مع كلية الأعمال):</p>
<ul className="list-disc pr-5 text-sm">
  {courses.map((course) => (
    <li key={course}>{course}</li>
  ))}
</ul>

         <Button
  className="w-full mt-6"
  onClick={confirmBooking}
>
  تأكيد الحجز
</Button>
        </div>
      )}

    </div>
  );
}