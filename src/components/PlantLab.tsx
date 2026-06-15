import React, { useState } from 'react';
import { Sprout, CheckCircle2, XCircle, Info, RotateCcw } from 'lucide-react';

interface SeedItem {
  id: string;
  name: string;
  type: 'single' | 'double'; // single = فلقة, double = فلقتين
  leafType: 'أبرية (شريطية متوازية)' | 'منبسطة (عروق شبكية)';
  rootType: 'ليفي لولبي' | 'وتدي عميق';
  fact: string;
}

const PLANT_POOL: SeedItem[] = [
  { id: '1', name: 'الذرة الشامية', type: 'single', leafType: 'أبرية (شريطية متوازية)', rootType: 'ليفي لولبي', fact: 'من أهم غلال الغذاء وتتحمل الجفاف.' },
  { id: '2', name: 'الفول السوداني', type: 'double', leafType: 'منبسطة (عروق شبكية)', rootType: 'وتدي عميق', fact: 'السودان من أكبر الدول المصدرة لزيت وعلف الفول السوداني.' },
  { id: '3', name: 'القمح السوداني', type: 'single', leafType: 'أبرية (شريطية متوازية)', rootType: 'ليفي لولبي', fact: 'يُزرع شتاءً بمشروع الجزيرة العريق.' },
  { id: '4', name: 'الملوخية والخضرة', type: 'double', leafType: 'منبسطة (عروق شبكية)', rootType: 'وتدي عميق', fact: 'تنتج بذوراً صغيرة ممتازة وتطبخ كوجبة شعبية مغذية.' },
  { id: '5', name: 'النخيل المجدول والبركاوي', type: 'single', leafType: 'أبرية (شريطية متوازية)', rootType: 'ليفي لولبي', fact: 'ينمو بكثرة في شمال السودان ويمثل ثقافة وتغذية أصيلة.' },
  { id: '6', name: 'الحمص (الكبكبي)', type: 'double', leafType: 'منبسطة (عروق شبكية)', rootType: 'وتدي عميق', fact: 'بذرة ممتازة تنقسم لنصفين متطابقين عند نقعها بالماء.' },
  { id: '7', name: 'المانجو البلدية', type: 'double', leafType: 'منبسطة (عروق شبكية)', rootType: 'وتدي عميق', fact: 'شجرة معمرة مباركة، تمتلك جذراً وتدياً عميقاً للتثبيت.' },
  { id: '8', name: 'الأرز الأبيض', type: 'single', leafType: 'أبرية (شريطية متوازية)', rootType: 'ليفي لولبي', fact: 'محب للمياه الكثيفة، وهو من ذوات الفلقة الواحدة.' }
];

