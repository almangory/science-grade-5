import React, { useState } from 'react';
import { Sparkles, Info, RefreshCw, Magnet, Compass } from 'lucide-react';

interface SandboxItem {
  name: string;
  material: string;
  isMagnetic: boolean;
  responseMsg: string;
  icon: string;
}

const SANDBOX_ITEMS: SandboxItem[] = [
  { name: 'مسمار حديد (صلب)', material: 'حديد', isMagnetic: true, responseMsg: 'انجذاب قوي جداً! مادة مغناطيسية.', icon: '📌' },
  { name: 'قلم رصاص', material: 'خشب', isMagnetic: false, responseMsg: 'لا يتأثر نهائياً. مادة غير مغناطيسية.', icon: '✏️' },
  { name: 'مشبك ورق فولاذي', material: 'صلب/حديد', isMagnetic: true, responseMsg: 'ينجذب بشكل رائع ويلتصق بالقطبين.', icon: '🖇️' },
  { name: 'ممحاة مطاطية الدفتر', material: 'مطاط بري', isMagnetic: false, responseMsg: 'لا يتأثر بالمغناطيس.', icon: '🧽' },
  { name: 'سلك توصيل نحاسي', material: 'نحاس أحمر', isMagnetic: false, responseMsg: 'المفاجأة: النحاس مادة غير مغناطيسية!', icon: '🔌' },
  { name: 'عملة الـ 50 قرش النيكل', material: 'نيكل خالص', isMagnetic: true, responseMsg: 'مادة مغناطيسية ممتازة تنجذب فوراً.', icon: '🪙' }
];

