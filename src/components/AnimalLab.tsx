import React, { useState } from 'react';
import { BadgeCheck, Info, RotateCcw, AlertCircle, Sparkles } from 'lucide-react';

interface Animal {
  id: string;
  name: string;
  type: 'vertebrate' | 'invertebrate';
  category: 'ثدييات' | 'طيور' | 'أسماك' | 'زواحف' | 'برمائيات' | 'حشرات' | 'عنكبوتيات' | 'ديدان';
  characteristics: string[];
  emoji: string;
  sudanFact: string; // Sudanese environment contextual note
}

const ANIMAL_POOL: Animal[] = [
  {
    id: 'a1',
    name: 'بقرة بلدية (السودانية)',
    type: 'vertebrate',
    category: 'ثدييات',
    characteristics: ['تلد وترضع صغارها', 'يغطي جسمها الوبر والشعر', 'درجة حرارة جسم ثابتة', 'تتنفس بالرئتين'],
    emoji: '🐄',
    sudanFact: 'تشتهر ولايات السودان مثل دارفور وكردفان بثروة هائلة من الأبقار والماشية الممتازة.'
  },
  {
    id: 'a2',
    name: 'حمام بري كوشي',
    type: 'vertebrate',
    category: 'طيور',
    characteristics: ['يبيض ويتكاثر بالبيض', 'حرارة ثابتة', 'يغطي عظامها وجسمها الريش', 'لها أجنحة وتطير بسرعة'],
    emoji: '🕊️',
    sudanFact: 'الحمام طائر محبب وموجود بكثرة في ساحات المدن والبيوت السودانية.'
  },
  {
    id: 'a3',
    name: 'سمك البلطي النيلي',
    type: 'vertebrate',
    category: 'أسماك',
    characteristics: ['تبيض بالماء', 'حرارة جسم متغيرة تبعاً للمحيط', 'تتحرك بالزعانف للتوازن وبذيلها', 'تتنفس بامتصاص الأكسجين عبر الخياشيم'],
    emoji: '🐟',
    sudanFact: 'يعتبر البلطي ملك المائدة النيلية بالسودان ويصطاد بكثرة من بحيرة خزان جبل أولياء.'
  },
  {
    id: 'a4',
    name: 'التمساح النيلي الكبير',
    type: 'vertebrate',
    category: 'زواحف',
    characteristics: ['يبيض بالرمال برية', 'حرارة متغيرة', 'يغطي جسمه حراشف قرنية سميكة وجافة', 'يتنفس بالرئتين بوضوح'],
    emoji: '🐊',
    sudanFact: 'السودان موطن لأقدم التماسيح النيلية الضخمة التي كانت تقدس في الحقب الكوشية القديمة.'
  },
  {
    id: 'a5',
    name: 'الضفدع الأخضر',
    type: 'vertebrate',
    category: 'برمائيات',
    characteristics: ['يركض بيضه بالماء', 'جلد رطب عارٍ من القشور والزغب', 'تبدأ حياتها بالماء وتتنفس بالخياشيم ثم بالرئتين بالبلوغ', 'حرارة متغيرة'],
    emoji: '🐸',
    sudanFact: 'تكثر الضفادع خلال فصل الخريف بالقرب من البرك لتصطاد الحشرات الضارة بالزراعة.'
  },
  {
    id: 'a6',
    name: 'ملكة نحل العسل',
    type: 'invertebrate',
    category: 'حشرات',
    characteristics: ['جسم مقسم لثلاثة أجزاء (رأس وصدر وبطن)', 'تمتلك 3 أزواج من الأرجل المتمصلة (أي 6 أرجل)', 'لها قرون استشعار وزوجان من الأجنحة', 'تبيض وهي منتجة للعسل'],
    emoji: '🐝',
    sudanFact: 'النحل حشرة نافعة جداً، وينتج السودان أجود أنواع عسل السدر الطبيعي بالشرق والغرب.'
  },
  {
    id: 'a7',
    name: 'العقرب الأسود السام',
    type: 'invertebrate',
    category: 'عنكبوتيات',
    characteristics: ['جسم مقسم لجزأين فقط (رأس-صدر ملتحم، وبطن)', 'تمتلك 4 أزواج من الأرجل للتسلق (أي 8 أرجل)', 'ليس لها أجنحة ولا قرون استشعار', 'تمتلك ذيلًا مشوكًا سامًا'],
    emoji: '🦂',
    sudanFact: 'العقارب كائنات ليلية التغذية تعيش بكرات الطوب والحجارة، ويجب الحذر الشديد منها وتجنبها.'
  },
  {
    id: 'a8',
    name: 'دودة بلهارسيا الدم',
    type: 'invertebrate',
    category: 'ديدان',
    characteristics: ['دودة متطفلة لينة الجسم خالية من العظام لتتحرك', 'تدخل جسم الإنسان عن طريق الجلد بالماء العكر الملوث بالترع'],
    emoji: '🐛',
    sudanFact: 'تنتشر البلهارسيا بالترع ملوثة المياه، لذا يحذر منهج بخت الرضا تلامذتنا وبشدة من السباحة فيها.'
  }
];

