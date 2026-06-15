import React, { useState } from 'react';
import { FastForward, Play, RefreshCw, Layers, Info } from 'lucide-react';

interface SurfaceConfig {
  name: string;
  friction: number; // multiplier for stopping distance & deceleration
  frictionLabel: string;
}

const SURFACES: SurfaceConfig[] = [
  { name: 'لوحة زجاجية ملساء', friction: 0.15, frictionLabel: 'احتكاك منخفض جداً (أملس مصقول)' },
  { name: 'لوحة مائدة خشبية', friction: 0.45, frictionLabel: 'احتكاك متوسط (خشونة طفيفة)' },
  { name: 'سجادة صوفية خشنة', friction: 0.95, frictionLabel: 'احتكاك مرتفع جداً (يعيق الحركة فوراً)' }
];

export default function MotionLab() {
  const [booksCount, setBooksCount] = useState<number>(3); // Height: 1 to 5 books
  const [surfaceIdx, setSurfaceIdx] = useState<number>(0);
  const [rolling, setRolling] = useState(false);
  const [timer, setTimer] = useState(0); // in seconds
  const [stopDistance, setStopDistance] = useState(0); // in cm
  const [hasRolled, setHasRolled] = useState(false);

  const selectedSurface = SURFACES[surfaceIdx];

  const handleRollExperiment = () => {
    setRolling(true);
    setTimer(0);
    setStopDistance(0);
    setHasRolled(true);

    // Calculate simulated parameters based on physics (from textbook rules):
    // Higher numbers of books = higher slope angle = higher gravity acceleration = faster speed & longer distance.
    // Higher friction = shorter stop distance & faster termination.
    const initialVelocity = booksCount * 30; // arbitrary multiplier
    const frictionFactor = selectedSurface.friction;

    const targetDistance = Math.round((initialVelocity / (frictionFactor + 0.1)) * 0.4);
    const finalTime = parseFloat(((booksCount * 0.5) + (3 / (frictionFactor + 0.5))).toFixed(2));

    // Animate stopwatch
    let currentMs = 0;
    const interval = setInterval(() => {
      currentMs += 10;
      setTimer(parseFloat((currentMs / 1000).toFixed(2)));

      if (currentMs >= finalTime * 1000) {
        clearInterval(interval);
        setRolling(false);
        setStopDistance(targetDistance);
        setTimer(finalTime);
      }
    }, 10);
  };

  return (
    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Dynamic Physics Canvas */}
        <div className="w-full lg:w-3/5 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center justify-end gap-1.5">
            <span>مقياس حركة البلية وتأثير الاحتكاك (صفحة 41)</span>
            <Layers className="w-4 h-4 text-emerald-600" />
          </h3>

          <div className="bg-white p-5 rounded-xl border border-slate-200 relative overflow-hidden flex flex-col justify-between h-[300px]">
            {/* Visual experimental arena */}
            <div className="relative w-full flex-1 flex items-end justify-start">
              
              {/* Table top */}
              <div className="absolute inset-x-0 bottom-0 h-4 bg-slate-300 border-t border-slate-400" />

              {/* Books Stack represent slope height */}
              <div className="absolute bottom-4 right-4 flex flex-col items-end">
                {Array.from({ length: booksCount }).map((_, i) => (
                  <div 
                    key={i} 
                    style={{ backgroundColor: `hsl(${200 + i * 20}, 70%, 45%)` }}
                    className="w-32 h-6 border border-white/50 shadow flex items-center justify-center rounded text-[10px] text-white font-bold"
                  >
                    الكتاب المدرسي #{i + 1}
                  </div>
                ))}
              </div>

              {/* Cardboard tube slope (الأنبوب المائل) */}
              <div 
                style={{ 
                  height: '4px',
                  width: '140px',
                  bottom: '24px',
                  right: '90px',
                  transform: `rotate(${10 + booksCount * 7}deg)`,
                  transformOrigin: 'bottom right'
                }}
                className="absolute bg-orange-700/80 border-t border-orange-600 rounded-lg origin-bottom-right"
              />

              {/* Animated glass ball (البلية الزجاجية) */}
              <div 
                style={{
                  transition: rolling ? `all ${timer}s cubic-bezier(0.25, 1, 0.5, 1)` : 'none',
                  left: rolling ? `${Math.min(90 + (timer * 110), 400)}px` : '310px',
                  bottom: rolling ? '4px' : `${12 + (booksCount * 6)}px`,
                  opacity: hasRolled ? 1 : 0.6
                }}
                className={`absolute w-6 h-6 rounded-full bg-radial from-sky-200 to-sky-700/80 border-2 border-slate-100 shadow-inner flex items-center justify-center ${rolling ? 'animate-spin' : ''}`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </div>

              {/* Friction surface graphic indicator */}
              <div className="absolute bottom-4 left-0 right-32 h-2.5 bg-gradient-to-r from-red-200 to-transparent opacity-60" />
            </div>

            {/* Stopwatch and feedback statistics */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-3 gap-2 text-center text-xs font-bold text-slate-700">
              <div className="border-r border-slate-200">
                <span className="text-[10px] text-slate-400 block font-semibold">المؤقت الرقمي:</span>
                <span className="text-xl font-extrabold text-blue-600 font-mono">{timer} ثانية</span>
              </div>
              <div className="border-r border-slate-200">
                <span className="text-[10px] text-slate-400 block font-semibold">مسافة الدحرجة:</span>
                <span className="text-xl font-extrabold text-orange-600 font-mono">{rolling ? 'قيد الحساب...' : `${stopDistance} سم`}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">تأثير السطح:</span>
                <span className="text-xs font-bold text-teal-700 block mt-1">{selectedSurface.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Inputs stack and Textbook rule context */}
        <div className="w-full lg:w-2/5 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Input 1: Height of heap */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-right">
              <label className="text-xs font-bold text-slate-700 flex justify-end gap-1 items-center">
                <span>عدد الكتب لزيادة ارتفاع المنحدر (الجاذبية):</span>
              </label>
              <div className="flex justify-between gap-15">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setBooksCount(num)}
                    disabled={rolling}
                    className={`flex-1 py-1 px-2.5 rounded font-mono text-xs font-bold border transition ${
                      booksCount === num 
                        ? 'bg-emerald-600 text-white border-emerald-700' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    }`}
                  >
                    {num} كُتب
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400">كتب أكثر = سطح مائل أكثر تسارعاً بفعل الجاذبية الأرضية.</p>
            </div>

            {/* Input 2: Surface select */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-right">
              <label className="text-xs font-bold text-slate-700 block">اختر نوع قماش الطاولة للتحكم بالاحتكاك:</label>
              <div className="space-y-1">
                {SURFACES.map((surf, idx) => (
                  <button
                    key={surf.name}
                    onClick={() => setSurfaceIdx(idx)}
                    disabled={rolling}
                    className={`w-full text-right p-2.5 rounded-lg text-xs font-bold border flex justify-between items-center transition ${
                      surfaceIdx === idx 
                        ? 'bg-blue-50 text-blue-800 border-blue-300' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-705 border-slate-200'
                    }`}
                  >
                    <span className="text-[10px] text-slate-400 font-normal">{surf.frictionLabel}</span>
                    <span>{surf.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Run Button */}
            <button
              onClick={handleRollExperiment}
              disabled={rolling}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              {rolling ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  البلية تتدحرج، ترقب وقت الارتطام...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  دحرِج البلية الزجاجية الآن ◀
                </>
              )}
            </button>
          </div>

          <div className="mt-4 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 space-y-2 text-emerald-900 text-right">
            <h4 className="text-xs font-bold flex items-center justify-end gap-1">
              <span>قانون الميكانيكا المنهجي (صفحة 42):</span>
              <Info className="w-4 h-4 text-emerald-700" />
            </h4>
            <ul className="text-[11px] text-emerald-800 leading-normal space-y-1.5 list-none">
              <li>
                • <b>الخلاصة 1 (الاحتكاك):</b> قوة الاحتكاك هي قوة <b>تقاوم أو تعيق</b> حركة البلية بملامسة السطح، وتؤدي لإبطائها أو توقفها.
              </li>
              <li>
                • <b>الخلاصة 2 (الجاذبية):</b> قوة الجاذبية الأرضية هي التي تسحب البلية بانتظام من الأعلى لتدعها تنسلخ أسفل المنحدر.
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
