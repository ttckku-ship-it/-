import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HeartHandshake, Phone, MessageCircle, Calendar, Building2, ExternalLink, User, Clock, Star, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
const clinics = [
  {
    name: "عيادة سند",
    desc: "دعم نفسي متخصص للموظفين",
    color: "bg-primary/10 text-primary",
    doctors: [
      { name: "د. خالد المنصور", specialty: "طب نفسي", rating: 4.8, available: ["السبت 10:00", "الأحد 14:00", "الثلاثاء 11:00"] },
      { name: "د. نورة العتيبي", specialty: "استشارات أسرية", rating: 4.9, available: ["الأحد 09:00", "الاثنين 16:00", "الأربعاء 10:00"] },
      { name: "د. فهد الشمري", specialty: "علاج سلوكي معرفي", rating: 4.7, available: ["السبت 13:00", "الثلاثاء 15:00"] },
    ],
  },
  {
    name: "عيادة توازن",
    desc: "برامج التوازن بين العمل والحياة",
    color: "bg-secondary/10 text-secondary",
    doctors: [
      { name: "د. سارة القحطاني", specialty: "صحة نفسية مهنية", rating: 4.9, available: ["السبت 08:00", "الاثنين 10:00", "الأربعاء 14:00"] },
      { name: "د. عبدالله الدوسري", specialty: "إدارة الضغوط", rating: 4.6, available: ["الأحد 11:00", "الثلاثاء 09:00"] },
    ],
  },
  {
    name: "عيادة تعافي",
    desc: "إعادة التأهيل النفسي والأسري",
    color: "bg-accent text-accent-foreground",
    doctors: [
      { name: "د. ريم الحربي", specialty: "إعادة تأهيل نفسي", rating: 4.8, available: ["السبت 14:00", "الاثنين 09:00", "الخميس 11:00"] },
      { name: "د. محمد العنزي", specialty: "علاج إدمان", rating: 4.7, available: ["الأحد 10:00", "الأربعاء 13:00"] },
      { name: "د. هند السبيعي", specialty: "دعم أسري", rating: 4.9, available: ["السبت 11:00", "الثلاثاء 16:00", "الخميس 09:00"] },
    ],
  },
];

const programs = [
  "إدارة الضغط النفسي",
  "التوازن بين العمل والحياة",
  "الدعم الأسري",
  "التعامل مع الاحتراق الوظيفي",
];

export default function Support() {
  const [selectedClinic, setSelectedClinic] = useState<typeof clinics[0] | null>(null);
  const [bookingDoctor, setBookingDoctor] = useState<{ doctor: typeof clinics[0]["doctors"][0]; clinic: string; time: string } | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
const navigate = useNavigate();
const { caseId } = useAuth();
  const handleBook = (doctor: typeof clinics[0]["doctors"][0], clinicName: string, time: string) => {
    setBookingDoctor({ doctor, clinic: clinicName, time });
    setBookingConfirmed(false);
  };

const confirmBooking = async () => {
  if (!bookingDoctor) return;

  const { data: userCase } = await supabase
    .from("cases")
    .select("id")
    .eq("case_id", caseId)
    .single();

  if (!userCase) return;

  const { error } = await supabase
    .from("bookings")
    .insert({
      case_id: userCase.id,
      clinic_name: bookingDoctor.clinic,
      doctor_name: bookingDoctor.doctor.name,
      specialty: bookingDoctor.doctor.specialty,
      appointment_time: bookingDoctor.time,
    });

  if (error) {
    alert("حدث خطأ أثناء الحجز");
    return;
  }

  setBookingConfirmed(true);

  setTimeout(() => {
    setBookingDoctor(null);
    setBookingConfirmed(false);
  }, 2000);
};

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">الدعم النفسي والأسري</h2>
        <p className="text-muted-foreground text-sm">دعم نفسي آمن وسري من متخصصين معتمدين</p>
      </div>

      {/* Clinics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {clinics.map((clinic) => (
          <div key={clinic.name} className="bg-card rounded-xl border p-5" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className={`w-10 h-10 rounded-lg ${clinic.color} flex items-center justify-center mb-3`}>
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-card-foreground">{clinic.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{clinic.desc}</p>
            <p className="text-xs text-muted-foreground mb-4">{clinic.doctors.length} أطباء متاحين</p>
            <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => setSelectedClinic(clinic)}>
              <Calendar className="w-3 h-3" />
              عرض الأطباء وحجز موعد
            </Button>
          </div>
        ))}
      </div>

      {/* Doctors Dialog */}
      <Dialog open={!!selectedClinic} onOpenChange={() => setSelectedClinic(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-right">أطباء {selectedClinic?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedClinic?.doctors.map((doctor) => (
              <div key={doctor.name} className="border rounded-lg p-4 bg-muted/30">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-card-foreground">{doctor.name}</h4>
                    <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3 h-3 text-warning fill-warning" />
                      <span className="text-xs text-muted-foreground">{doctor.rating}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs font-medium text-muted-foreground mb-2">المواعيد المتاحة:</p>
                <div className="flex flex-wrap gap-2">
                  {doctor.available.map((time) => (
                    <Button key={time} variant="outline" size="sm" className="text-xs gap-1" onClick={() => handleBook(doctor, selectedClinic.name, time)}>
                      <Clock className="w-3 h-3" />
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking Confirmation Dialog */}
      <Dialog open={!!bookingDoctor} onOpenChange={() => setBookingDoctor(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-right">{bookingConfirmed ? "تم الحجز بنجاح ✓" : "تأكيد الحجز"}</DialogTitle>
          </DialogHeader>
          {bookingDoctor && !bookingConfirmed && (
            <div className="space-y-3 text-sm">
              <div className="p-3 rounded-lg bg-muted/50 space-y-2">
                <p><span className="text-muted-foreground">العيادة:</span> <span className="font-medium text-foreground">{bookingDoctor.clinic}</span></p>
                <p><span className="text-muted-foreground">الطبيب:</span> <span className="font-medium text-foreground">{bookingDoctor.doctor.name}</span></p>
                <p><span className="text-muted-foreground">التخصص:</span> <span className="font-medium text-foreground">{bookingDoctor.doctor.specialty}</span></p>
                <p><span className="text-muted-foreground">الموعد:</span> <span className="font-medium text-foreground">{bookingDoctor.time}</span></p>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" onClick={confirmBooking}>تأكيد الحجز</Button>
                <Button variant="outline" onClick={() => setBookingDoctor(null)}>إلغاء</Button>
              </div>
            </div>
          )}
          {bookingConfirmed && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-8 h-8 text-success" />
              </div>
              <p className="text-sm text-muted-foreground">تم تأكيد حجزك بنجاح. ستصلك رسالة تأكيد.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Programs */}
      <div className="bg-card rounded-xl border p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <h3 className="text-lg font-bold text-card-foreground mb-4">برامجنا تقدم لك</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {programs.map((prog) => (
            <div key={prog} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <HeartHandshake className="w-4 h-4 text-secondary shrink-0" />
              <span className="text-sm text-foreground">{prog}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Burnout assessment */}
      <div className="bg-card rounded-xl border p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <h3 className="text-lg font-bold text-card-foreground mb-2">استبيان الحالة النفسية</h3>
        <p className="text-sm text-muted-foreground mb-4">تقييم سريع وسري لمستوى الاحتراق الوظيفي والضغط النفسي</p>
        <Button
  variant="hero"
  className="gap-2"
  onClick={() => navigate("/assessment")}
>
  بدء الاستبيان
</Button>
      </div>
    </div>
  );
}
