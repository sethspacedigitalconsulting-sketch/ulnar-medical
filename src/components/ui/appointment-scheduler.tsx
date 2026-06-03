"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Globe, Video, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface AvailableDate {
  date: number;
  hasSlots: boolean;
}

export interface AppointmentSchedulerProps {
  userName: string;
  userAvatar?: string;
  meetingTitle: string;
  meetingType: string;
  duration: string;
  timezone: string;
  availableDates: AvailableDate[];
  timeSlots: TimeSlot[];
  onDateSelect?: (date: number) => void;
  onTimeSelect?: (time: string) => void;
  onTimezoneChange?: (timezone: string) => void;
  brandName?: string;
}

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_NAMES = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

export function AppointmentScheduler({
  userName,
  userAvatar,
  meetingTitle,
  meetingType,
  duration,
  timezone,
  availableDates,
  timeSlots,
  onDateSelect,
  onTimeSelect,
  onTimezoneChange,
  brandName = "Space AI Automated Scheduling",
}: AppointmentSchedulerProps) {
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear]   = useState(now.getFullYear());
  const [selectedDate, setSelectedDate] = useState(15);
  const [selectedTime, setSelectedTime] = useState("10:30");
  const [timeFormat, setTimeFormat]     = useState<"12h" | "24h">("12h");

  const getDaysInMonth  = (m: number, y: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (m: number, y: number) => new Date(y, m, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  const handleNextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const handleDateClick = (date: number) => {
    if (availableDates.find(d => d.date === date && d.hasSlots)) {
      setSelectedDate(date);
      onDateSelect?.(date);
    }
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    onTimeSelect?.(time);
  };

  const formatTime = (time: string) => {
    if (timeFormat === "24h") return time;
    const [h, m] = time.split(":");
    const hour = parseInt(h);
    return `${hour % 12 || 12}:${m} ${hour >= 12 ? "PM" : "AM"}`;
  };

  const calendarDays: (number | null)[] = [];
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const selectedDateObj = new Date(currentYear, currentMonth, selectedDate);
  const selectedDayName = selectedDateObj.toLocaleDateString("en-US", { weekday: "short" });
  const selectedDateFmt = selectedDateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const IconBtn = ({
    onClick,
    children,
  }: {
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10"
    >
      {children}
    </button>
  );

  return (
    <div className="flex w-full max-w-4xl mx-auto flex-col">
      {/* ── Main card ── */}
      <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a1628]/90 shadow-2xl shadow-black/50 backdrop-blur-md lg:flex-row">

        {/* Left — meeting info */}
        <div className="w-full space-y-6 border-b border-white/10 bg-white/[0.01] p-6 lg:w-72 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-[#F4B9B9]">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-serif text-sm font-bold leading-tight text-white">{userName}</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#F4B9B9]">Ulnar Lead Specialist</span>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold leading-snug tracking-tight text-white">{meetingTitle}</h2>
            <div className="space-y-3 font-sans text-xs text-gray-300">
              <div className="flex items-center gap-2.5">
                <Video className="h-4 w-4 shrink-0 text-[#F4B9B9]" />
                <span>{meetingType}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-[#F4B9B9]" />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="h-4 w-4 shrink-0 text-[#F4B9B9]" />
                <button
                  onClick={() => onTimezoneChange?.(timezone)}
                  className="flex items-center gap-1 text-gray-300 transition-colors hover:text-[#FFD43A]"
                >
                  <span>{timezone} (EAT)</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Center — calendar */}
        <div className="flex-1 bg-transparent p-5 md:p-6">
          <div className="space-y-4">
            {/* Month header */}
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold tracking-wide text-white">
                {MONTH_NAMES[currentMonth]}{" "}
                <span className="font-sans font-normal text-gray-400">{currentYear}</span>
              </h3>
              <div className="flex gap-1">
                <IconBtn onClick={handlePrevMonth}><ChevronLeft className="h-4 w-4" /></IconBtn>
                <IconBtn onClick={handleNextMonth}><ChevronRight className="h-4 w-4" /></IconBtn>
              </div>
            </div>

            {/* Day labels */}
            <div className="grid grid-cols-7 gap-1.5">
              {DAY_NAMES.map(d => (
                <div key={d} className="py-1.5 text-center font-mono text-[10px] font-bold tracking-wider text-gray-400">
                  {d}
                </div>
              ))}

              {/* Date cells */}
              {calendarDays.map((day, idx) => {
                if (day === null) return <div key={`e-${idx}`} />;
                const isAvailable = !!availableDates.find(d => d.date === day && d.hasSlots);
                const isSelected  = day === selectedDate;
                const hasDot      = isAvailable && !isSelected;
                return (
                  <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    disabled={!isAvailable}
                    style={{ animationDelay: `${idx * 8}ms` }}
                    className={cn(
                      "relative h-11 rounded-xl font-mono text-xs font-medium outline-none transition-all duration-200",
                      "hover:scale-105 active:scale-95",
                      isSelected  && "scale-105 bg-[#FFD43A] font-bold text-[#122954] shadow-lg shadow-[#FFD43A]/20",
                      !isSelected && isAvailable  && "border border-white/5 bg-[#F4B9B9]/10 text-white hover:bg-[#F4B9B9]/20",
                      !isAvailable && "cursor-not-allowed opacity-25 text-gray-600",
                    )}
                  >
                    {day}
                    {hasDot && (
                      <span className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#FFD43A]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right — time slots */}
        <div className="flex w-full flex-col border-t border-white/10 bg-white/[0.01] p-6 lg:w-64 lg:border-t-0 lg:border-l">
          {/* Date + format toggle */}
          <div className="mb-5 flex items-center justify-between">
            <div className="font-sans text-sm">
              <span className="font-serif font-bold text-white">{selectedDayName}</span>
              <span className="text-gray-400">, {selectedDateFmt}</span>
            </div>
            <div className="flex gap-0.5 rounded-lg border border-white/5 bg-white/5 p-1 font-mono text-[10px]">
              {(["12h", "24h"] as const).map(fmt => (
                <button
                  key={fmt}
                  onClick={() => setTimeFormat(fmt)}
                  className={cn(
                    "rounded px-2 py-1 font-bold transition-all duration-200",
                    timeFormat === fmt ? "bg-[#122954] text-[#FFD43A] shadow-sm" : "text-gray-400 hover:text-white",
                  )}
                >
                  {fmt.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Slot list */}
          <div className="scrollbar-thin scrollbar-thumb-white/10 max-h-[380px] space-y-2 overflow-y-auto pr-1 lg:max-h-[440px]">
            {timeSlots.map((slot, idx) => {
              const isSelected = slot.time === selectedTime;
              return (
                <button
                  key={slot.time}
                  onClick={() => handleTimeClick(slot.time)}
                  disabled={!slot.available}
                  style={{ animationDelay: `${idx * 15}ms` }}
                  className={cn(
                    "w-full rounded-xl px-4 py-3 font-mono text-xs font-medium outline-none transition-all duration-200",
                    "hover:scale-[1.01] active:scale-[0.99]",
                    isSelected  && "scale-[1.01] bg-[#FFD43A] font-bold text-[#122954] shadow-lg shadow-[#FFD43A]/10",
                    !isSelected && slot.available  && "border border-white/5 bg-white/5 text-gray-200 hover:bg-white/10",
                    !slot.available && "cursor-not-allowed text-gray-700 opacity-20",
                  )}
                >
                  {formatTime(slot.time)}
                </button>
              );
            })}
          </div>

          <div className="mt-auto border-t border-white/10 pt-4">
            <p className="text-right font-mono text-[9px] font-bold uppercase tracking-wider text-gray-500">
              Powered by {brandName}
            </p>
          </div>
        </div>
      </div>

      {/* WhatsApp fallback — English only */}
      <div className="mt-4 text-center">
        <a
          href="https://wa.me/254724273996?text=Hello%20Ulnar%20Medical%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20diagnostic%20scan%20or%20consultation."
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 font-mono text-xs tracking-wide text-[#F4B9B9] transition-colors duration-300 hover:text-[#FFD43A]"
        >
          <MessageSquare className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
          <span>Can't find a quick slot? Chat with our specialist directly on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

export default AppointmentScheduler;