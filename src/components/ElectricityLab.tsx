import React, { useState } from 'react';
import { Sparkles, Power, ShieldAlert, CheckCircle, Info } from 'lucide-react';

export default function ElectricityLab() {
  const [activeTab, setActiveTab] = useState<'circuit' | 'lightning'>('circuit');
  const [switchClosed, setSwitchClosed] = useState<boolean>(false);
  const [strike, setStrike] = useState<boolean>(false);

  const handleLightningStrike = () => {
    setStrike(true);
    setTimeout(() => {
      setStrike(false);
    }, 450);
  };

  return (
    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
      
      {/* Tab select headers */}
      <div className="flex border-b border-slate-200 mb-5 text-xs font-bold gap-3">
        <button
          onClick={() => setActiveTab('circuit')}
          className={`pb-2.5 px-3 border-b-2 transition-all ${
            activeTab === 'circuit' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500'
          }`}
        >
          💡 1. الدوائر الكهربية (صفحة 54)
        </button>
        <button
          onClick={() => setActiveTab('lightning')}
          className={`pb-2.5 px-3 border-b-2 transition-all ${
            activeTab === 'lightning' ? 'border-amber-600 text-amber-700' : 'border-transparent text-slate-500'
          }`}
        >
          ⛈️ 2. البرق والصواعق (صفحة 51)
        </button>
      </div>

      {/* TAB 1: Circuit Builder */}
      {activeTab === 'circuit' && (
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Visual Board */}
          <div className="w-full lg:w-3/5 bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between h-[300px] relative">
            <span className="absolute top-2 left-2 text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold font-mono">
              مولد التيار البسيط
            </span>

            {/* Interactive schematic layout */}
            <div className="relative w-full flex-1 flex items-center justify-center">
              
              {/* Circuit wires loops */}
              <svg className="absolute w-64 h-44 pointer-events-none" viewBox="0 0 200 120">
                {/* Rectangular wire pathway */}
                <rect 
                  x="20" y="20" width="160" height="80" 
                  fill="none" 
                  stroke={switchClosed ? '#fbbf24' : '#94a3b8'} 
                  strokeWidth="4" 
                  strokeDasharray={switchClosed ? '6,6' : '0'}
                  className={switchClosed ? 'animate-[dash_2s_linear_infinite]' : ''}
                />
              </svg>

              {/* Component: Battery (البطارية - مصدر الطاقة) */}
              <div className="absolute right-1 w-14 h-20 bg-slate-800 rounded-lg flex flex-col items-center justify-between p-1.5 shadow border border-slate-700">
                <span className="text-[9px] font-bold text-slate-300">البطارية</span>
                <div className="w-8 h-8 rounded-full bg-red-600 border border-red-500 flex items-center justify-center text-white font-extrabold text-xs">
                  (+)
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-600 border border-slate-500 flex items-center justify-center text-white font-extrabold text-xs">
                  (-)
                </div>
                <span className="text-[8px] text-slate-400 font-bold">مصدر الطاقة</span>
              </div>

              {/* Component: Switch (المفتاح الكهربائي) */}
              <button
                onClick={() => setSwitchClosed(!switchClosed)}
                className={`absolute bottom-1 w-20 h-10 rounded-lg border-2 flex items-center justify-center gap-1.5 font-bold transition-all ${
                  switchClosed 
                    ? 'bg-emerald-150 border-emerald-400 text-emerald-800' 
                    : 'bg-red-50 border-red-300 text-red-800'
                }`}
              >
                <Power className="w-4 h-4 shrink-0 animate-pulse" />
                <span className="text-[10px]">{switchClosed ? 'مغلق (يمر تيار)' : 'مفتوح (مقطوع)'}</span>
              </button>

              {/* Component: Light Bulb (المصباح - المقاومة) */}
              <div className="absolute left-1 flex flex-col items-center">
                <div className="w-14 h-14 relative flex items-center justify-center">
                  {/* Bulb Glass */}
                  <div className={`w-12 h-12 rounded-full border-2 transition-all ${
                    switchClosed 
                      ? 'bg-amber-300 border-amber-400 shadow-[0_0_20px_#f59e0b] scale-105' 
                      : 'bg-slate-200 border-slate-300'
                  }`} />
                  
                  {/* Filament */}
                  <div className={`absolute w-3 h-4 border-t-2 border-x-2 rounded-t transition-all ${
                    switchClosed ? 'border-orange-500 bg-orange-400' : 'border-slate-400'
                  }`} style={{ top: '16px' }} />

                  {/* Brass socket base */}
                  <div className="absolute bottom-0 w-6 h-3 bg-slate-400 rounded-b-sm border-t border-slate-500" />
                </div>
                <span className="text-[9px] font-bold text-slate-500 mt-1 block">المصباح (المقاومة)</span>
              </div>

            </div>

            <div className="text-center">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                switchClosed ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
              }`}>
                {switchClosed ? '💡 المصباح يضيء: الدائرة مغلقة ويسري فيها التيار' : '🔌 المصباح منطفيء: الدائرة مفتوحة والتيار الكهربائي منقطع'}
              </span>
            </div>

          </div>

          {/* Textbook Guidance */}
          <div className="w-full lg:w-2/5 flex flex-col justify-between space-y-4">
            <div className="bg-emerald-50/55 p-4 rounded-xl border border-emerald-100 space-y-3 text-right text-emerald-950">
              <h4 className="text-xs font-bold flex items-center justify-end gap-1">
                <span>عناصر الدائرة البسيطة (صفحة 53):</span>
                <Info className="w-4 h-4 text-emerald-700" />
              </h4>
              <ul className="text-[11px] leading-relaxed space-y-2">
                <li>
                  1. <b>مصدر الطاقة:</b> (مثل حجر البطارية) يوفر الطاقة اللازمة لتحريك الشحنات في التوصيلات.
                </li>
                <li>
                  2. <b>المقاومة:</b> الجهاز المستهلك والمحول للطاقة (مثل المصباح الكهربائي للإنارة).
                </li>
                <li>
                  3. <b>أسلاك التوصيل:</b> موصلات ممتازة لنقل الشحنات من المصدر للمقاومة وإليها لتكوين المسار.
                </li>
              </ul>
            </div>

            <button
              onClick={() => setSwitchClosed(!switchClosed)}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg text-xs font-bold hover:bg-emerald-700 transition"
            >
              انقر لتبديل وضع المفتاح التفاعلي 🔌
            </button>
          </div>

        </div>
      )}

      {/* TAB 2: Lightning Storm Simulator */}
      {activeTab === 'lightning' && (
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Canvas representation */}
          <div className={`w-full lg:w-3/5 bg-slate-900 p-5 rounded-xl border flex flex-col justify-between h-[300px] relative transition-all duration-100 ${
            strike ? 'bg-[#fffae8] border-amber-300' : 'border-slate-800 shadow-inner'
          }`}>
            <span className="absolute top-2 left-2 text-[9px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold">
              بيئة العاصفة والمناخ
            </span>

            {/* Static Storm Clouds and ground representations with positive/negative symbols */}
            <div className="relative w-full flex-1 flex flex-col justify-between items-center py-6">
              
              {/* Cloud Layer (negative charges at bottom) */}
              <div className="w-full flex justify-around relative">
                <div className="bg-slate-700 text-white px-5 py-3 rounded-2xl shadow-md border border-slate-600 flex flex-col items-center">
                  <span className="text-xs font-bold">سحابة ماطرة</span>
                  <span className="text-[10px] text-red-300 tracking-wider">(- - -) شحنات سالبة بالأسفل</span>
                </div>
                <div className="bg-slate-700 text-white px-5 py-3 rounded-2xl shadow-md border border-slate-600 flex flex-col items-center">
                  <span className="text-xs font-bold">سحابة مرتفعة</span>
                  <span className="text-[10px] text-blue-300 tracking-wider">(+ + +) شحنات موجبة بالأعلى</span>
                </div>
              </div>

              {/* Dynamic Lightning Flash overlay */}
              {strike && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Bolt graphic */}
                  <div className="w-1.5 h-full bg-yellow-400 shadow-[0_0_30px_#f59e0b] animate-bounce transform rotate-12" />
                  <span className="absolute bg-amber-500 text-white font-extrabold text-sm px-3 py-1 rounded shadow-lg">صاعقة تفريغ!!!</span>
                </div>
              )}

              {/* Ground target showing tree with warning signs */}
              <div className="w-full flex justify-between items-end px-6 border-b border-dashed border-slate-700 pb-2">
                <div className="flex flex-col items-center">
                  <span className="text-2xl">🏡</span>
                  <span className="text-[9px] text-[#10b981] font-bold">بيت آمن (أرضي)</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl">🌳</span>
                  <span className="text-[9px] text-red-400 font-bold">شجرة عالية (خطر صاعقة)</span>
                </div>
              </div>

            </div>

            <button
              onClick={handleLightningStrike}
              className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold py-2 rounded-lg transition-transform hover:scale-101"
            >
              ⚡ إطلاق شرارة البرق (تفريغ الكهرباء الساكنة)
            </button>
          </div>

          {/* Safety warnings list (from Page 51-52) */}
          <div className="w-full lg:w-2/5 flex flex-col justify-between">
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 space-y-3 text-right text-amber-950">
              <h4 className="text-xs font-bold text-amber-900 flex items-center justify-end gap-1">
                <span>إرشادات السلامة عند العواصف (صفحة 51):</span>
                <ShieldAlert className="w-4 h-4 text-amber-650" />
              </h4>
              <ul className="text-[10.5px] leading-relaxed space-y-2 font-medium">
                <li className="flex justify-end gap-1">
                  <span>إذا فاجأك البرق في الخلاء، <b>فتمدد مستلقياً على الأرض</b> بالكامل.</span>
                  <span className="text-amber-600 font-bold">١.</span>
                </li>
                <li className="flex justify-end gap-1">
                  <span><b>ابتعد عن الآليات المعدنية</b> والجرارات والدراجات المكشوفة.</span>
                  <span className="text-amber-600 font-bold">٢.</span>
                </li>
                <li className="flex justify-end gap-1">
                  <span>في الغابات، ابقَ تحت الشجيرات القصيرة و<b>لا تقف تحت الأشجار العالية</b>.</span>
                  <span className="text-amber-600 font-bold">٣.</span>
                </li>
                <li className="flex justify-end gap-1">
                  <span>تحذير صارم: <b>لا تستخدم شبكات وأجهزة الاتصال المحمولة الجوالة</b> والراديو لأنها موهبة لجذب الصواعق.</span>
                  <span className="text-amber-600 font-bold">٤.</span>
                </li>
              </ul>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-lg text-center">
              <span className="text-[10px] font-bold text-slate-500 block">سبب الصاعقة العلمي:</span>
              <p className="text-[11px] text-slate-700 leading-normal mt-1">
                البرق والصواعق تحدث نتيجة <b>تراكم وتفريغ ضخم لشحنات الكهرباء الساكنة</b> بسبب احتكاك السحب بفعل الرياح.
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
