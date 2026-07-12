export default function StudentInsights() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">تحليلات الأداء 📊</h1>

      <div className="bg-card p-6 rounded-xl border">
        <p className="text-muted-foreground">
          تحليل أدائك الدراسي والنفسي بناءً على تفاعلك داخل النظام.
        </p>

        <ul className="list-disc pr-5 mt-4 text-sm">
          <li>معدل التوتر: منخفض</li>
          <li>الأداء الأكاديمي: جيد</li>
          <li>التوصية: استمر على نفس الجدول</li>
        </ul>
      </div>
    </div>
  );
}