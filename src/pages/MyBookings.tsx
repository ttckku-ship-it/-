import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
export default function MyBookings() {
  const { caseId } = useAuth();

  const [bookings, setBookings] = useState<any[]>([]);
const [careerBookings, setCareerBookings] = useState<any[]>([]);
  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    const { data: userCase } = await supabase
      .from("cases")
      .select("id")
      .eq("case_id", caseId)
      .single();

    if (!userCase) return;

    const { data } = await supabase
      .from("bookings")
      .select("*")
      .eq("case_id", userCase.id)
      .order("created_at", { ascending: false });

    setBookings(data || []);
    loadCareerBookings(userCase.id);
  }
async function cancelBooking(id: number) {
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id);

  if (!error) {
    loadBookings();
  }
}
async function loadCareerBookings(caseDbId: number) {
  const { data } = await supabase
    .from("career_bookings")
    .select("*")
    .eq("case_id", caseDbId)
    .order("created_at", { ascending: false });

  setCareerBookings(data || []);
}

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
          حجوزات الدعم النفسي
      </h2>

      {bookings.map((booking) => (
       <div
  key={booking.id}
  className="bg-card rounded-xl border p-5 mb-5 shadow-sm"
>
  <h3 className="text-lg font-bold">
    🩺 {booking.clinic_name}
  </h3>

  <p className="mt-2">
    👨‍⚕️ {booking.doctor_name}
  </p>

  <p>
    💼 {booking.specialty}
  </p>

  <p>
    📅 {booking.appointment_time}
  </p>

  <Button
    variant="destructive"
    className="mt-4"
    onClick={() => cancelBooking(booking.id)}
  >
    إلغاء الحجز
  </Button>
</div>
      ))}
<div className="border-t my-8"></div>

<h2 className="text-2xl font-bold mb-6">
  حجوزات المستشار المهني
</h2>


{careerBookings.map((booking: any) => (
  <div
    key={booking.id}
    className="bg-card rounded-xl border p-5 mb-5 shadow-sm"
  >
    <h3 className="text-lg font-bold">
      👔 {
        booking.advisor_type === "hr"
          ? "مستشار موارد بشرية"
          : "مستشار مالي"
      }
    </h3>

    <p className="mt-2">
      📅 {booking.appointment_date}
    </p>

    <p>
      📊 النتيجة: {booking.result}
    </p>

    <p>
      ⭐ الدرجة: {booking.score} / 12
    </p>

    <Button
      variant="destructive"
      className="mt-4"
      onClick={async () => {
        await supabase
          .from("career_bookings")
          .delete()
          .eq("id", booking.id);

        loadBookings();
      }}
    >
      إلغاء الحجز
    </Button>
  </div>
))}
    </div>
  );
}