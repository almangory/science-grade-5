import React, { useState } from 'react';
import { Wind, Play, Info } from 'lucide-react';

export default function BreathingLab() {
  const [diaphragmY, setDiaphragmY] = useState(50); // 0 (pushed up) to 100 (pulled down)
  const [isPlaying, setIsPlaying] = useState(false);

  // Derive parameters from diaphragm state
  // High value (pulled down) = inhalation (large lungs, open chest, diaphragm contracted)
  // Low value (pushed up) = exhalation (compressed lungs, closed chest, diaphragm relaxed)
  const lungScale = 0.7 + (diaphragmY / 100) * 0.45; 
  const lungColor = diaphragmY > 50 ? 'rgb(239, 68, 68)' : 'rgb(251, 113, 133)';
  const chestWidth = 200 + (diaphragmY / 100) * 60;
  const stateLabel = diaphragmY > 55 ? 'شَهِيق (دخول الأكسجين)' : diaphragmY < 45 ? 'زَفِير (خروج ثاني أكسيد الكربون)' : 'حالة استقرار';

  const triggerAutoBreathing = () => {
    setIsPlaying(true);
    let step = 0;
    const interval = setInterval(() => {
      // Create a nice sine wave for breathing
      const t = step / 10;
      const y = Math.round(50 + Math.sin(t) * 45);
      setDiaphragmY(y);
      step++;
      if (step > 40) {
        clearInterval(interval);
        setIsPlaying(false);
      }
    }, 120);
  };

  return (
    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Model canvas */}
        <div className="w-full md:w-1/2 flex flex-col items-center bg-white p-6 rounded-xl border border-slate-100 shadow-sm relative h-96 justify-between">
          <span className="absolute top-3 left-3 bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded font-mono">
            نظام محاكاة مجسم بخت الرضا
          </span>

          {/* Nose, trachea and Lung system visual */}
          <div className="flex-1 flex flex-col items-center justify-center relative w-full">
            {/* Nose/Trachea */}
            <div className="w-4 h-12 bg-orange-200 rounded-t-lg z-10" />
            
            {/* Bronchi split */}
            <div className="w-16 h-3 bg-orange-200 -mt-1 relative flex justify-between px-1">
              <div className="w-1.5 h-6 bg-orange-200 transform -rotate-45 origin-top-left" />
              <div className="w-1.5 h-6 bg-orange-200 transform rotate-45 origin-top-right" />
            </div>

            {/* Lungs Container with Chest Wall */}
            <div 
              style={{ width: `${chestWidth}px` }} 
              className="h-44 border-2 border-dashed border-slate-300 rounded-3xl mx-auto flex items-center justify-between p-4 bg-slate-50/50 mt-4 transition-all duration-300 relative overflow-hidden"
            >
              {/* Left Lung */}
              <div 
                style={{ 
                  transform: `scale(${lungScale})`,
                  backgroundColor: lungColor
                }}
                className="w-16 h-28 rounded-b-full rounded-tl-full shadow-md transition-all duration-300 origin-top flex items-center justify-center"
              >
                <span className="text-[10px] text-white font-bold">الرئة اليمنى</span>
              </div>

              {/* Gas Flow indicator particles */}
              {diaphragmY > 60 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <Wind className="w-6 h-6 text-blue-500 animate-bounce" />
                  <span className="text-[10px] text-blue-500 font-bold">أكسجين O₂</span>
                </div>
              )}
              {diaphragmY < 40 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <Wind className="w-6 h-6 text-red-400 rotate-180 animate-pulse" />
                  <span className="text-[10px] text-red-500 font-bold">ثاني أكسيد الكربون CO₂</span>
                </div>
              )}

              {/* Right Lung */}
              <div 
                style={{ 
                  transform: `scale(${lungScale})`,
                  backgroundColor: lungColor
                }}
                className="w-16 h-28 rounded-b-full rounded-tr-full shadow-md transition-all duration-300 origin-top flex items-center justify-center"
              >
                <span className="text-[10px] text-white font-bold">الرئة اليسرى</span>
              </div>
            </div>

            {/* Diaphragm Line (الحجاب الحاجز) */}
            <div className="w-56 h-8 relative mt-2">
              <div 
                style={{ 
                  borderRadius: diaphragmY > 50 ? '100% 100% 0px 0px' : '30% 30% 0px 0px',
                  backgroundColor: diaphragmY > 50 ? '#10b981' : '#059669',
                  transform: `translateY(${-10 + (diaphragmY / 100) * 15}px)`
                }}
                className="w-full h-4 transition-all duration-300 shadow flex items-center justify-center"
              >
                <span className="text-[9px] text-white font-bold uppercase tracking-wider">عضلة الحجاب الحاجز</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${
              diaphragmY > 55 ? 'bg-blue-100 text-blue-800' : diaphragmY < 45 ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'
            }`}>
              {stateLabel}
            </span>
          </div>
        </div>

        {/* Controls & Scientific summary */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Wind className="w-5 h-5 text-emerald-600" />
              جرب تجربة الحجاب الحاجز والبالون
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              هذه المحاكاة تمثل تجربة القارورة البلاستيكية والبالون المذكورة في <b>الصفحة 8</b> من كتاب المدرسة. 
              عند شد البالون لأسفل (الحجاب الحاجز)، يقل الضغط وينفخ الهواء الرئتين تدريجياً.
            </p>

            {/* Slider control */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>انبساط (زفير)</span>
                <span className="text-emerald-700">اسحب الحجاب الحاجز التفاعلي</span>
                <span>انقباض (شهيق)</span>
              </div>
              <input 
                type="range"
                min="0"
                max="100"
                value={diaphragmY}
                onChange={(e) => setDiaphragmY(Number(e.target.value))}
                disabled={isPlaying}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 focus:outline-none"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>الحجاب الحاجز يرتفع للأعلى</span>
                <span>قيمة السحب: {diaphragmY}%</span>
                <span>الحجاب الحاجز يتمدد لأسفل</span>
              </div>
            </div>

            {/* Scientific details */}
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 space-y-2">
              <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1">
                <Info className="w-4 h-4 text-emerald-700" />
                تفسير بخت الرضا العلمي:
              </h4>
              <ul className="text-xs text-emerald-800 space-y-1 list-disc pl-4">
                <li>
                  <b>الشهيق:</b> ينقبض الحجاب الحاجز ويهبط لأسفل فيتسع تجويف القفص الصدري، مما يسبب دخول هواء الأكسجين المفيد.
                </li>
                <li>
                  <b>الزفير:</b> ينبسط الحجاب الحاجز فيرتفع لأعلى، فيضيق تجويف الصدر، مما يدفع هواء الزفير المحمل بثاني أكسيد الكربون السام للخارج.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={triggerAutoBreathing}
              disabled={isPlaying}
              className="flex-1 bg-emerald-600 text-white py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm hover:bg-emerald-700 disabled:bg-slate-300 transition-colors"
            >
              <Play className="w-4 h-4" />
              سلسلة تنفس تلقائية (شهيق / زفير)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