export default function MagnetLab() {
  const [activeTab, setActiveTab] = useState<'sandbox' | 'poles'>('sandbox');
  const [selectedItemIdx, setSelectedItemIdx] = useState<number | null>(null);

  // Poles laws states
  const [pole1, setPole1] = useState<'N' | 'S'>('N');
  const [pole2, setPole2] = useState<'N' | 'S'>('S');
  const [polesFeedback, setPolesFeedback] = useState<string>('الأقطاب المختلفة تتجاذب! انقر للمحاكاة.');

  const runPoleTest = () => {
    if (pole1 === pole2) {
      setPolesFeedback('🛑 تَنَافُرْ وتَبَاعُدْ! الأقطاب المتشابهة (ش-ش أو ج-ج) تتدافع بعيداً عن بعضها بقوة خفية.');
    } else {
      setPolesFeedback('💖 تَجَاذُبْ وتَقَارُبْ! الأقطاب المختلفة ومتعاكسة الألوان (شمالي-جنوبي) تشد بعضها بلهف لتلتصق.');
    }
  };

  return (
    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
      
      {/* Sub tabs */}
      <div className="flex border-b border-slate-200 mb-5 text-xs font-bold gap-3">
        <button
          onClick={() => setActiveTab('sandbox')}
          className={`pb-2.5 px-3 border-b-2 transition-all ${
            activeTab === 'sandbox' ? 'border-rose-600 text-rose-700' : 'border-transparent text-slate-500'
          }`}
        >
          🧲 1. الفرز المغناطيسي للمواد (صفحة 61)
        </button>
        <button
          onClick={() => setActiveTab('poles')}
          className={`pb-2.5 px-3 border-b-2 transition-all ${
            activeTab === 'poles' ? 'border-rose-600 text-rose-700' : 'border-transparent text-slate-500'
          }`}
        >
          🧭 2. قانون الأقطاب (صفحة 63)
        </button>
      </div>

      {/* TAB 1: Magnet Sandbox */}
      {activeTab === 'sandbox' && (
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Main sandbox layout */}
          <div className="w-full lg:w-3/5 bg-white p-5 rounded-xl border border-slate-200 space-y-4">
            <h4 className="text-xs font-bold text-slate-700 text-right">جرب المغناطيس التفاعلي بقضيب بخت الرضا:</h4>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {SANDBOX_ITEMS.map((item, idx) => (
                <button
                  key={item.name}
                  onClick={() => setSelectedItemIdx(idx)}
                  className={`p-3 rounded-xl border-2 text-right transition-all flex flex-col justify-between h-24 ${
                    selectedItemIdx === idx 
                      ? item.isMagnetic ? 'bg-emerald-50 border-emerald-400 text-emerald-950' : 'bg-red-50 border-red-350 text-red-950'
                      : 'bg-slate-50 border-slate-100 hover:border-slate-200 text-slate-705'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-[9px] text-slate-400 font-bold bg-slate-200/50 px-1.5 py-0.5 rounded">
                      {item.material}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold block">{item.name}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Test result banner */}
            {selectedItemIdx !== null ? (
              <div className={`p-4 rounded-xl border text-xs text-right space-y-1.5 leading-relaxed transition-all ${
                SANDBOX_ITEMS[selectedItemIdx].isMagnetic
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}>
                <p className="font-extrabold flex items-center justify-end gap-1 text-sm">
                  <span>{SANDBOX_ITEMS[selectedItemIdx].name}</span>
                  <span>{SANDBOX_ITEMS[selectedItemIdx].isMagnetic ? '✅ ينجذب بقوة!' : '❌ لا يتأثر'}</span>
                </p>
                <p>{SANDBOX_ITEMS[selectedItemIdx].responseMsg}</p>
                <p className="text-[10px] text-slate-400">
                  {SANDBOX_ITEMS[selectedItemIdx].isMagnetic 
                    ? 'السبب: المغناطيس يمتلك قوة غير مرئية قادرة على تحفيز عزم ذرات الحديد والنيكل وجذبها.' 
                    : 'السبب: الخشب والنحاس والورق والمطاط لا تمتلك خصائص مغناطيسية تتفاعل مع خطوط الفيض المغناطيسي.'}
                </p>
              </div>
            ) : (
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center text-xs text-slate-500 font-medium leading-relaxed">
                👈 انقر على أي مكون من مكونات المعمل بالخزانة لاختبار قابليته للانجذاب للمغناطيس!
              </div>
            )}
          </div>

          {/* Scientific details */}
          <div className="w-full lg:w-2/5 flex flex-col justify-between space-y-4">
            <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 space-y-3 text-right text-rose-950">
              <h4 className="text-xs font-bold flex items-center justify-end gap-1">
                <span>المواد المغناطيسية واللامغناطيسية (صفحة 61):</span>
                <Info className="w-4 h-4 text-rose-700" />
              </h4>
              <p className="text-[11px] leading-relaxed">
                صنف علماء بخت الرضا المواد لنوعين:
              </p>
              <ul className="text-[10.5px] leading-relaxed space-y-2 list-none">
                <li>
                  🌿 <b>المواد المغناطيسية:</b> هي المواد التي تنجذب للمغناطيس، وأمثلتها الهامة للحفظ هي: <b>الحديد والكوبلت والنيكل</b>.
                </li>
                <li>
                  📝 <b>المواد غير المغناطيسية:</b> هي المواد التي لا تنجذب للمغناطيس كالبشرة والجلد، وأمثلتها: <b>النحاس، الألمنيوم، البلاستيك، الورق والخشب</b>.
                </li>
              </ul>
            </div>

            <button
              onClick={() => setSelectedItemIdx(null)}
              className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-2.5 rounded-lg transition"
            >
              تفريع وإفراغ لوحة المعاينة التفاعلية 🧳
            </button>
          </div>

        </div>
      )}

      {/* TAB 2: Magnetic Poles */}
      {activeTab === 'poles' && (
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Interactive attraction testing */}
          <div className="w-full lg:w-3/5 bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between min-h-[290px]">
            <h4 className="text-xs font-bold text-slate-700 text-right">محاكاة قانون الأقطاب المتجاذبة والمتنافرة (صفحة 63):</h4>
            
            {/* Magnet positioning display */}
            <div className="relative w-full flex-1 flex items-center justify-around py-4">
              
              {/* Magnet 1 */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-400 font-bold mb-1">المغناطيس الأول (الثابت)</span>
                <div className="w-24 h-10 rounded shadow-md flex overflow-hidden border border-slate-350">
                  <div className="w-1/2 bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs">ج (S)</div>
                  <div className="w-1/2 bg-red-650 text-white font-extrabold flex items-center justify-center text-xs">ش (N)</div>
                </div>
              </div>

              {/* Central Dynamic Spark or gap arrow */}
              <div className="flex flex-col items-center justify-center h-full">
                {pole1 === pole2 ? (
                  <div className="animate-bounce font-extrabold text-red-500 text-xl">◀ ⛔ ▶</div>
                ) : (
                  <div className="animate-pulse font-extrabold text-emerald-500 text-xl">▶ 💖 ◀</div>
                )}
              </div>

              {/* Magnet 2 (Swappable pole parameters) */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-400 font-bold mb-1">المغناطيس الثاني (المقترب)</span>
                <div className="w-24 h-10 rounded shadow-md flex overflow-hidden border border-slate-350 transform transition-all">
                  {pole1 === 'N' ? (
                    <>
                      <div className="w-1/2 bg-red-650 text-white font-extrabold flex items-center justify-center text-xs">ش (N)</div>
                      <div className="w-1/2 bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs">ج (S)</div>
                    </>
                  ) : (
                    <>
                      <div className="w-1/2 bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs">ج (S)</div>
                      <div className="w-1/2 bg-red-650 text-white font-extrabold flex items-center justify-center text-xs">ش (N)</div>
                    </>
                  )}
                </div>
              </div>

            </div>

            {/* Poles controllers */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs font-bold text-slate-700">
              <button
                onClick={runPoleTest}
                className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg font-bold"
              >
                اختبار التقريب 👆
              </button>

              <div className="flex gap-4">
                <div className="text-right">
                  <label className="block text-[10px] text-slate-400 mb-1">القطب المقابل:</label>
                  <select 
                    value={pole1} 
                    onChange={(e) => setPole1(e.target.value as 'N' | 'S')}
                    className="p-1 px-3 border border-slate-300 rounded font-bold font-mono text-xs bg-white"
                  >
                    <option value="N">شمالي (أحمر)</option>
                    <option value="S">جنوبي (أزرق)</option>
                  </select>
                </div>
                <div className="text-right">
                  <label className="block text-[10px] text-slate-400 mb-1">القطب المقترب:</label>
                  <select 
                    value={pole2} 
                    onChange={(e) => setPole2(e.target.value as 'N' | 'S')}
                    className="p-1 px-3 border border-slate-300 rounded font-bold font-mono text-xs bg-white"
                  >
                    <option value="N">شمالي (أحمر)</option>
                    <option value="S">جنوبي (أزرق)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Poles evaluation feedback */}
            <div className="p-2.5 text-xs text-center font-bold text-rose-950 mt-1 bg-rose-50/50 rounded-lg">
              {polesFeedback}
            </div>

          </div>

          {/* Core Laws Summaries */}
          <div className="w-full lg:w-2/5 flex flex-col justify-between text-right space-y-4">
            <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 space-y-3 text-rose-950">
              <h4 className="text-xs font-bold flex items-center justify-end gap-1">
                <span>تفسير قطبي المغناطيس (صفحة 62):</span>
                <Compass className="w-4 h-4 text-rose-700" />
              </h4>
              <ul className="text-[11px] leading-relaxed space-y-2 list-none">
                <li>
                  📍 <b>القطبان:</b> هما منطقتا نهاية قضيب المغناطيس، وتكون عندهما القوة المغناطيسية الجاذبة بـ <b>أكبر ما يمكن</b> بينما تنعدم القوة تماماً في المنتصف.
                </li>
                <li>
                  🧭 <b>البوصلة والاتصال الجغرافي:</b> عند تعليق المغناطيس حراً بخيط، فإن قطبه الشمالي (ش/N) يشير تلقائياً لجهة الشمال الجغرافي، بينما يشير الجنوبي (ج/S) جهة الجنوب الجغرافي.
                </li>
              </ul>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl text-center text-xs text-slate-600 leading-normal">
              <b>معلومة الماجنيتيت:</b> المغناطيس الطبيعي خام نقي من خامات الحديد المكتشفة طبيعياً وسوداء اللون، وهو حجر طبيعي معبأ بعزم الجذب الأبدي.
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
