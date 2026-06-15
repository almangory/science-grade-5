import React, { useState, useMemo } from 'react';
import { 
  BookMarked, 
  Search, 
  Volume2, 
  VolumeX, 
  Layers, 
  Tag, 
  HelpCircle, 
  CheckCircle, 
  AlertCircle, 
  RotateCcw,
  Sparkles,
  Trophy
} from 'lucide-react';

interface GlossaryTerm {
  term: string;
  english: string;
  definition: string;
  example: string;
  unitId: string;
  unitName: string;
}

const GLOSSARY_TERMS: GlossaryTerm[] = [
  // Unit 1
  {
    term: "الحجاب الحاجز",
    english: "Diaphragm",
    definition: "عضلة مرنة وعريضة تفصل بين تجويف الصدر وتجويف البطن، وتتحرك لأسفل وأعلى لتنظيم حركتي الشهيق والزفير وتحريك القفص الصدري.",
    example: "عند الشهيق تنقبض لأسفل لتسحب الأكسجين، وعند الزفير تنبسط لتطرد ثاني أكسيد الكربون.",
    unitId: "unit1",
    unitName: "أجهزة جسم الإنسان"
  },
  {
    term: "لسان المزمار",
    english: "Epiglottis",
    definition: "نعال غضروفي مرن يقع أعلى الحنجرة، يعمل كحارس بوابة ذكي يغلق مجرى التنفس تماماً أثناء بلع الطعام والماء حتى لا ندخل في نوبة سعال.",
    example: "يغلق تلقائياً ليمر الطعام اللذيذ بسلام إلى المريء ومعدة التلميذ.",
    unitId: "unit1",
    unitName: "أجهزة جسم الإنسان"
  },
  {
    term: "الهضم الكلي",
    english: "Complete Digestion",
    definition: "العملية الكيميائية التامة التي يتم فيها تحليل المواد المعقدة إلى مواد غذائية في غاية البساطة تذوب في الماء ليسهل امتصاصها في الأمعاء الدقيقة.",
    example: "تقوم الإنزيمات والعصارات في المعدة والأمعاء الدقيقة بتفتيت وجبة الغداء حتى يستفيد منها الدم.",
    unitId: "unit1",
    unitName: "أجهزة جسم الإنسان"
  },
  {
    term: "السل الرئوي",
    english: "Tuberculosis",
    definition: "مرض معدٍ خطير تسببه بكتيريا معينة تهاجم الشعب الهوائية والرئتين، وينتقل للآخرين عن طريق الهواء والرذاذ الناتج عن سعال الشخص المصاب.",
    example: "الوقاية منه تشمل التطعيم المبكر والتهوية المستمرة للغرف والمدارس في السودان.",
    unitId: "unit1",
    unitName: "أجهزة جسم الإنسان"
  },
  {
    term: "الدوسنتاريا",
    english: "Dysentery",
    definition: "التهاب حاد يصيب الأغشية المخاطية للأمعاء الغليظة مسبباً إسهالاً به مخاط ودم، وينتقل عبر الأيدي المتسخة والذباب والأكل غير المغسول.",
    example: "الذباب والماء الملوث هما الناقل الرئيسي لجرثومة الدوسنتاريا، ولذلك نحرص على غسل الأيدي دائماً.",
    unitId: "unit1",
    unitName: "أجهزة جسم الإنسان"
  },

  // Unit 2
  {
    term: "نباتات وعائية",
    english: "Vascular Plants",
    definition: "مجموعة من النباتات الراقية التي تمتلك أوعية متخصصة ومقواة (خشب ولحاء) تجري داخل سيقانها لنقل الماء والأملاح المعدنية للأوراق وصنع الغذاء.",
    example: "أشجار النخيل والمانجو والصمغ العربي في السودان هي أروع أمثلة على هذه النباتات الوعائية.",
    unitId: "unit2",
    unitName: "تصنيف النباتات"
  },
  {
    term: "نباتات لاوعائية",
    english: "Non-vascular Plants",
    definition: "نباتات بسيطة وصغيرة جداً لا تملك أوعية خشبية أو قنوات ناقلة، بل تمتص الماء والرطوبة بشكل مباشر من محيطها الرطب بعملية الانتشار.",
    example: "طحالب الأرض وحزازيات الصخور التي تنمو بجوار شلالات سابللوكة والمناطق المبتلة.",
    unitId: "unit2",
    unitName: "تصنيف النباتات"
  },
  {
    term: "ذوات الفلفة",
    english: "Monocotyledons",
    definition: "النباتات البذرية التي تخزن غذائها في البذرة على هيئة قطعة واحدة متماسكة (فلقة) لا تنقسم لنصفين، وتتميز بأن عروق أوراقها متوازية وجذورها ليفية.",
    example: "حبوب الذرة الشامية، القمح، والدخن هي أمثلة كلاسيكية على البذور ذات الفلقة الواحدة.",
    unitId: "unit2",
    unitName: "تصنيف النباتات"
  },
  {
    term: "ذوات الفلقتين",
    english: "Dicotyledons",
    definition: "النباتات البذرية التي يمكن قسمة بذرتها لقطعتين متماثلتين ومتطابقتين بفضل وجود مخزنين للغذاء، وتتميز بجذور وتدية قوية تغوص في أعماق التربة.",
    example: "حبة الفول السوداني، الكبكبي (الحمص)، والعدس تنقسم بكل سهولة لنصفين متساويين.",
    unitId: "unit2",
    unitName: "تصنيف النباتات"
  },

  // Unit 3
  {
    term: "الفقاريات",
    english: "Vertebrates",
    definition: "حيوانات تمتلك هيكلاً عظمياً أو غضروفياً داخلياً ومن أبرزه العمود الفقري الذي يعطي الجسم القوام السليم ويحمي النخاع الشوكي.",
    example: "الخيول والأسماك والطيور التي نراها في حديقة المقرن بالخرطوم تمتلك عموداً فقرياً.",
    unitId: "unit3",
    unitName: "تصنيف الحيوانات"
  },
  {
    term: "اللافقاريات",
    english: "Invertebrates",
    definition: "طائفة ضخمة من الكائنات الحية التي لا تمتلك أي عمود فقري أو هيكل عظمي بداخلها، وحظيت بقرون استشعار أو دروع صلدة للحماية.",
    example: "الجراد الصحراوي، الحلزون والديدان وعقارب الغابات كلها حيوانات لا فقارية.",
    unitId: "unit3",
    unitName: "تصنيف الحيوانات"
  },
  {
    term: "ذوات الدم الحار",
    english: "Warm-blooded",
    definition: "حيوانات تتميز بالقدرة على إنتاج طاقتها الداخلية للمحافظة على درجة حرارة أجسامها ثابتة تماماً مهما تغيرت حرارة الطقس الخارجي.",
    example: "الإنسان، الحمامة والطيور المنزلية كلها تنتج حرارتها الداخلية وثابتة دوماً.",
    unitId: "unit3",
    unitName: "تصنيف الحيوانات"
  },
  {
    term: "ذوات الدم البارد",
    english: "Cold-blooded",
    definition: "حيوانات لا تستطيع تنظيم درجة حرارتها ذاتياً، بل تكتسب حرارة جسمها من الشمس أو البيئة المحيطة بها ولذلك تكسل وتبرد في الشتاء.",
    example: "التمساح النيلي والسلاحف والضفادع التي تخرج للاستلقاء تحت أشعة الشمس لتدفئة دمائها.",
    unitId: "unit3",
    unitName: "تصنيف الحيوانات"
  },

  // Unit 4
  {
    term: "التبخر",
    english: "Evaporation",
    definition: "التغير الفيزيائي الذي يتحول فيه الماء السائل إلى بخار (غاز عديم اللون) يرتفع في الهواء، وذلك عند تزويده بالحرارة أو حرارة الشمس القوية.",
    example: "جفاف غدير مياه المطر السطحي بعد يوم مشمس حار في ولايات السودان المختلفة.",
    unitId: "unit4",
    unitName: "الماء وأسراره"
  },
  {
    term: "التكاثف",
    english: "Condensation",
    definition: "تحول بخار الماء الغازي الدافئ إلى ماء سائل عند ملامسته لسطح بارد أو صعوده لطبقات الجو العليا الأشد برودة حيث يتجمع ويشكل الغيوم.",
    example: "ظهور قطرات مياه عذبة على سطح زجاج كوب عصير بارد في الصيف.",
    unitId: "unit4",
    unitName: "الماء وأسراره"
  },
  {
    term: "دورة المياه",
    english: "Water Cycle",
    definition: "الحركة الدائرية الحية والمستمرة للماء على الأرض: يتبخر من البحار والأنهار، يتكاثف في السماء على شكل سحب، ثم يهطل مطراً مباركاً يسيل على الجبال ويعود.",
    example: "مياه النيل تبخرها الشمس ثم يهطل مطراً مغذياً في هضبة الحبشة ليرتفع مستوى النيل مجدداً.",
    unitId: "unit4",
    unitName: "الماء وأسراره"
  },

  // Unit 5
  {
    term: "قوة الاحتكاك",
    english: "Friction Force",
    definition: "القوة المعاكسة للاتجاه الحركي، تنشأ بين الأجسام المتلامسة وتسعى لتقليل سرعة الأجسام المتحركة أو إبقائها ساكنة ومنعها من الانزلاق.",
    example: "إطارات الشاحنة السودانية تحتك بطريق الإسفلت الخشن مما يساعد السائق على الوقوف الآمن بالفرامل.",
    unitId: "unit5",
    unitName: "الحركة والقوى"
  },
  {
    term: "الجاذبية الأرضية",
    english: "Gravity",
    definition: "القوة الطبيعية الجاذبة وغير المرئية التي تسلطها الكرة الأرضية على كافة الأجسام فتجذبها لأسفل باتجاه المركز وتمنعها من الطيران في الفضاء.",
    example: "سقوط ثمرة مانجو ناضجة من الشجرة لتهبط مباشرة على الأرض عوضاً عن تشتتها في الهواء.",
    unitId: "unit5",
    unitName: "الحركة والقوى"
  },

  // Unit 6
  {
    term: "الكهرباء الساكنة",
    english: "Static Electricity",
    definition: "تجمع وبقاء شحنات كهربائية ساكنة (سالبة أو موجبة) على أسطح المواد العازلة لفترة قصيرة، نتيجة احتكاكها أو دلكها بقطعة صوف أو حرير.",
    example: "جذب المسطرة البلاستيكية لقصاصات الورق الصغيرة بعد دلكها بقوة بشعر رأسك الجاف.",
    unitId: "unit6",
    unitName: "علم الكهرباء"
  },
  {
    term: "الكشاف الكهربائي",
    english: "Electroscope",
    definition: "أداة مخبرية دقيقة وبسيطة التركيب تستخدم لمعرفة هل الجسم مشحون أم غير مشحون وتحديد نوع الشحنات بواسطة تباعد ورقتيه الفلزيتين.",
    example: "عند تقريب قضيب مشحون من الكرص العلوي تتباعد الورقتان الذهبين تأكيداً لوجود الشحنة.",
    unitId: "unit6",
    unitName: "علم الكهرباء"
  },
  {
    term: "الصاعقة",
    english: "Lightning",
    definition: "شرارة كهربائية خيالية الحجم وتفريغ هائل للشحنات الكهربائية الساكنة المترددة بين السحب الكثيفة وبين الأجسام الشاهقة والمنشآت على سطح الأرض.",
    example: "صواعق الرعد تضرب مانعات الصواعق النحاسية المثبتة فوق المستشفيات وأبراج الاتصالات لتفريغها بأمان.",
    unitId: "unit6",
    unitName: "علم الكهرباء"
  },

  // Unit 7
  {
    term: "مغنطيس طبيعي",
    english: "Natural Magnet",
    definition: "صخر خام أسود اللون يتكون من مادة كيميائية تسمى أكسيد الحديد المغناطيسي (المغنتيت)، وله قدرة طبيعية هبة من الله لجذب دبابيس الحديد.",
    example: "استخدمه البحارة القدماء لتوجيه دفة السفن في المحيطات المظلمة عبر البوصلة وصنع القطع البحرية.",
    unitId: "unit7",
    unitName: "المغناطيس وعوالمه"
  },
  {
    term: "أقطاب المغناطيس",
    english: "Magnetic Poles",
    definition: "نقطتان تقعان عند طرفي المغناطيس وتكون فيهما القوة المغناطيسية وعمليات الجذب والشد وتوجيه المغناطيس أشد وأقوى ما يمكن.",
    example: "القطب الشمالي يشير للجهة الجغرافية الشمالية، بينما ينجذب بقوة نحو القطب الجنوبي لمغناطيس آخر.",
    unitId: "unit7",
    unitName: "المغناطيس وعوالمه"
  }
];

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnitFilter, setSelectedUnitFilter] = useState('all');
  
  // Game State
  const [isPlayingGame, setIsPlayingGame] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameQuestionIdx, setGameQuestionIdx] = useState(0);
  const [gameFeedback, setGameFeedback] = useState<{ isCorrect: boolean; show: boolean; msg: string } | null>(null);
  const [gameAnswered, setGameAnswered] = useState(false);

  // Audio speech Synthesis
  const playSound = (textToRead: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("معذرةً، جهازك لا يدعم توليد الصوت التفاعلي.");
    }
  };

  // Filtered terms
  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter(item => {
      const matchSearch = item.term.includes(searchTerm) || 
                          item.definition.includes(searchTerm) || 
                          item.english.toLowerCase().includes(searchTerm.toLowerCase());
      const matchUnit = selectedUnitFilter === 'all' || item.unitId === selectedUnitFilter;
      return matchSearch && matchUnit;
    });
  }, [searchTerm, selectedUnitFilter]);

  // Unique units for dropdown
  const uniqueUnits = useMemo(() => {
    const map = new Map<string, string>();
    GLOSSARY_TERMS.forEach(item => {
      map.set(item.unitId, item.unitName);
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, []);

  // Generate game question: Ask definition, student matches term
  const gameQuestions = useMemo(() => {
    // Shuffle copy of glossary terms
    const shuffled = [...GLOSSARY_TERMS].sort(() => 0.5 - Math.random()).slice(0, 5);
    return shuffled.map(correctItem => {
      // Get 3 incorrect alternatives
      const alternatives = GLOSSARY_TERMS
        .filter(t => t.term !== correctItem.term)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(t => t.term);
      
      const choices = [correctItem.term, ...alternatives].sort(() => 0.5 - Math.random());
      
      return {
        definition: correctItem.definition,
        correctTerm: correctItem.term,
        choices,
        english: correctItem.english
      };
    });
  }, [isPlayingGame]);

  const handleGameAnswer = (selected: string) => {
    if (gameAnswered) return;
    setGameAnswered(true);
    const currentQ = gameQuestions[gameQuestionIdx];
    const isCorrect = selected === currentQ.correctTerm;
    
    if (isCorrect) {
      setGameScore(s => s + 1);
      setGameFeedback({
        isCorrect: true,
        show: true,
        msg: "برافو يا بطل! إجابة ذكية وموفقة تليق بعلماء الغد."
      });
    } else {
      setGameFeedback({
        isCorrect: false,
        show: true,
        msg: `إجابة قريبة، لكن المصطلح الصحيح هو: (${currentQ.correctTerm})`
      });
    }
  };

  const handleNextGameQuestion = () => {
    setGameFeedback(null);
    setGameAnswered(false);
    if (gameQuestionIdx < gameQuestions.length - 1) {
      setGameQuestionIdx(idx => idx + 1);
    } else {
      setGameQuestionIdx(gameQuestions.length); // shows end screen
    }
  };

  const restartGame = () => {
    setGameScore(0);
    setGameQuestionIdx(0);
    setGameAnswered(false);
    setGameFeedback(null);
    setIsPlayingGame(true);
  };

  return (
    <div className="space-y-6 text-right">
      
      {/* Title block */}
      <div className="bg-gradient-to-l from-sky-500 to-sky-600 p-6 rounded-3xl text-white shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="space-y-1.5 flex-1 select-none">
          <div className="flex items-center justify-end gap-2 text-yellow-300 font-bold">
            <span className="text-xs bg-white/20 py-0.5 px-2 rounded-full text-white border border-white/20">جديد بالمنصة 📖</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-2xl font-black">قاموس العلوم واللغة الميسّر</h2>
          <p className="text-xs text-sky-100/90 leading-relaxed font-medium">
            يساعدك هذا القاموس على تفكيك المفاهيم العلمية الراقية، ومعرفة معانيها اللغوية باللغتين العربية والإنجليزية لتعزيز تفوقك اللغوي والعلمي وتسهيل الحفظ.
          </p>
        </div>
        
        {/* Play game / view list switch */}
        <button 
          onClick={() => {
            if (isPlayingGame) {
              setIsPlayingGame(false);
            } else {
              restartGame();
            }
          }}
          className={`px-5 py-3 rounded-2xl font-black text-xs transition duration-200 flex items-center gap-2 shadow-md ${
            isPlayingGame 
              ? 'bg-white text-[#0284C7] hover:bg-sky-50' 
              : 'bg-yellow-400 hover:bg-yellow-500 text-sky-950'
          }`}
        >
          {isPlayingGame ? (
            <>
              <span>📚 عرض قائمة المصطلحات</span>
              <BookMarked className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>🎮 العب تحدي المصطلحات التفاعلي</span>
              <Trophy className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Main Glossary Sandbox */}
      {!isPlayingGame ? (
        <div className="space-y-6">
          
          {/* Quick Search and Dropdowns Filter */}
          <div className="bg-sky-50/50 p-4 rounded-3xl border border-sky-100 flex flex-col md:flex-row gap-3">
            
            {/* Search inputs */}
            <div className="relative flex-1">
              <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-sky-500">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="ابحث عن كلمة صعبة (مثل: حجاب، تبخر، وعائية، كهرباء...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-3 bg-white border border-sky-200/80 rounded-2xl text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7] shadow-sm text-right"
              />
            </div>

            {/* Select Unit filter */}
            <div className="relative w-full md:w-64">
              <select
                value={selectedUnitFilter}
                onChange={(e) => setSelectedUnitFilter(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-sky-200/80 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0284C7] shadow-sm appearance-none text-right cursor-pointer"
              >
                <option value="all">📁 جميع الوحدات السبع</option>
                {uniqueUnits.map(u => (
                  <option key={u.id} value={u.id}>⭐ {u.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Listing terms count */}
          <div className="flex justify-between items-center text-xs font-bold px-1">
            <span className="text-slate-400">عدد المصطلحات المطابقة: {filteredTerms.length}</span>
            <span className="text-sky-800">تصفّح بطاقات المفاهيم الحية 👇</span>
          </div>

          {/* Cards Grid */}
          {filteredTerms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTerms.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white p-5 rounded-3xl border-2 border-sky-50/70 hover:border-sky-300 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between text-right relative overflow-hidden"
                >
                  <div className="space-y-3">
                    
                    {/* Header badge */}
                    <div className="flex justify-between items-start gap-2">
                      <span className="bg-sky-50 text-[#0284C7] border border-sky-100 text-[9px] px-2.5 py-0.5 rounded-full font-bold">
                        {item.unitName}
                      </span>
                      
                      <button
                        onClick={() => playSound(`${item.term}. ${item.definition}`)}
                        className="bg-sky-50 hover:bg-sky-100/80 text-[#0284C7] p-2 rounded-xl transition shadow-sm flex items-center justify-center gap-1 text-[10px]"
                        title="استمع للفظ الميسّر"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>استمع 🔊</span>
                      </button>
                    </div>

                    {/* Word Typography Pair */}
                    <div className="space-y-0.5">
                      <h4 className="text-lg font-black text-sky-950">{item.term}</h4>
                      <p className="text-[11px] text-slate-400 font-bold font-mono tracking-wider">{item.english}</p>
                    </div>

                    {/* Short definition */}
                    <p className="text-xs text-slate-650 leading-relaxed font-medium pt-1">
                      {item.definition}
                    </p>

                  </div>

                  {/* Environment Sudan Example bubble */}
                  <div className="mt-4 pt-3 border-t border-sky-50 bg-amber-50/50 p-3 rounded-2xl border border-amber-100/50 text-right">
                    <span className="text-[9px] font-black text-amber-800 block mb-0.5">مثال توضيحي وقريب للتلميذ:</span>
                    <p className="text-[11.5px] text-amber-950 font-medium leading-relaxed">
                      💡 {item.example}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-sky-50/30 p-12 rounded-3xl border-2 border-dashed border-sky-100 text-center space-y-3">
              <span className="text-4xl">🔍</span>
              <h4 className="text-sm font-black text-sky-950">لم نجد مصطلحات مطابقة لبحثك</h4>
              <p className="text-xs text-slate-450 max-w-xs mx-auto">
                جرب كتابة أحرف بسيطة أو تصفية المصطلحات مخصصة باختيار وحدة معينة من القائمة المجاورة.
              </p>
            </div>
          )}

        </div>
      ) : (
        /* CHALLENGE/QUZZ GAME MODE */
        <div className="bg-sky-50/30 border-2 border-sky-100 p-6 rounded-[32px] space-y-6 max-w-xl mx-auto text-center">
          
          {/* Finish or Game Over state */}
          {gameQuestionIdx >= gameQuestions.length ? (
            <div className="space-y-5 py-4">
              <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto text-4xl shadow border border-amber-250 animate-bounce">
                🎉
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-800">حفاوة وتقدير مستحق!</h3>
                <p className="text-xs text-slate-500 font-bold">أنهيت جولة التفتيش اللغوية للتحديات العلمية بنجاح.</p>
              </div>

              {/* Score breakdown banner */}
              <div className="bg-white p-5 rounded-3xl border-2 border-sky-100 max-w-xs mx-auto text-center space-y-1 shadow-sm">
                <span className="text-[10px] text-slate-400 block font-bold">الدرجة النهائية للحصيلة اللغوية:</span>
                <span className="text-2xl font-black text-[#0284C7]">{gameScore} من أصل {gameQuestions.length}</span>
                <p className="text-xs font-bold text-green-700 mt-1.5">
                  {gameScore >= 4 ? '🏅 ممتاز! حصيلتك اللغوية ممتعة وراسخة جداً.' : '📖 جيد جداً، واظب على قراءة القاموس لتسمو معرفتك أكثر.'}
                </p>
              </div>

              <div className="flex gap-2 max-w-sm mx-auto pt-3">
                <button
                  onClick={() => setIsPlayingGame(false)}
                  className="flex-1 bg-white border border-sky-200 hover:bg-sky-50 text-sky-950 font-black py-2.5 rounded-2xl text-xs transition shadow-sm"
                >
                  الخروج للقاموس
                </button>
                <button
                  onClick={restartGame}
                  className="flex-1 bg-[#0284C7] hover:bg-sky-600 text-white font-black py-2.5 rounded-2xl text-xs transition shadow"
                >
                  ألعب مرة ثانية 🎮
                </button>
              </div>
            </div>
          ) : (
            /* ACTIVE QUESTION STATE */
            <div className="space-y-6 text-right">
              
              {/* Score and count header */}
              <div className="flex justify-between items-center bg-white p-3 rounded-2xl shadow-sm border border-sky-100">
                <span className="text-xs font-black text-slate-700">النقاط: <span className="text-amber-600 font-mono text-sm">{gameScore}</span></span>
                <span className="text-xs font-bold text-sky-800">السؤال {gameQuestionIdx + 1} من {gameQuestions.length}</span>
              </div>

              {/* Definition block to guess */}
              <div className="bg-white p-5 rounded-3xl border-2 border-sky-50 shadow-sm space-y-4">
                <div className="flex items-center justify-end gap-1.5">
                  <span className="text-[10px] bg-sky-200 text-[#0284C7] px-2 py-0.5 rounded font-black font-mono">ما هو هذا المصطلح؟</span>
                  <HelpCircle className="w-4 h-4 text-sky-500" />
                </div>
                
                <h4 className="text-sm font-black text-slate-800 leading-relaxed text-right md:text-center justify-center">
                  "{gameQuestions[gameQuestionIdx].definition}"
                </h4>
              </div>

              {/* Four Selectable Choices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {gameQuestions[gameQuestionIdx].choices.map((termName, i) => {
                  const isCorrectAnswer = termName === gameQuestions[gameQuestionIdx].correctTerm;
                  return (
                    <button
                      key={i}
                      onClick={() => handleGameAnswer(termName)}
                      disabled={gameAnswered}
                      className={`p-4 rounded-2xl border-2 text-right text-xs font-bold transition-all shadow-sm ${
                        gameAnswered
                          ? isCorrectAnswer 
                            ? 'bg-green-50 border-green-400 text-green-905 font-black scale-[1.02]'
                            : 'bg-white border-slate-100 text-slate-300 opacity-60'
                          : 'bg-white hover:border-sky-305 border-slate-100 text-slate-755 hover:bg-sky-50/20'
                      }`}
                    >
                      <span className="font-extrabold">{i + 1}. {termName}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Alert and next step */}
              {gameFeedback && (
                <div className={`p-4 rounded-2xl border-2 space-y-3 ${
                  gameFeedback.isCorrect 
                    ? 'bg-green-50/70 border-green-200 text-green-900' 
                    : 'bg-rose-50/70 border-rose-200 text-rose-900'
                }`}>
                  <div className="flex items-start gap-2 justify-end">
                    <p className="text-xs font-bold leading-relaxed">{gameFeedback.msg}</p>
                    {gameFeedback.isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-1 border-t border-black/5">
                    <button 
                      onClick={() => playSound(gameQuestions[gameQuestionIdx].correctTerm)}
                      className="bg-white hover:bg-slate-55 text-slate-700 border border-slate-200 font-bold p-1.5 px-3.5 rounded-xl text-[10px] shadow-sm"
                    >
                      🗣️ انطق الكلمة
                    </button>
                    <button
                      onClick={handleNextGameQuestion}
                      className="bg-sky-950 hover:bg-sky-900 text-white font-extrabold p-1.5 px-4 rounded-xl text-[10px] shadow"
                    >
                      السؤال التالي ◀
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      )}

    </div>
  );
}
