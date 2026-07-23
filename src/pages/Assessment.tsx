import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assessmentQuestions } from "@/data/assessmentQuestions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

const options = [
  { label: "أبداً", value: 0 },
  { label: "نادراً", value: 1 },
  { label: "أحياناً", value: 2 },
  { label: "غالباً", value: 3 },
  { label: "دائماً", value: 4 },
];

export default function Assessment() {
  const navigate = useNavigate();
const { caseId } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    Array(assessmentQuestions.length).fill(-1)
  );

  const question = assessmentQuestions[currentQuestion];

  const progress =
    ((currentQuestion + 1) / assessmentQuestions.length) * 100;

  const selectAnswer = (value: number) => {
    const updated = [...answers];
    updated[currentQuestion] = value;
    setAnswers(updated);
  };

  const nextQuestion = () => {
    if (answers[currentQuestion] === -1) {
      alert("الرجاء اختيار إجابة أولاً");
      return;
    }

    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

const finishAssessment = async () => {
  if (answers.includes(-1)) {
    alert("الرجاء الإجابة على جميع الأسئلة");
    return;
  }

  const score = answers.reduce((a, b) => a + b, 0);

  const burnoutScore = Math.round(
    (score / (assessmentQuestions.length * 4)) * 100
  );

  let riskLevel = "";
  let status = "";

  if (burnoutScore < 30) {
    riskLevel = "Low";
    status = "طبيعي";
  } else if (burnoutScore < 60) {
    riskLevel = "Medium";
    status = "ضغط";
  } else {
    riskLevel = "High";
    status = "احتراق";
  }

  // البحث عن المستخدم
  const { data: user } = await supabase
    .from("cases")
    .select("id")
    .eq("case_id", caseId)
    .single();

  if (!user) {
    alert("لم يتم العثور على المستخدم");
    return;
  }

  // حفظ التقييم
  await supabase.from("assessments").insert({
    case_id: user.id,
    burnout_score: burnoutScore,
    risk_level: riskLevel,
    status: status,
  });

  // تحديث آخر نتيجة
  await supabase
    .from("cases")
    .update({
      burnout_score: burnoutScore,
      risk_level: riskLevel,
      status: status,
    })
    .eq("id", user.id);

  navigate("/dashboard");
};

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          استبيان الاحتراق الوظيفي
        </h1>

        <p className="text-muted-foreground mt-2">
          أجب على جميع الأسئلة بدقة للحصول على تقييم أولي.
        </p>
      </div>

      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
        <div
          className="bg-primary h-3 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-sm text-muted-foreground">
        السؤال {currentQuestion + 1} من {assessmentQuestions.length}
      </p>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">
          {question.question}
        </h2>

                <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option.label}
              onClick={() => selectAnswer(option.value)}
              className={`w-full border rounded-xl p-4 text-right transition-all ${
                answers[currentQuestion] === option.value
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </Card>

      <div className="flex justify-between">

        <Button
          variant="outline"
          onClick={previousQuestion}
          disabled={currentQuestion === 0}
        >
          السابق
        </Button>

        {currentQuestion === assessmentQuestions.length - 1 ? (
          <Button
            onClick={finishAssessment}
          >
            إنهاء التقييم
          </Button>
        ) : (
          <Button
            onClick={nextQuestion}
          >
            التالي
          </Button>
        )}

      </div>

      <Card className="p-4 bg-muted/30">
        <h3 className="font-semibold mb-2">
          مقياس الإجابة
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
          <div>0 = أبداً</div>
          <div>1 = نادراً</div>
          <div>2 = أحياناً</div>
          <div>3 = غالباً</div>
          <div>4 = دائماً</div>
        </div>
      </Card>
          </div>
  );
}