export default function PlantLab() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, { correct: boolean; answer: 'single' | 'double' }>>({});
  const [completed, setCompleted] = useState(false);

  const currentPlant = PLANT_POOL[currentIdx];

  const handleSelection = (chosenType: 'single' | 'double') => {
    const isCorrect = chosenType === currentPlant.type;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentPlant.id]: { correct: isCorrect, answer: chosenType }
    }));

    if (isCorrect) {
      setScore(s => s + 1);
    }

    if (currentIdx < PLANT_POOL.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setCompleted(true);
    }
  };

  const resetLab = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedAnswers({});
    setCompleted(false);
  };

  return (
    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Interactive Sorting Panel */}
        <div className="w-full lg:w-3/5 bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between min-h-[380px]">
          {!completed ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700">
                <span>تصنيف النبات: {currentIdx + 1} من {PLANT_POOL.length}</span>
                <span className="text-emerald-700 font-bold">النقاط الحالية: {score}</span>
              </div>

              {/* Plant Card */}
              <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100 text-center space-y-3 relative overflow-hidden">
                <div className="absolute top-2 right-2 flex gap-1">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] rounded-full font-bold">زهرية بذرية</span>
                </div>
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Sprout className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">{currentPlant.name}</h3>
                
                {/* Structural Hints (From Textbook Page 20) */}
                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto pt-2">
                  <div className="bg-white p-2 rounded-lg border border-slate-100 text-right">
                    <span className="text-[10px] text-slate-400 block font-semibold">شكل الورقة:</span>
                    <span className="text-xs font-bold text-slate-700">{currentPlant.leafType}</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-100 text-right">
                    <span className="text-[10px] text-slate-400 block font-semibold">نوع الجذور:</span>
                    <span className="text-xs font-bold text-slate-700">{currentPlant.rootType}</span>
                  </div>
                </div>
              </div>

              {/* Action columns */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleSelection('single')}
                  className="bg-sky-50 text-sky-800 border-2 border-sky-200 py-4 px-3 rounded-xl font-bold hover:bg-sky-100 transition-all text-sm flex flex-col items-center gap-1 hover:border-sky-300"
                >
                  <span className="text-lg">🌾 ذوات فلقة واحدة</span>
                  <span className="text-[10px] text-sky-600 font-normal">بذور متماسكة - جذر ليفي</span>
                </button>
                <button
                  onClick={() => handleSelection('double')}
                  className="bg-orange-50 text-orange-800 border-2 border-orange-200 py-4 px-3 rounded-xl font-bold hover:bg-orange-100 transition-all text-sm flex flex-col items-center gap-1 hover:border-orange-300"
                >
                  <span className="text-lg">🥜 ذوات فلقتين</span>
                  <span className="text-[10px] text-orange-600 font-normal">بذور تنقسم - جذر وتدي</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center p-6 space-y-4">
              <div className="inline-flex w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full items-center justify-center mb-1">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">أحسنت! أكملت مختبر النباتات</h3>
              <p className="text-sm text-slate-600">
                لقد أجبت إجابة صحيحة على <span className="font-bold text-emerald-600">{score}</span> من أصل <span className="font-bold">{PLANT_POOL.length}</span> نباتات معروضة.
              </p>
              
              <div className="bg-slate-100 p-4 rounded-xl text-xs text-right max-w-md mx-auto space-y-1.5">
                <p className="font-bold text-slate-700">تذكر القواعد دائماً:</p>
                <p className="text-slate-600">• <b>ذوات الفلقة:</b> تتميز بجذر ليفي سطحي وأوراق شريطية عروقها متوازية (زي الذرة النخيل).</p>
                <p className="text-slate-600">• <b>ذوات الفلقتين:</b> تتميز بجذر وتدي قوي وأوراق منبسطة عروقها شبكية (زي الفول والحمص والمانجو).</p>
              </div>

              <button
                onClick={resetLab}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-lg text-xs shadow-sm transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                إعادة تشغيل المصنف العلمي
              </button>
            </div>
          )}
        </div>

        {/* Informative Side Card */}
        <div className="w-full lg:w-2/5 flex flex-col justify-between">
          <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-100 space-y-4 text-emerald-950">
            <h4 className="text-sm font-bold flex items-center gap-2 text-emerald-800">
              <Info className="w-4 h-4" />
              شرح تصنيف بخت الرضا (صفحة 20)
            </h4>
            <div className="text-xs space-y-3 leading-relaxed">
              <p>
                لقد صمم علماء النبات بجمهورية السودان هذا الجدول المنهجي لتسهيل تعريف تلامذتنا بكيفية عمل النبات.
              </p>
              <div>
                <span className="font-bold block text-emerald-900 leading-normal">🌱 كيف تفرق بينهما باللمس؟</span>
                <span>
                  عند نقع بذور الفول واللوبيا والحمص في كوب ماء دافئ لساعة أو أكثر، ثم الضغط عليها بإصبعك برفق، ستنقسم بسهولة لجزئين متطابقين؛ لذا سميت بذات فلقتين.
                </span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-emerald-100 text-[11px] text-emerald-900 space-y-1">
                <span className="font-bold block">مفتاح الحفظ الامتحاني:</span>
                <p>• <b>الذرة والقمح والأرز والبلح:</b> فلقة واحدة (جذر ليفي).</p>
                <p>• <b>الفول والحمص والعدس والمانجو:</b> فلقتان (جذر وتدي).</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