export default function AnimalLab() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState<'vertebrate' | 'invertebrate' | null>(null);
  const [selectedSubGroup, setSelectedSubGroup] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentAnimal = ANIMAL_POOL[currentIdx];

  const checkMainGroup = (group: 'vertebrate' | 'invertebrate') => {
    setSelectedGroup(group);
    if (group === currentAnimal.type) {
      setFeedback({
        isCorrect: true,
        text: `صحيح! ${currentAnimal.name} هي حيوان ${group === 'vertebrate' ? 'فقاري (يمتلك عموداً فقارياً)' : 'لا فقاري (لا يمتلك عموداً فقارياً)'}. والآن صنفه تفصيلياً:`
      });
    } else {
      setFeedback({
        isCorrect: false,
        text: `حاول مرة أخرى! تذكر: هل يمتلك ${currentAnimal.name} هيكل عظمي وعمود فقري بظهره؟`
      });
    }
  };

  const checkSubGroup = (sub: string) => {
    setSelectedSubGroup(sub);
    if (sub === currentAnimal.category) {
      setScore(prev => prev + 1);
      setFeedback({
        isCorrect: true,
        text: `رائع جداً! تصنيفك دقيق 100%. ${currentAnimal.name} تتبع لطائفة (${currentAnimal.category})!`
      });
      // Pause slightly then go to next
      setTimeout(() => {
        nextAnimal();
      }, 2500);
    } else {
      setFeedback({
        isCorrect: false,
        text: `خطأ! تذكر السمات: هل يمتلك ريشاً؟ هل لديه 6 أرجل أم 8؟ راجع معلومات البطاقة.`
      });
    }
  };

  const nextAnimal = () => {
    setSelectedGroup(null);
    setSelectedSubGroup(null);
    setFeedback(null);
    if (currentIdx < ANIMAL_POOL.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setCompleted(true);
    }
  };

  const resetGame = () => {
    setCurrentIdx(0);
    setSelectedGroup(null);
    setSelectedSubGroup(null);
    setFeedback(null);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
      {!completed ? (
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Main Sorting Interaction */}
          <div className="w-full lg:w-3/5 space-y-4">
            <div className="flex justify-between items-center bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
              <span className="text-emerald-700">المستوى: {currentIdx + 1} من {ANIMAL_POOL.length}</span>
              <span>النقاط المكتسبة: {score}⭐</span>
            </div>

            {/* Animal Flashcard */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-teal-100 flex flex-col md:flex-row items-center gap-5 relative overflow-hidden">
              <span className="absolute bottom-2 left-2 text-[10px] text-slate-400 font-bold font-mono">
                كود التصنيف الدراسي: #{currentAnimal.id}
              </span>
              <div className="text-6xl p-4 bg-white rounded-2xl shadow-sm border border-teal-50/50 flex items-center justify-center min-w-24 min-h-24">
                {currentAnimal.emoji}
              </div>
              <div className="text-right space-y-2 flex-1">
                <span className="bg-teal-100 text-teal-800 text-[10px] px-2 py-0.5 rounded-full font-bold inline-block">تحت المعاينة بخت الرضا</span>
                <h3 className="text-lg font-bold text-slate-800">{currentAnimal.name}</h3>
                
                {/* Structural characteristics lists */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentAnimal.characteristics.map((char, index) => (
                    <span key={index} className="bg-white/80 border border-teal-100 rounded text-[10px] px-2 py-1 text-slate-700 font-semibold block">
                      ✔ {char}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 1: Main Classification */}
            {selectedGroup === null || (feedback?.isCorrect === false && selectedGroup !== currentAnimal.type) ? (
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-700 text-right">الخطوة الأولى: هل لديه عمود فقاري (سلسلة عظام بظهره)؟</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <button
                    onClick={() => checkMainGroup('vertebrate')}
                    className="p-3 bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 rounded-xl font-bold transition-all"
                  >
                    🦴 نعم، فقاري
                  </button>
                  <button
                    onClick={() => checkMainGroup('invertebrate')}
                    className="p-3 bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 rounded-xl font-bold transition-all"
                  >
                    🦟 لا، لا فقاري
                  </button>
                </div>
              </div>
            ) : (
              /* Step 2: Scientific class taxonomy selection */
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-700 text-right">الخطوة الثانية: حدد طائفته الدقيقة من المنهج:</h4>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {currentAnimal.type === 'vertebrate' ? (
                    <>
                      {['ثدييات', 'طيور', 'أسماك', 'زواحف', 'برمائيات'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => checkSubGroup(cat)}
                          className={`p-2.5 rounded-lg font-bold border transition-all ${
                            selectedSubGroup === cat
                              ? cat === currentAnimal.category ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 'bg-red-100 border-red-300 text-red-800'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </>
                  ) : (
                    <>
                      {['حشرات', 'عنكبوتيات', 'ديدان'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => checkSubGroup(cat)}
                          className={`p-2.5 rounded-lg font-bold border transition-all ${
                            selectedSubGroup === cat
                              ? cat === currentAnimal.category ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 'bg-red-100 border-red-300 text-red-800'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Direct Feedback banner */}
            {feedback && (
              <div className={`p-3 rounded-lg text-xs font-semibold flex items-start gap-2 ${
                feedback.isCorrect ? 'bg-emerald-50 text-emerald-800 border border-emerald-150' : 'bg-red-50 text-red-800 border border-red-150'
              }`}>
                {feedback.isCorrect ? <BadgeCheck className="w-5 h-5 text-emerald-600 shrink-0" /> : <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />}
                <p className="leading-relaxed">{feedback.text}</p>
              </div>
            )}
          </div>

          {/* Descriptive Side Card (Fosters critical-thinking/Sudan context) */}
          <div className="w-full lg:w-2/5 flex flex-col justify-between">
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                ملحوظة البيئة السودانية:
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium bg-emerald-50/30 p-3 rounded-lg border border-emerald-100/40">
                {currentAnimal.sudanFact}
              </p>

              <div className="border-t border-slate-100 pt-3 space-y-3 text-xs">
                <span className="font-bold text-slate-700 block text-right">💡 إرشادات بخت الرضا للمقارنة (صفحة 27):</span>
                <div className="space-y-2 text-[11px] text-slate-500">
                  <div className="p-2 bg-slate-50/50 rounded-lg">
                    • <b>الحشرات (مثل النحل):</b> تمتلك قرون استشعار و <b>6 أرجل</b> وجسمها مقسم لثلاثة أجزاء.
                  </div>
                  <div className="p-2 bg-slate-50/50 rounded-lg">
                    • <b>العنكبوتيات (مثل العقرب):</b> ليس لها قرون استشعار وتمتلك <b>8 أرجل</b> وجسمها مقصود لجزأين.
                  </div>
                </div>
              </div>
            </div>
            
            {(selectedGroup !== null && feedback?.isCorrect) && (
              <button
                onClick={nextAnimal}
                className="mt-4 bg-teal-600 text-white w-full py-2.5 rounded-lg text-xs font-semibold hover:bg-teal-700 transition"
              >
                تخطي / انتقل للحيوان التالي ◀
              </button>
            )}
          </div>

        </div>
      ) : (
        <div className="text-center p-6 space-y-4 max-w-lg mx-auto">
          <div className="inline-flex w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full items-center justify-center">
            <BadgeCheck className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">ألف مبروك يا بطل!</h3>
          <p className="text-sm text-slate-600">
            لقد فرزت بنجاح طائفة الحيوانات بطلب السودان وأحرزت <span className="font-bold text-emerald-600">{score}</span> نقاط.
          </p>
          <div className="p-4 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 text-right leading-relaxed">
            <b>دروس الأحياء الهامة للمستقبل:</b> علم الحيوان يعتمد على التشريح الداخلي (العمود الفقاري والقلب وثبات الحرارة) بالإضافة للمظهر الخارجي (جلد، وبر، قشور، شعر، حراشف).
          </div>
          <button
            onClick={resetGame}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-xs font-semibold shadow"
          >
            <RotateCcw className="w-4 h-4" />
            إعادة الفرز مجدداً
          </button>
        </div>
      )}
    </div>
  );
}
