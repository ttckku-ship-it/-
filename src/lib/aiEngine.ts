export interface AnalysisInput {
  burnout: number;
  risk: string;
  sessions: number;
  careerScore: number;
}

export interface AnalysisResult {
  level: "منخفض" | "متوسط" | "مرتفع";
  score: number;
  summary: string;
  reasons: string[];
  recommendation: string;
}

export function analyzeCase(data: AnalysisInput): AnalysisResult {
  let score = 0;
  const reasons: string[] = [];

  // الاحتراق الوظيفي (60 نقطة)
  score += (data.burnout / 100) * 60;
if (data.burnout >= 70) {
  reasons.push("ارتفاع مؤشر الاحتراق الوظيفي.");
} else if (data.burnout >= 40) {
  reasons.push("يوجد مستوى متوسط من الاحتراق الوظيفي.");
}
  // مستوى الخطر (20 نقطة)
if (data.risk === "مرتفع") {
  score += 20;
  reasons.push("تم تصنيف مستوى الخطر بأنه مرتفع.");
} else if (data.risk === "متوسط") {
  score += 10;
  reasons.push("تم تصنيف مستوى الخطر بأنه متوسط.");
}
  // جلسات الدعم (10 نقاط)
if (data.sessions === 0) {
  score += 10;
  reasons.push("لا توجد أي جلسات دعم نفسي مسجلة.");
} else if (data.sessions <= 2) {
  score += 5;
  reasons.push("عدد جلسات الدعم النفسي قليل.");
} else {
  reasons.push("تم حضور عدد جيد من جلسات الدعم.");
}
  // الجاهزية المهنية (10 نقاط)
if (data.careerScore < 40) {
  score += 10;
  reasons.push("الجاهزية المهنية منخفضة.");
} else if (data.careerScore < 70) {
  score += 5;
  reasons.push("الجاهزية المهنية متوسطة.");
} else {
  reasons.push("الجاهزية المهنية جيدة.");
}

  if (score >= 70) {
    return {
      level: "مرتفع",
      score: Math.round(score),
      summary: "تشير المؤشرات إلى أن الحالة الحالية تحتاج إلى تدخل سريع.",
      reasons,
      recommendation:
        "يوصي النظام بحجز جلسة دعم نفسي بشكل عاجل وتأجيل أي قرارات مهنية حتى تتحسن المؤشرات."
    };
  }

  if (score >= 40) {
    return {
      level: "متوسط",
      score: Math.round(score),
      summary: "تشير البيانات إلى وجود ضغط وظيفي متوسط يحتاج إلى متابعة.",
      reasons,
      recommendation:
        "يوصي النظام بالاستمرار في جلسات الدعم ومتابعة التقييم خلال الأسبوعين القادمين."
    };
  }

  return {
    level: "منخفض",
    score: Math.round(score),
    summary: "تشير البيانات إلى استقرار الحالة الحالية.",
    reasons,
    recommendation:
      "الاستمرار في المتابعة الدورية والمحافظة على التوازن بين العمل والراحة."
  };
}