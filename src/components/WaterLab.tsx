import React, { useState } from 'react';
import { Thermometer, CloudRain, Sun, Info, Compass } from 'lucide-react';

export default function WaterLab() {
  const [temp, setTemp] = useState(25); // Current Celsius Temp (-20 to 120)
  const [cycleStep, setCycleStep] = useState<string>('evap');

  // Determine state of water based on temperature (Textbook page 35-36)
  let waterState = 'liquid';
  let stateTitleAr = 'سَائِلَة (مَاءٌ)';
  let transitionInfo = 'الماء في حالة توازن سائل. تتباعد الجزيئات وتتدفق بحرية.';
  let stateColor = 'text-blue-600 bg-blue-50 border-blue-200';

  if (temp <= 0) {
    waterState = 'solid';
    stateTitleAr = 'صُلْبَة (ثَلْجٌ)';
    transitionInfo = 'تجمد تام! الجزيئات متراصة في شبكة بلورية صلبة تهتز في مكانها وعلمياً يسمى (التجميد).';
    stateColor = 'text-cyan-700 bg-cyan-50 border-cyan-200';
  } else if (temp >= 100) {
    waterState = 'gas';
    stateTitleAr = 'غَازِيّة (بُخَارُ مَاءٍ)';
    transitionInfo = 'على غليان مائة! تبخر شديد، الجزيئات مندفعة بسرعة هائلة وطاقة حركية فائقة وعلمياً يسمى (التبخر).';
    stateColor = 'text-rose-700 bg-rose-50 border-rose-200';
  }

  // Particle positions depending on states
  const renderParticles = () => {
    let particleCount = 20;
    let className = 'transition-all duration-700 ';
    
    // Generate positions
    return Array.from({ length: particleCount }).map((_, i) => {
      let x = 0;
      let y = 0;
      let anim = '';

      if (waterState === 'solid') {
        // Hexagonal / structured pack
        const row = Math.floor(i / 5);
        const col = i % 5;
        x = 50 + col * 30 + (row % 2) * 15;
        y = 30 + row * 25;
        anim = 'animate-pulse';
      } else if (waterState === 'liquid') {
        // Flat liquid at bottom of glass container
        x = 40 + (i * 12) % 160;
        y = 110 + (i % 4) * 8 + Math.sin(i) * 3;
        anim = 'animate-bounce';
      } else {
        // High speed air movement
        x = 30 + (i * 22) % 180;
        y = 15 + (i * 13) % 130;
        anim = 'animate-ping';
      }

      return (
        <div 
          key={i}
          style={{ 
            left: `${x}px`, 
            top: `${y}px`,
            animationDuration: waterState === 'gas' ? '0.2s' : '2s'
          }}
          className={`absolute w-3.5 h-3.5 rounded-full bg-sky-400 border border-sky-600/30 shadow-inner ${anim} ${className}`}
        />
      );
    });
  };

  return (
    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
      <div className="flex flex-col xl:flex-row gap-6">
        
        {/* State of Water Simulation Container */}
        <div className="w-full xl:w-1/2 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 justify-end">
            <span>مختبر جزيئات الماء التفاعلي (صفحة 35)</span>
            <Thermometer className="w-4 h-4 text-emerald-600" />
          </h3>

          <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-6 items-center">
            
            {/* Thermometer and Molecule screen */}
            <div className="w-full md:w-1/2 flex flex-col items-center">
              
              {/* Glass water jar simulator */}
              <div className="w-56 h-48 border-4 border-slate-300 rounded-b-3xl bg-slate-100/30 relative overflow-hidden flex items-end justify-center shadow-lg">
                <div className="absolute inset-0 bg-slate-50/10" />
                
                {/* Physical liquid surface visual */}
                {waterState === 'liquid' && (
                  <div className="w-full h-1/3 bg-blue-300/40 border-t-2 border-blue-400 animate-pulse" />
                )}
                {waterState === 'solid' && (
                  <div className="w-full h-1/2 bg-cyan-200/50 border-t-2 border-cyan-300 rounded-t-lg" />
                )}

                {/* Particle Nodes */}
                {renderParticles()}
              </div>

              {/* Dynamic current temperature badge */}
              <div className="mt-4 flex flex-col items-center">
                <span className="text-xs text-slate-500 font-bold block">مقياس الحرارة المئوي:</span>
                <span className="text-3xl font-extrabold text-slate-800 font-mono">{temp}°م</span>
              </div>
            </div>

            {/* Slider and Text description */}
            <div className="w-full md:w-1/2 space-y-4 text-right">
              <div className={`p-3 rounded-xl border font-bold text-center ${stateColor}`}>
                {stateTitleAr}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed min-h-16">
                {transitionInfo}
              </p>

              {/* Slider Control */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-slate-700 font-bold block">تحكم في الحرارة (تجميد 🔴 تسخين)</span>
                <input 
                  type="range"
                  min="-20"
                  max="120"
                  value={temp}
                  onChange={(e) => setTemp(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>120°م</span>
                  <span>الصفر المئوي</span>
                  <span>-20°م</span>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="grid grid-cols-3 gap-1">
                <button onClick={() => setTemp(-10)} className="bg-cyan-100 hover:bg-cyan-200 text-cyan-800 p-1.5 text-[11px] font-bold rounded">ثلج (-10°م)</button>
                <button onClick={() => setTemp(37)} className="bg-blue-100 hover:bg-blue-200 text-blue-800 p-1.5 text-[11px] font-bold rounded">ماء طبيعي (37°م)</button>
                <button onClick={() => setTemp(105)} className="bg-rose-100 hover:bg-rose-200 text-rose-800 p-1.5 text-[11px] font-bold rounded">بخار (105°م)</button>
              </div>
            </div>

          </div>
        </div>

        {/* Water Cycle Interactive map (Page 36) */}
        <div className="w-full xl:w-1/2 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 justify-end">
            <span>دورة المياه المستمرة في الطبيعة (صفحة 36)</span>
            <Compass className="w-4 h-4 text-emerald-600" />
          </h3>

          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
            
            {/* Visual Steps selector */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <button 
                onClick={() => setCycleStep('evap')}
                className={`p-2 rounded-lg font-bold border ${cycleStep === 'evap' ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-slate-50 text-slate-700'}`}
              >
                1. التبخّر ☀️
              </button>
              <button 
                onClick={() => setCycleStep('cond')}
                className={`p-2 rounded-lg font-bold border ${cycleStep === 'cond' ? 'bg-sky-100 border-sky-300 text-sky-800' : 'bg-slate-50 text-slate-700'}`}
              >
                2. التكثّف ☁
              </button>
              <button 
                onClick={() => setCycleStep('rain')}
                className={`p-2 rounded-lg font-bold border ${cycleStep === 'rain' ? 'bg-indigo-100 border-indigo-300 text-indigo-800' : 'bg-slate-50 text-slate-700'}`}
              >
                3. هطول المطر ⛈
              </button>
              <button 
                onClick={() => setCycleStep('flow')}
                className={`p-2 rounded-lg font-bold border ${cycleStep === 'flow' ? 'bg-teal-100 border-teal-300 text-teal-800' : 'bg-slate-50 text-slate-700'}`}
              >
                4. الجريان 🌊
              </button>
            </div>

            {/* Simulated environment explaining the step */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col md:flex-row items-center gap-4 text-right">
              
              {/* Dynamic cycle graphic placeholder */}
              <div className="w-full md:w-1/3 h-24 bg-gradient-to-b from-sky-200 to-indigo-100 rounded-lg flex items-center justify-center border border-sky-300/35 overflow-hidden relative">
                {cycleStep === 'evap' && (
                  <Sun className="w-12 h-12 text-amber-500 animate-spin" />
                )}
                {cycleStep === 'cond' && (
                  <div className="w-12 h-12 bg-white rounded-full p-2 text-slate-400 text-center flex items-center justify-center animate-pulse">☁</div>
                )}
                {cycleStep === 'rain' && (
                  <CloudRain className="w-12 h-12 text-indigo-600" />
                )}
                {cycleStep === 'flow' && (
                  <div className="absolute inset-x-0 bottom-0 h-6 bg-blue-400 animate-pulse border-t border-blue-500 text-[10px] text-white font-bold text-center">النيل والأنهار</div>
                )}
              </div>

              {/* Explaining text */}
              <div className="w-full md:w-2/3 space-y-1">
                {cycleStep === 'evap' && (
                  <>
                    <h4 className="text-xs font-bold text-amber-800">التبخّر بأشعة الشمس الساطعة:</h4>
                    <p className="text-[11px] text-slate-600 leading-normal">
                      تتبخر مياه الأنهار (زي نهر النيل العظيم) والمسطحات المائية بسبب حرارة الشمس، وتصعد جزيئات بخار الماء الخفيفة تدرجياً نحو طبقات الغلاف الجوي العليا.
                    </p>
                  </>
                )}
                {cycleStep === 'cond' && (
                  <>
                    <h4 className="text-xs font-bold text-sky-800">التكثّف في طبقات الجو الباردة:</h4>
                    <p className="text-[11px] text-slate-600 leading-normal">
                      عندما يصطدم البخار الصاعد بطبقات الهواء البارد المرتفعة، تنخفض سرعة جزيئاته وتتجمع (تتكثف) لتعود من الحالة الغازية إلى سائل مكونة السحب والغيوم المتراكمة.
                    </p>
                  </>
                )}
                {cycleStep === 'rain' && (
                  <>
                    <h4 className="text-xs font-bold text-indigo-800">هطول المطر والبركات:</h4>
                    <p className="text-[11px] text-slate-600 leading-normal">
                      عندما تصبح السحب ثقيلة جداً ومحمَّلة بقطرات دسمة، تسقط تحت تأثير الجاذبية الأرضية كأمطار غزيرة تروي التربة وتملأ آبار السودان ومروّيات المزارعين.
                    </p>
                  </>
                )}
                {cycleStep === 'flow' && (
                  <>
                    <h4 className="text-xs font-bold text-teal-800">الجريان والمياه السطحية والجوفية:</h4>
                    <p className="text-[11px] text-slate-600 leading-normal">
                      تنساب المياه الساقطة على قمم الجبال والأهالي نحو الترع والأودية وتصب في روافد الأنهار كالنيل الأزرق والنيل الأبيض لدورة دائمة مستمرة متكررة طيلة الوقت.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Note about water safety */}
            <div className="bg-red-50 p-3 rounded-xl border border-red-100 text-xs text-red-900 space-y-1 text-right">
              <span className="font-bold flex items-center justify-end gap-1 text-red-800">
                <span>تنبيه صحي وتثقيفي هام (منهج بخت الرضا):</span>
                <span className="w-2 h-2 rounded-full bg-red-600 inline-block animate-ping" />
              </span>
              <p className="text-[11px] leading-relaxed">
                يؤكد الكتاب المدرسي على ضرورة <b>غلي مياه الشرب وتطهيرها</b>، وأن رمي جثث الحيوانات والصرف الصحي بمصادر الترع يلوثها ويلوث البيئة مما يسبب كوليرا وإسهالات فتاكة.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
