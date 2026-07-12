import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function StudentAdvisor() {
  const [booked, setBooked] = useState(false);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">استشارات أكاديمية 🎓</h1>

      <div className="bg-card p-6 rounded-xl border space-y-4">
        <p className="text-muted-foreground">
          احجز موعد مع مرشد أكاديمي أو مستشار جامعي.
        </p>

        <Button
          onClick={() => {
            setBooked(true);
            toast.success("تم تأكيد حجزك 🎓");
          }}
        >
          حجز موعد
        </Button>

        {booked && (
          <p className="text-green-600 font-medium">
            ✔ تم حجز موعدك بنجاح
          </p>
        )}
      </div>
    </div>
  );
}