import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck, ClipboardList, BarChart3, Building2, ArrowLeftRight, Calendar,
  CheckCircle2, AlertTriangle, User, Star, Clock, MapPin, Phone,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const recoverySteps = [
  { label: "اختبار سري", icon: ClipboardList, status: "completed" },
  { label: "تحليل النتائج", icon: BarChart3, status: "completed" },
  { label: "التحويل للعيادة", icon: Building2, status: "current" },
  { label: "برنامج التعافي", icon: ShieldCheck, status: "upcoming" },
  { label: "العودة للعمل", icon: ArrowLeftRight, status: "upcoming" },
];

const rehabClinics = [
  {
    name: "مركز الأمل لإعادة التأهيل",
    location: "الرياض - حي الملقا",
    phone: "011-XXX-XXXX",
    specialties: ["إعادة تأهيل نفسي", "علاج إدمان", "دعم سلوكي"],
    doctors: [
      { name: "د. عبدالرحمن الغامدي", specialty: "طب إدمان", rating: 4.9, available: ["السبت 09:00", "الاثنين 11:00", "الأربعاء 14:00"] },
      { name: "د. لمياء الزهراني", specialty: "إعادة تأهيل نفسي", rating: 4.8, available: ["الأحد 10:00", "الثلاثاء 13:00"] },
    ],
  },
  {
    name: "عيادات التعافي التخصصية",
    location: "جدة - حي الروضة",
    phone: "012-XXX-XXXX",
    specialties: ["برامج تعافي مكثفة", "علاج جماعي", "متابعة ما بعد التعافي"],
    doctors: [
      { name: "د. سلطان المطيري", specialty: "علاج سلوكي", rating: 4.7, available: ["السبت 08:00", "الاثنين 15:00"] },
      { name: "د. عائشة الحارثي", specialty: "إرشاد نفسي", rating: 4.9, available: ["الأحد 09:00", "الثلاثاء 11:00", "الخميس 10:00"] },
      { name: "د. ياسر القرني", specialty: "طب نفسي", rating: 4.6, available: ["الاثنين 10:00", "الأربعاء 09:00"] },
    ],
  },
  {
    name: "مركز حياة للتأهيل الشامل",
    location: "الدمام - حي الشاطئ",
    phone: "013-XXX-XXXX",
    specialties: ["تأهيل شامل", "دعم أسري", "إعادة الإدماج المهني"],
    doctors: [
      { name: "د. منال السالم", specialty: "تأهيل مهني", rating: 4.8, available: ["السبت 10:00", "الثلاثاء 14:00", "الخميس 11:00"] },
      { name: "د. طارق العمري", specialty: "طب إدمان", rating: 4.7, available: ["الأحد 13:00", "الأربعاء 10:00"] },
    ],
  },
];

export default function Recovery() {
  const [selectedClinic, setSelectedClinic] = useState<typeof rehabClinics[0] | null>(null);
  const [bookingDoctor, setBookingDoctor] = useState<{ doctor: typeof rehabClinics[0]["doctors"][0]; clinic: string; time: string } | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBook = (doctor: typeof rehabClinics[0]["doctors"][0], clinicName: string, time: string) => {
    setBookingDoctor({ doctor, clinic: clinicName, time });
    setBookingConfirmed(false);
  };

  const confirmBooking = () => {
    setBookingConfirmed(true);
    setTimeout(() => { setBookingDoctor(null); setBookingConfirmed(false); }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">التعافي وإعادة التأهيل</h2>
        <p className="text-muted-foreground text-sm">برامج سرية للتعافي مع حماية تامة للخصوصية</p>
      </div>

      {/* User flow */}
      <div className="bg-card rounded-xl border p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <h3 className="text-lg font-bold text-card-foreground mb-6">مسار التعافي</h3>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          {recoverySteps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-3 flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${step.status === "completed" ? "bg-success/10 text-success" : step.status === "current" ? "bg-warning/10 text-warning" : "bg-muted text-muted-foreground"}`}>
                {step.status === "completed" ? <CheckCircle2 className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${step.status === "current" ? "text-warning" : "text-foreground"}`}>{step.label}</p>
              </div>
              {i < recoverySteps.length - 1 && <div className="hidden md:block w-8 h-px bg-border" />}
            </div>
          ))}
        </div>
      </div>

      {/* Assessment */}
      <div className="bg-card rounded-xl border p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-card-foreground mb-1">الاختبار السري</h3>
            <p className="text-sm text-muted-foreground mb-4">اختبار سري وآمن للكشف المبكر. جميع البيانات مشفّرة ولا يمكن الوصول إليها من أي جهة.</p>
            <Button className="gap-2"><ClipboardList className="w-4 h-4" />بدء الاختبار</Button>
          </div>
        </div>
      </div>

      {/* Rehab Clinics */}
      <div className="bg-card rounded-xl border p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <h3 className="text-lg font-bold text-card-foreground mb-4">عيادات إعادة التأهيل</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rehabClinics.map((clinic) => (
            <div key={clinic.name} className="border rounded-lg p-4 bg-muted/30">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-bold text-sm text-card-foreground mb-1">{clinic.name}</h4>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                <MapPin className="w-3 h-3" /> {clinic.location}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                <Phone className="w-3 h-3" /> {clinic.phone}
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {clinic.specialties.map((s) => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">{s}</span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mb-2">{clinic.doctors.length} أطباء متاحين</p>
              <Button variant="outline" size="sm" className="w-full gap-1" onClick={() => setSelectedClinic(clinic)}>
                <Calendar className="w-3 h-3" /> عرض الأطباء وحجز موعد
              </Button>
            </div>
          ))}
        </div>
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
                    <Button key={time} variant="outline" size="sm" className="text-xs gap-1" onClick={() => handleBook(doctor, selectedClinic!.name, time)}>
                      <Clock className="w-3 h-3" />{time}
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

      {/* Extended Leave */}
      <div className="bg-card rounded-xl border p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mb-3">
          <Calendar className="w-5 h-5 text-secondary" />
        </div>
        <h4 className="font-bold text-card-foreground mb-1">الإجازات المطولة</h4>
        <p className="text-sm text-muted-foreground mb-4">ربط مع نظام الإجازات المطولة لضمان الستر والحماية</p>
        <Button variant="outline" size="sm">تقديم طلب</Button>
      </div>

      {/* Patient dashboard */}
      <div className="bg-card rounded-xl border p-6" style={{ boxShadow: "var(--shadow-card)" }}>
        <h3 className="text-lg font-bold text-card-foreground mb-4">لوحة متابعة الحالة</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <p className="text-2xl font-bold text-foreground">3</p>
            <p className="text-xs text-muted-foreground">جلسات مكتملة</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <p className="text-2xl font-bold text-foreground">12</p>
            <p className="text-xs text-muted-foreground">يوم في البرنامج</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <p className="text-2xl font-bold text-success">72%</p>
            <p className="text-xs text-muted-foreground">نسبة التقدم</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <p className="text-2xl font-bold text-warning">2</p>
            <p className="text-xs text-muted-foreground">جلسات متبقية</p>
          </div>
        </div>
      </div>
    </div>
  );
}
