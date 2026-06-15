import React, { useState, useRef } from 'react';
import { Award, Printer, Share2, CheckCircle, GraduationCap } from 'lucide-react';

interface CertificateProps {
  scoreCount: number; // number of quizzes completed with 100%
  completedUnits: string[]; // name of units completed
}

export default function Certificate({ scoreCount, completedUnits }: CertificateProps) {
  const [studentName, setStudentName] = useState<string>('');
  const [issued, setIssued] = useState<boolean>(false);
  const certRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white p-6 rounded-3xl border-2 border-sky-100/50 shadow-sm space-y-6 max-w-2xl mx-auto">
      
      {!issued ? (
        <div className="text-center space-y-4 py-4">
          <div className="w-16 h-16 bg-sky-100 text-[#0284C7] rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce border border-sky-200">
            <GraduationCap className="w-9 h-9" />
          </div>
          <h2 className="text-lg font-black text-sky-950">إصدار شهادة التفوق القومية - مادة العلوم</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            عند إكمال قراءة المنهج التفاعلي واجتياز اختبارات الوحدات السبع، يسر مركز المناهج والبحث التربوي (بخت الرضا) إصدار وسام التفوق والشهادة الفخرية لك تشجيعاً لمستقبلك الأكاديمي المجيد!
          </p>

          <div className="max-w-sm mx-auto space-y-3 pt-2 text-right">
            <label className="block text-xs font-black text-slate-700">اكتب اسمك الثلاثي باللغة العربية للشهادة:</label>
            <input 
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="مثال: أحمد عبد الله الرفاعي"
              className="w-full p-3 rounded-2xl border-2 border-sky-100 text-right text-sm font-bold focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] bg-slate-50"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-bold">
              <span>الوحدات المكتملة: {completedUnits.length} من 7</span>
              <span>الامتحانات المجتازة: {scoreCount}</span>
            </div>
          </div>

          <button
            onClick={() => setIssued(true)}
            disabled={!studentName.trim()}
            className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-black px-6 py-3 rounded-2xl disabled:bg-slate-200 transition shadow"
          >
            إصدار الشهادة الفخرية التفاعلية 🎖️
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          
          {/* Print preview Certificate frame */}
          <div 
            ref={certRef}
            className="border-8 border-double border-amber-600 p-6 rounded-2xl bg-gradient-to-br from-amber-50/55 to-orange-50/25 text-center relative overflow-hidden text-right leading-loose font-serif select-none shadow-inner"
            style={{ direction: 'rtl' }}
          >
            {/* Background filip watermarks */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <Award className="w-80 h-80 text-amber-500" />
            </div>

            {/* Official Header */}
            <div className="flex justify-between items-start border-b border-amber-200/50 pb-4 text-xs font-bold text-slate-700 leading-normal">
              <div className="text-right">
                <p>جمهورية السودان</p>
                <p>وزارة التربية والتعليم</p>
                <p>المركز القومي للمناهج والبحث التربوي</p>
              </div>
              
              <div className="text-center bg-amber-100/50 p-2 rounded-lg border border-amber-200/50 text-[10px] text-amber-900 flex flex-col items-center">
                <span className="text-lg">🎓</span>
                <span>بخت الرضا</span>
                <span>تأسس ١٩٣٤م</span>
              </div>
            </div>

            <div className="py-6 space-y-4">
              <h1 className="text-2xl font-extrabold text-amber-900 tracking-wide font-sans">
                شَهَادَةُ تَفَوُّقٍ أَكَادِيمِيٍّ
              </h1>
              
              <p className="text-xs text-slate-500 font-sans">
                يسر القائمين على إعداد منهج العلوم الطبيعية للصف الخامس الابتدائي أن يشهدوا بأن التلميذ النجيب:
              </p>

              {/* Student Name */}
              <h2 className="text-2xl font-extrabold text-[#1E293B] my-4 underline decoration-amber-600 decoration-double underline-offset-8 font-sans">
                {studentName}
              </h2>

              <p className="text-xs text-slate-650 max-w-lg mx-auto leading-relaxed">
                قد غيّب بجهده الدؤوب وطموحه المشرق واجتاز بنجاح منقطع النظير كافة المحتويات والمحاكاة التفاعلية لـ <span className="font-extrabold text-amber-800">موقع العلوم التفاعلي المطور</span> لجمهورية السودان (منهج الفحص والبحث التربوي بخت الرضا) لجميع الوحدات السبع المقررة.
              </p>

              {/* Badges Earned row */}
              <div className="flex justify-center gap-1.5 flex-wrap py-2">
                {completedUnits.map((u, i) => (
                  <span key={i} className="text-[10px] bg-white border border-amber-200/70 text-amber-900 font-bold px-2 py-0.5 rounded-full shadow-sm">
                    🏅 {u}
                  </span>
                ))}
              </div>
            </div>

            {/* Official Signatures and Seals */}
            <div className="flex justify-between items-end border-t border-amber-200/50 pt-4 text-xs font-bold text-slate-700 leading-normal">
              
              <div className="text-right">
                <p className="text-slate-405">توقيع:</p>
                <p className="font-sans text-amber-900 font-extrabold italic">لجنة المؤلفين والمعدين</p>
                <p className="text-[10px] text-slate-400">بخت الرضا - الدامر</p>
              </div>

              {/* Fake Seal Stamp */}
              <div className="w-18 h-18 rounded-full border-4 border-double border-red-500/80 text-red-500/85 flex flex-col items-center justify-center font-extrabold text-[8px] transform rotate-12 bg-white/70 select-none shadow">
                <span>جمهورية السودان</span>
                <span className="text-[11px] my-0.5">ختم الإجازة</span>
                <span>بخت الرضا</span>
              </div>

              <div className="text-left">
                <p className="text-slate-405">تاريخ الإصدار:</p>
                <p className="font-sans font-extrabold text-slate-800">{new Date().toLocaleDateString('ar-SD')}</p>
                <p className="text-[10px] text-sky-600">منصة حرة ذكية</p>
              </div>

            </div>

          </div>

          {/* Certificate Actions */}
          <div className="flex gap-3 justify-end text-xs font-bold">
            <button
              onClick={() => setIssued(false)}
              className="px-4 py-2 border-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-2xl transition"
            >
              تعديل الاسم أو البيانات ✏️
            </button>
            <button
              onClick={handlePrint}
              className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-2xl flex items-center gap-1.5 shadow transition"
            >
              <Printer className="w-4 h-4" />
              طباعة شهادة التخرّج المنهجية
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
