"use client";

import VerifiedIcon from "@mui/icons-material/Verified";
export default function WeekStat() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const getCurrentWeekRange = () => {
    const today = new Date();
    const firstDay = new Date(today);
    const lastDay = new Date(today);

    // Adjusting to start from Monday (ISO week starts on Monday)
    const dayOfWeek = today.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    firstDay.setDate(today.getDate() + diffToMonday); // Set to Monday
    firstDay.setHours(0, 0, 0, 0); // Set to start of the day

    lastDay.setDate(firstDay.getDate() + 6); // Set to Sunday
    lastDay.setHours(23, 59, 59, 999); // Set to end of the day

    return {
      startOfWeek: firstDay.toISOString(),
      endOfWeek: lastDay.toISOString(),
    };
  };

  // Usage
  console.log(getCurrentWeekRange());

  return (
    <div className=" foot-box max-w-screen-md w-full mx-auto p-4 overflow-hidden">
      <div className="grid grid-cols-8 gap-2 text-center text-gray-900">
        <div></div>
        {days.map((day, index) => (
          <div key={index} className="font-semibold text-sm">
            {day}
          </div>
        ))}
      </div>

      {prayers.map((prayer) => (
        <div key={prayer} className="grid grid-cols-8 gap-1 text-center ">
          <div className="flex items-center font-semibold text-sm text-gray-800 flex">
            {prayer}
          </div>
          {days.map((_, index) => (
            <div key={index} className=" rounded-lg p-1">
              <VerifiedIcon
                sx={{ fontSize: "16px", color: "rgb(163, 163, 163)" }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
