import React, { useState, useEffect } from 'react';
import { 
  HeartPulse, 
  Sprout, 
  Droplet, 
  Zap, 
  Sparkles, 
  Magnet, 
  GraduationCap, 
  BookOpen, 
  Lightbulb, 
  Award, 
  CheckCircle, 
  BookMarked,
  Volume2,
  Calendar,
  Compass,
  ArrowLeft,
  Crown,
  Home,
  HelpCircle
} from 'lucide-react';

import { SUDANESE_CURRICULUM } from './data/curriculum';
import { LESSON_QUIZZES_DATA } from './data/lessonQuizzes';
import { StudentProgress, QuizQuestion } from './types';

// Importing the interactive labs
import BreathingLab from './components/BreathingLab';
import PlantLab from './components/PlantLab';
import AnimalLab from './components/AnimalLab';
import WaterLab from './components/WaterLab';
import MotionLab from './components/MotionLab';
import ElectricityLab from './components/ElectricityLab';
import MagnetLab from './components/MagnetLab';
import Certificate from './components/Certificate';
import Glossary from './components/Glossary';

export default function App() {
  // Master state
  const [progress, setProgress] = useState<StudentProgress>({
    selectedUnit: 'unit1',
    completedQuizzes: {},
    badgesEarned: [],
    currentTab: 'explore'
  });

  const [studentName, setStudentName] = useState<string>('');
  const [tempStudentName, setTempStudentName] = useState<string>('');
  
  // Custom quiz states
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [correctAnswersList, setCorrectAnswersList] = useState<boolean[]>([]);

  // Navigation history & dynamic category-quiz states
  const [tabHistory, setTabHistory] = useState<string[]>(['explore']);
  const [quizMode, setQuizMode] = useState<'selection' | 'active'>('selection');
  const [quizType, setQuizType] = useState<'lesson' | 'unit' | 'curriculum'>('unit');
  const [activeQuizQuestions, setActiveQuizQuestions] = useState<QuizQuestion[]>([]);
  const [activeQuizTitle, setActiveQuizTitle] = useState<string>('');
  const [selectedLessonIdForQuiz, setSelectedLessonIdForQuiz] = useState<string>('');

  // Sound/Read-aloud synthesis state for children accessibility
  const [isReadingSpeaker, setIsReadingSpeaker] = useState<boolean>(false);

  // Load name or state if stored locally
  useEffect(() => {
    const savedName = localStorage.getItem('sudan_grade5_student_name');
    if (savedName) {
      setStudentName(savedName);
      setTempStudentName(savedName);
    }
  }, []);

  const saveStudentName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempStudentName.trim()) {
      setStudentName(tempStudentName);
      localStorage.setItem('sudan_grade5_student_name', tempStudentName);
    }
  };

  const selectedUnit = SUDANESE_CURRICULUM.find(u => u.id === progress.selectedUnit) || SUDANESE_CURRICULUM[0];

  const changeTabWithHistory = (nextTab: 'explore' | 'simulation' | 'quiz' | 'progress' | 'glossary') => {
    setTabHistory(prev => {
      if (prev[prev.length - 1] === nextTab) return prev;
      return [...prev, nextTab];
    });
    setProgress(prev => ({ ...prev, currentTab: nextTab }));
    
    // Reset quiz mode back to selection screen by default when entering the quiz tab
    if (nextTab === 'quiz') {
      setQuizMode('selection');
    }
  };

  const handleBackAction = () => {
    if (progress.currentTab === 'quiz' && quizMode === 'active') {
      setQuizMode('selection');
      setSelectedOpt(null);
      setQuizAnswered(false);
      setShowExplanation(false);
      setIsQuizCompleted(false);
      return;
    }
    
    if (tabHistory.length > 1) {
      const updatedHistory = [...tabHistory];
      updatedHistory.pop(); // remove current tab
      const lastTab = updatedHistory[updatedHistory.length - 1];
      setTabHistory(updatedHistory);
      setProgress(prev => ({ ...prev, currentTab: lastTab as any }));
    } else {
      setProgress(prev => ({ ...prev, currentTab: 'explore' }));
    }
  };

  const handleGoHomeAction = () => {
    setTabHistory(['explore']);
    setProgress(prev => ({ ...prev, currentTab: 'explore' }));
    setQuizMode('selection');
    setSelectedOpt(null);
    setQuizAnswered(false);
    setShowExplanation(false);
    setIsQuizCompleted(false);
  };

  const startLessonQuiz = (lessonId: string, lessonTitle: string) => {
    const questions = LESSON_QUIZZES_DATA[lessonId] || [];
    if (questions.length === 0) return;
    
    setActiveQuizQuestions(questions);
    setActiveQuizTitle(`اختبار الدرس: ${lessonTitle}`);
    setQuizType('lesson');
    setQuizMode('active');
    
    setCurrentQuizIdx(0);
    setQuizScore(0);
    setSelectedOpt(null);
    setQuizAnswered(false);
    setShowExplanation(false);
    setIsQuizCompleted(false);
    setCorrectAnswersList([]);
  };

  const startUnitQuiz = () => {
    const questions = selectedUnit.quizzes;
    setActiveQuizQuestions(questions);
    setActiveQuizTitle(`اختبار الوحدة الشامل: ${selectedUnit.title}`);
    setQuizType('unit');
    setQuizMode('active');
    
    setCurrentQuizIdx(0);
    setQuizScore(0);
    setSelectedOpt(null);
    setQuizAnswered(false);
    setShowExplanation(false);
    setIsQuizCompleted(false);
    setCorrectAnswersList([]);
  };

  const startCurriculumQuiz = () => {
    // Collect all unique unit & lesson questions
    const allQuestionsList: QuizQuestion[] = [];
    
    SUDANESE_CURRICULUM.forEach(u => {
      allQuestionsList.push(...u.quizzes);
    });
    
    Object.values(LESSON_QUIZZES_DATA).forEach(list => {
      allQuestionsList.push(...list);
    });
    
    // Pick 10 random questions
    const shuffled = [...allQuestionsList].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 10);
    
    setActiveQuizQuestions(selectedQuestions);
    setActiveQuizTitle('الامتحان المنهجي الشامل لكتاب العلوم (بخت الرضا)');
    setQuizType('curriculum');
    setQuizMode('active');
    
    setCurrentQuizIdx(0);
    setQuizScore(0);
    setSelectedOpt(null);
    setQuizAnswered(false);
    setShowExplanation(false);
    setIsQuizCompleted(false);
    setCorrectAnswersList([]);
  };

  const handleUnitSelect = (unitId: string) => {
    setProgress(prev => ({
      ...prev,
      selectedUnit: unitId,
      currentTab: 'explore'
    }));
    setTabHistory(['explore']);
    setQuizMode('selection');
    
    setCurrentQuizIdx(0);
    setQuizScore(0);
    setSelectedOpt(null);
    setQuizAnswered(false);
    setShowExplanation(false);
    setIsQuizCompleted(false);
    setCorrectAnswersList([]);
  };

  // Quiz Handling
  const currentQuiz: QuizQuestion = activeQuizQuestions.length > 0
    ? activeQuizQuestions[currentQuizIdx]
    : selectedUnit.quizzes[currentQuizIdx];

  const submitQuizAnswer = (answer: string) => {
    if (quizAnswered) return;
    
    setSelectedOpt(answer);
    setQuizAnswered(true);
    setShowExplanation(true);

    const correct = answer === currentQuiz.correctAnswer;
    setCorrectAnswersList(prev => [...prev, correct]);

    if (correct) {
      setQuizScore(prev => prev + 1);
    }
  };

  const nextQuizQuestion = () => {
    setSelectedOpt(null);
    setQuizAnswered(false);
    setShowExplanation(false);

    const questionsCount = activeQuizQuestions.length > 0 ? activeQuizQuestions.length : selectedUnit.quizzes.length;

    if (currentQuizIdx < questionsCount - 1) {
      setCurrentQuizIdx(prev => prev + 1);
    } else {
      // Quiz finished, save score
      setIsQuizCompleted(true);
      const percentage = Math.round((quizScore / questionsCount) * 100);
      
      setProgress(prev => {
        const updatedQuizzes = { ...prev.completedQuizzes };
        const updatedBadges = [...prev.badgesEarned];
        
        if (quizType === 'unit') {
          updatedQuizzes[selectedUnit.id] = percentage;
          // Award unit badge if score is >= 75%
          if (percentage >= 75 && !updatedBadges.includes(selectedUnit.badgeName)) {
            updatedBadges.push(selectedUnit.badgeName);
          }
        } else if (quizType === 'lesson') {
          // Award custom lesson perfect-score badge!
          if (percentage === 100 && !updatedBadges.includes('تلميذ بخت الرضا المثالي')) {
            updatedBadges.push('تلميذ بخت الرضا المثالي');
          }
        } else if (quizType === 'curriculum') {
          // Award general curriculum medal
          if (percentage >= 80 && !updatedBadges.includes('مكتشف السودان الكبير')) {
            updatedBadges.push('مكتشف السودان الكبير');
          }
        }

        return {
          ...prev,
          completedQuizzes: updatedQuizzes,
          badgesEarned: updatedBadges
        };
      });
    }
  };

  const restartQuiz = () => {
    setCurrentQuizIdx(0);
    setQuizScore(0);
    setSelectedOpt(null);
    setQuizAnswered(false);
    setShowExplanation(false);
    setIsQuizCompleted(false);
    setCorrectAnswersList([]);
  };

  // Text-To-Speech implementation read sciences to student
  const speakContentSpeech = (textSegments: string[]) => {
    if ('speechSynthesis' in window) {
      if (isReadingSpeaker) {
        window.speechSynthesis.cancel();
        setIsReadingSpeaker(false);
        return;
      }
      
      const fullText = textSegments.join(' . ');
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.lang = 'ar-SA'; // Arabic voice matching Sudan/Saudi standards
      utterance.rate = 0.85; // slightly slower for younger kids
      
      utterance.onend = () => {
        setIsReadingSpeaker(false);
      };
      
      setIsReadingSpeaker(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('خدمة قراءة النصوص الصوتية غير مدعومة في متصفحك حالياً.');
    }
  };

  // Helper to map badge icons statically
  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse': return <HeartPulse className="w-5 h-5" />;
      case 'Sprout': return <Sprout className="w-5 h-5" />;
      case 'Droplet': return <Droplet className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Magnet': return <Magnet className="w-5 h-5" />;
      default: return <Award className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F9FF] flex flex-col font-sans select-none selection:bg-sky-100 selection:text-sky-950">
      
      {/* Prime Ministry Sudan header strip */}
      <div className="bg-sky-900 text-sky-100 py-1.5 px-4 text-xs font-bold flex justify-between items-center shadow-inner border-b border-sky-850">
        <div className="flex items-center gap-1.5 font-mono">
          <span>{new Date().toLocaleDateString('ar-SD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <Calendar className="w-3.5 h-3.5 opacity-80" />
        </div>
        <div className="flex items-center gap-2">
          <span>منهج المناهج والبحث التربوي القومي (بخت الرضا، الدامر)</span>
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
        </div>
      </div>

      {/* Main Educational Navbar */}
      <header className="bg-[#0284C7] py-4 px-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-md text-white border-b border-sky-600">
        
        <div className="flex items-center gap-3">
          {/* Logo element representing science lab flask / book koush */}
          <div className="w-12 h-12 bg-white text-[#0284C7] rounded-full flex items-center justify-center font-bold text-xl shadow-inner border border-sky-50 relative">
            🧪
            <span className="absolute -bottom-1 -right-1 text-xs">🔬</span>
          </div>
          <div className="text-right">
            <h1 className="text-lg font-black text-white tracking-wide">العلوم الطبيعية - الصف الخامس الابتدائي</h1>
            <span className="text-xs font-bold text-sky-100">بوابة كوش وتلاميذ السودان التفاعلية للتقويم والتجارب</span>
          </div>
        </div>

        {/* Student login block */}
        <div className="flex items-center gap-3 bg-white/20 px-4 py-2 rounded-2xl border border-white/30 text-white shadow-sm">
          {studentName ? (
            <div className="text-right">
              <span className="text-[10px] text-sky-100/90 font-bold block">مرحباً بكل تلميذنا:</span>
              <span className="text-sm font-extrabold text-white flex items-center gap-1">
                {studentName} 🎓
              </span>
            </div>
          ) : (
            <form onSubmit={saveStudentName} className="flex gap-2 items-center">
              <input 
                type="text" 
                placeholder="اكتب اسم التلميذ هنا لشهادتنا..." 
                value={tempStudentName}
                onChange={(e) => setTempStudentName(e.target.value)}
                className="p-1 px-3 bg-white text-xs font-bold border-0 rounded-lg text-right text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-300 w-44 shadow-inner"
              />
              <button 
                type="submit" 
                className="bg-yellow-400 hover:bg-yellow-500 text-sky-950 text-[11px] font-black px-3 py-1.5 rounded-lg transition-all"
              >
                تأكيد
              </button>
            </form>
          )}
        </div>
      </header>

      {/* Main viewport Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Side: Bento-grid Unit selector */}
        <section className="lg:col-span-1 space-y-4">
          <div className="bg-white p-5 rounded-3xl border-2 border-sky-100/80 shadow-md space-y-4 text-right">
            <h2 className="text-lg font-black text-sky-950 mb-1 px-1">وحدات كتاب العلوم</h2>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {SUDANESE_CURRICULUM.map(unit => {
                const isSelected = unit.id === progress.selectedUnit;
                const score = progress.completedQuizzes[unit.id];
                const badgeEarned = progress.badgesEarned.includes(unit.badgeName);

                return (
                  <button
                    key={unit.id}
                    onClick={() => handleUnitSelect(unit.id)}
                    className={`w-full text-right p-4 rounded-2xl border-2 transition-all flex items-center gap-3 relative shadow-sm ${
                      isSelected 
                        ? 'bg-white border-[#0284C7] text-slate-800 transform -translate-x-1' 
                        : 'bg-white border-transparent hover:border-sky-200 text-slate-650 opacity-85 hover:opacity-100'
                    }`}
                  >
                    {/* Badge Icon container */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                      isSelected ? 'bg-sky-100 text-[#0284C7]' : 'bg-slate-50 text-slate-500'
                    }`}>
                      {getBadgeIcon(unit.badgeIcon)}
                    </div>
                    
                    <div className="flex-1 min-w-0 pr-1">
                      <p className={`text-[10px] font-bold ${isSelected ? 'text-sky-600' : 'text-slate-400'}`}>
                        الوحدة {unit.number}
                      </p>
                      <h4 className="font-extrabold text-xs text-slate-800 truncate">{unit.title}</h4>
                      {score !== undefined && (
                        <p className="text-[9px] text-[#0284C7] font-bold mt-0.5">درجة الاختبار: {score}%</p>
                      )}
                    </div>

                    {badgeEarned && (
                      <span className="text-xs bg-yellow-100 rounded-full p-0.5 shadow-sm shrink-0">🏆</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Badges case */}
          <div className="bg-white p-4 rounded-3xl border border-sky-100 shadow-sm space-y-3 text-right">
            <h4 className="text-xs font-black text-sky-950">أوسمة التفوق المكنة:</h4>
            {progress.badgesEarned.length > 0 ? (
              <div className="flex flex-wrap gap-2 justify-end">
                {progress.badgesEarned.map(badge => (
                  <span key={badge} className="bg-amber-50 text-amber-900 border border-amber-200 font-bold rounded-xl text-[10px] p-2 flex items-center gap-1 shadow-sm">
                    🏆 {badge}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 font-bold">حل اختبارات الوحدات السبع لحصد أوسمة بخت الرضا!</p>
            )}
          </div>

          {/* Progress Summary */}
          <div className="bg-sky-900 text-white p-5 rounded-3xl space-y-2.5 shadow-md text-right animate-pulse">
            <p className="text-[11px] opacity-85 font-black">إنجاز المنهج الكلي</p>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-400 rounded-full transition-all duration-500" 
                style={{ width: `${Math.max(5, Math.round((Object.keys(progress.completedQuizzes).length / 7) * 100))}%` }}
              ></div>
            </div>
            <p className="text-xs font-bold">تم إكمال {Math.round((Object.keys(progress.completedQuizzes).length / 7) * 100)}% من دروس الفحص بنجاح</p>
          </div>
        </section>

        {/* Right Side: Tab panel and Scientific lab arena */}
        <section className="lg:col-span-3 bg-white rounded-[40px] shadow-xl border-4 border-sky-100 p-6 md:p-8 flex flex-col relative overflow-hidden space-y-6">
          
          {/* شريط التنقل الذكي والرجوع (Smart Navigation Bar) */}
          <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-2xl border border-slate-200/60 text-xs font-bold w-full select-none">
            <button 
              onClick={handleGoHomeAction}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 transition shadow-sm border border-slate-200"
              title="الرجوع للصفحة الرئيسية (تصفح الدروس)"
            >
              <Home className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>الرئيسية 🏠</span>
            </button>

            <span className="text-[10px] sm:text-xs text-sky-950 font-black tracking-wide pb-0.5">
              مساعد تلميذ السودان الذكي 🔬
            </span>

            <button 
              onClick={handleBackAction}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0284C7] hover:bg-sky-600 text-white transition shadow-sm"
              title="الرجوع للخطوة السابقة"
            >
              <span>الرجوع للخلف ◀</span>
            </button>
          </div>

          {/* Header banner displaying selected Unit characteristics */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4 pb-6 border-b border-sky-100 text-right w-full">
            <div className="space-y-1 flex-1">
              <span className="bg-sky-500 text-white px-3 py-1 rounded-full text-[11px] font-black mb-2 inline-block">الوحدة رقم {selectedUnit.number} {selectedUnit.badgeName}</span>
              <h2 className="text-3xl font-black text-sky-950 leading-tight">{selectedUnit.title}</h2>
              <p className="text-slate-500 text-xs md:text-sm max-w-xl leading-relaxed">{selectedUnit.description}</p>
            </div>
            
            {/* Quick action buttons / Tab controllers */}
            <div className="flex flex-wrap gap-1 bg-sky-50 p-1 rounded-2xl border border-sky-100 text-xs font-bold shrink-0 self-center">
              <button 
                onClick={() => changeTabWithHistory('explore')}
                className={`px-3 py-2 rounded-xl transition-all ${
                  progress.currentTab === 'explore' ? 'bg-[#0284C7] text-[#FFFFFF] shadow-md' : 'text-sky-800 hover:bg-sky-100/40'
                }`}
              >
                🔎 تصفح المنهج
              </button>
              <button 
                onClick={() => changeTabWithHistory('simulation')}
                className={`px-3 py-2 rounded-xl transition-all ${
                  progress.currentTab === 'simulation' ? 'bg-[#0284C7] text-[#FFFFFF] shadow-md' : 'text-[#0284C7] hover:bg-sky-100/40'
                }`}
              >
                🧪 مختبر تفاعلي
              </button>
              <button 
                onClick={() => changeTabWithHistory('quiz')}
                className={`px-3 py-2 rounded-xl transition-all ${
                  progress.currentTab === 'quiz' ? 'bg-[#0284C7] text-[#FFFFFF] shadow-md' : 'text-sky-850 hover:bg-sky-100/40'
                }`}
              >
                📝 اختبار التقييم
              </button>
              <button 
                onClick={() => changeTabWithHistory('progress')}
                className={`px-3 py-2 rounded-xl transition-all ${
                  progress.currentTab === 'progress' ? 'bg-[#0284C7] text-[#FFFFFF] shadow-md' : 'text-sky-850 hover:bg-sky-100/40'
                }`}
              >
                🎖️ شهادتي الفخرية
              </button>
              <button 
                onClick={() => changeTabWithHistory('glossary')}
                className={`px-3 py-2 rounded-xl transition-all ${
                  progress.currentTab === 'glossary' ? 'bg-[#0284C7] text-[#FFFFFF] shadow-md' : 'text-sky-850 hover:bg-sky-100/40'
                }`}
              >
                📖 قاموس المصطلحات
              </button>
            </div>
          </div>

          {/* TAB 1: Explore Lesson summaries and Read aloud */}
          {progress.currentTab === 'explore' && (
            <div className="space-y-6">
              
              <div className="space-y-6">
                
                {/* Audio read option */}
                <div className="flex flex-col sm:flex-row justify-between items-center bg-sky-50/50 border border-sky-100 p-4 rounded-3xl gap-4">
                  <button 
                    onClick={() => {
                      const lessonsTexts = selectedUnit.lessons.flatMap(l => [l.title, ...l.content]);
                      speakContentSpeech(lessonsTexts);
                    }}
                    className={`flex items-center gap-2 text-xs font-bold py-2 px-4 rounded-2xl border transition shadow-sm ${
                      isReadingSpeaker 
                        ? 'bg-rose-50 text-rose-700 border-rose-200' 
                        : 'bg-white text-sky-800 border-sky-150 hover:bg-sky-50'
                    }`}
                  >
                    <Volume2 className="w-4 h-4 text-sky-500" />
                    <span>{isReadingSpeaker ? 'إيقاف الصوت ⏹️' : 'شغل المساعد الصوتي لقراءة المنهج 🔊'}</span>
                  </button>
                  <h3 className="text-sm font-black text-sky-950">شرح وتلخيص الدروس القومية المقررة</h3>
                </div>

                {/* Listing lessons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedUnit.lessons.map(lesson => (
                    <div key={lesson.id} className="bg-white p-5 rounded-3xl border-2 border-sky-50/70 shadow-sm text-right space-y-3 relative">
                      <span className="absolute top-3 left-3 text-[9px] font-black text-sky-600 bg-sky-50 border border-sky-100 py-0.5 px-2 rounded-full">
                        كتاب صفحة {lesson.page}
                      </span>
                      <h4 className="text-base font-black text-sky-900">{lesson.title}</h4>
                      
                      {/* Interactive facts checklist */}
                      <ul className="space-y-2 text-xs text-slate-600 leading-relaxed list-inside">
                        {lesson.content.map((point, index) => (
                          <li key={index} className="flex gap-1.5 items-start justify-end">
                            <span className="pt-0.5">{point}</span>
                            <span className="text-sky-600 font-bold shrink-0">•</span>
                          </li>
                        ))}
                      </ul>

                      {/* fun trivia didYouKnow bubble */}
                      {lesson.didYouKnow && (
                        <div className="bg-amber-50 rounded-2xl border border-amber-200/60 p-4 text-amber-950 text-xs space-y-1 mt-4">
                          <span className="font-extrabold flex items-center justify-end gap-1.5 text-amber-800">
                            <span>جواهر معلومات مدهشة!</span>
                            <Lightbulb className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                          </span>
                          <p className="leading-relaxed text-[11px] font-medium">{lesson.didYouKnow}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Summary footer objectives */}
                <div className="bg-sky-50/50 p-5 rounded-3xl border border-sky-100 text-right space-y-2">
                  <span className="text-xs font-black text-sky-950 block">أهداف التعلم الخاصة بهذه الوحدة:</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-600">
                    {selectedUnit.learningObjectives.map((obj, i) => (
                      <p key={i} className="flex justify-end gap-1.5">
                        <span>{obj}</span>
                        <span className="text-[#0284C7] font-bold">✓</span>
                      </p>
                    ))}
                  </div>
                </div>

              </div>

              {/* Instant quiz shortcut invitation */}
              <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-5 rounded-3xl flex flex-col sm:flex-row justify-between items-center text-xs font-bold text-white shadow-md gap-4">
                <button 
                  onClick={() => setProgress(prev => ({ ...prev, currentTab: 'simulation' }))}
                  className="bg-yellow-400 hover:bg-yellow-500 text-sky-900 font-black px-5 py-3 rounded-2xl shadow-lg transform hover:-translate-y-0.5 transition-all w-full sm:w-auto"
                >
                  تشغيل المختبر التفاعلي 🔬 ◀
                </button>
                <p className="font-extrabold">هل كملت المطالعة وتصفح الشروحات؟ جرِّب المعمل والمحاكاة التفاعلية الآن!</p>
              </div>

            </div>
          )}

          {/* TAB 2: Dynamic Lab simulation loading switcher */}
          {progress.currentTab === 'simulation' && (
            <div className="space-y-4">
              {progress.selectedUnit === 'unit1' && <BreathingLab />}
              {progress.selectedUnit === 'unit2' && <PlantLab />}
              {progress.selectedUnit === 'unit3' && <AnimalLab />}
              {progress.selectedUnit === 'unit4' && <WaterLab />}
              {progress.selectedUnit === 'unit5' && <MotionLab />}
              {progress.selectedUnit === 'unit6' && <ElectricityLab />}
              {progress.selectedUnit === 'unit7' && <MagnetLab />}
            </div>
          )}

          {/* TAB 3: Interactive Unit & Lesson & Syllabus Exams (Quizzes) */}
          {progress.currentTab === 'quiz' && (
            <div className="space-y-6 text-right">
              
              {quizMode === 'selection' ? (
                // 1. SELECTIVE QUIZ HUB SELECTOR VIEW
                <div className="space-y-6">
                  <div className="border-b border-sky-100 pb-3 text-center">
                    <h3 className="text-xl font-black text-sky-950 flex items-center justify-center gap-1.5">
                      <span>مجمع الامتحانات والتقويم العلمي</span>
                      <HelpCircle className="w-5 h-5 text-sky-600 animate-pulse" />
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      اختر نوع الفحص والتقييم المناسب لمهاراتك لتبدأ التحدي وحصد أوسمة التفوق لوزارة التربية السودانية
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                    
                    {/* Tier 1: Lesson Quizzes (اختبارات لكل درس) */}
                    <div className="bg-white p-5 rounded-3xl border-2 border-amber-100 hover:border-amber-400 shadow-sm transition flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl">
                          📚
                        </div>
                        <h4 className="font-extrabold text-sm text-slate-800">اختبارات لكل درس</h4>
                        <p className="text-[11px] text-slate-400 leading-normal">
                          حل تمارين سريعة مخصصة لكل درس منفرداً لتفتيش فهمك المباشر للحقائق والمفاهيم المقررة بالكتاب المدرسي.
                        </p>
                      </div>

                      <div className="space-y-3 pt-2">
                        <label className="text-[10px] font-bold text-amber-800 block">اختر الدرس المطلوب تحديه:</label>
                        <select
                          value={selectedLessonIdForQuiz}
                          onChange={(e) => setSelectedLessonIdForQuiz(e.target.value)}
                          className="w-full p-2.5 rounded-xl text-xs font-bold bg-amber-50/50 text-slate-800 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-inner"
                        >
                          <option value="">-- اختر الدرس هنا --</option>
                          {selectedUnit.lessons.map(lesson => (
                            <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
                          ))}
                        </select>
                        <button
                          disabled={!selectedLessonIdForQuiz}
                          onClick={() => {
                            const l = selectedUnit.lessons.find(lesson => lesson.id === selectedLessonIdForQuiz);
                            if (l) startLessonQuiz(l.id, l.title);
                          }}
                          className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-extrabold py-3 rounded-2xl text-xs transition shadow-md"
                        >
                          ابدأ اختبار الدرس ◀
                        </button>
                      </div>
                    </div>

                    {/* Tier 2: Unit Quizzes (اختبارات لكل وحدة) */}
                    <div className="bg-white p-5 rounded-3xl border-2 border-sky-100 hover:border-[#0284C7] shadow-sm transition flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center text-xl">
                          🏢
                        </div>
                        <h4 className="font-extrabold text-sm text-slate-800">اختبارات لكل وحدة</h4>
                        <p className="text-[11px] text-slate-400 leading-normal">
                          دبليو الامتحان التقييمي العام لوحدتك الحالية: <span className="font-bold text-sky-700"> {selectedUnit.title} </span>. يشمل 4 أسئلة تفتيشية مكثفة.
                        </p>
                      </div>

                      <div className="pt-4">
                        <div className="bg-sky-50/50 p-3 rounded-2xl text-center border border-sky-100 text-[10px] font-bold text-sky-850 mb-3">
                          الوسام المستهدف: {selectedUnit.badgeName} 🏆
                        </div>
                        <button
                          onClick={startUnitQuiz}
                          className="w-full bg-[#0284C7] hover:bg-sky-600 text-white font-extrabold py-3 rounded-2xl text-xs transition shadow-md"
                        >
                          ابدأ اختبار الوحدة الحالي ◀
                        </button>
                      </div>
                    </div>

                    {/* Tier 3: Curriculum Quizzes (اختبارات لكامل المنهج) */}
                    <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-5 rounded-3xl border-2 border-violet-100 hover:border-violet-400 shadow-sm transition flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center text-xl">
                          🌍
                        </div>
                        <h4 className="font-extrabold text-sm text-slate-800">اختبارات لكامل المنهج</h4>
                        <p className="text-[11px] text-slate-400 leading-normal">
                          التحدي الكبير! امتحان عشوائي شامل يسحب 10 أسئلة من كافة الوحدات السبع وجميع الدروس. يختبر كمال معرفتك بالعلوم العامة.
                        </p>
                      </div>

                      <div className="pt-4">
                        <div className="bg-violet-100/65 p-3 rounded-2xl text-center border border-violet-200 text-[10px] font-bold text-violet-900 mb-3">
                          ميدالية الشرف: مكتشف السودان الكبير 🎖️
                        </div>
                        <button
                          onClick={startCurriculumQuiz}
                          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-extrabold py-3 rounded-2xl text-xs transition shadow-md"
                        >
                          ابدأ الامتحان المنهجي الشامل 🔥
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ) : (
                // 2. ACTIVE EXAM PLAYING VIEWER
                <div>
                  <div className="border-b border-sky-100 pb-3 flex justify-between items-center mb-6">
                    <span className="text-xs font-bold text-slate-400">عدد أسئلة الامتحان: {activeQuizQuestions.length}</span>
                    <h3 className="text-base font-black text-sky-950">{activeQuizTitle}</h3>
                  </div>

                  {!isQuizCompleted ? (
                    <div className="space-y-6">
                      
                      {/* Progress tracker dots */}
                      <div className="flex justify-end gap-1.5 flex-wrap">
                        {activeQuizQuestions.map((_, i) => (
                          <span 
                            key={i} 
                            className={`w-3.5 h-3.5 rounded-full border transition-all ${
                              i === currentQuizIdx
                                ? 'bg-sky-500 border-sky-600 scale-110 ring-2 ring-sky-200'
                                : i < currentQuizIdx
                                  ? correctAnswersList[i] ? 'bg-green-150 border-green-400' : 'bg-rose-150 border-rose-400'
                                  : 'bg-slate-200 border-slate-300'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Question Card */}
                      <div className="bg-sky-50/50 p-6 rounded-3xl border border-sky-100 space-y-4 text-right">
                        <span className="bg-sky-150 text-sky-800 text-[10px] px-2.5 py-0.5 rounded-full font-black inline-block border border-sky-200">
                          سؤال رقم {currentQuizIdx + 1} من {activeQuizQuestions.length}
                        </span>
                        <h4 className="text-base font-extrabold text-[#1E293B] leading-relaxed">
                          {currentQuiz.question}
                        </h4>

                        {/* Options list swapper */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-right">
                          {currentQuiz.type === 'true-false' ? (
                            <>
                              <button
                                onClick={() => submitQuizAnswer('true')}
                                disabled={quizAnswered}
                                className={`p-4 rounded-2xl border-2 text-right font-extrabold transition shadow-sm ${
                                  selectedOpt === 'true'
                                    ? currentQuiz.correctAnswer === 'true' 
                                      ? 'bg-green-50 border-green-400 text-green-905' 
                                      : 'bg-rose-50 border-rose-400 text-rose-905'
                                    : 'bg-white hover:border-sky-305 border-slate-100 text-slate-850 hover:bg-sky-50/20'
                                }`}
                              >
                                ✔️ صحيح (صواب)
                              </button>
                              <button
                                onClick={() => submitQuizAnswer('false')}
                                disabled={quizAnswered}
                                className={`p-4 rounded-2xl border-2 text-right font-extrabold transition shadow-sm ${
                                  selectedOpt === 'false'
                                    ? currentQuiz.correctAnswer === 'false' 
                                      ? 'bg-green-50 border-green-400 text-green-905' 
                                      : 'bg-rose-50 border-rose-400 text-rose-905'
                                    : 'bg-white hover:border-sky-305 border-slate-100 text-slate-850 hover:bg-sky-50/20'
                                }`}
                              >
                                ✖️ خطأ (غير صواب)
                              </button>
                            </>
                          ) : (
                            <>
                              {currentQuiz.options?.map((opt) => (
                                <button
                                  key={opt}
                                  onClick={() => submitQuizAnswer(opt)}
                                  disabled={quizAnswered}
                                  className={`p-4 rounded-2xl border-2 text-right font-extrabold transition text-xs shadow-sm ${
                                    selectedOpt === opt
                                      ? currentQuiz.correctAnswer === opt 
                                        ? 'bg-green-50 border-green-400 text-green-905' 
                                        : 'bg-rose-50 border-rose-400 text-rose-905'
                                      : 'bg-white hover:border-sky-305 border-slate-100 text-slate-850 hover:bg-sky-50/20'
                                  }`}
                                >
                                  • {opt}
                                </button>
                              ))}
                            </>
                          )}
                        </div>
                      </div>

                      {/* Immediate Explanation from Textbook */}
                      {showExplanation && (
                        <div className={`p-5 rounded-2xl border-2 text-xs space-y-1.5 leading-normal text-right ${
                          selectedOpt === currentQuiz.correctAnswer
                            ? 'bg-green-50/70 border-green-200 text-green-900'
                            : 'bg-rose-50/70 border-rose-200 text-rose-900'
                        }`}>
                          <p className="font-extrabold text-sm">
                            {selectedOpt === currentQuiz.correctAnswer ? '🎉 إجابة صحيحة هنيئاً!' : '⚠️ إجابة غير دقيقة'}
                          </p>
                          <p>{currentQuiz.explanation}</p>
                          
                          <button
                            onClick={nextQuizQuestion}
                            className="bg-sky-950 hover:bg-sky-900 text-white font-extrabold py-2 px-5 rounded-xl mt-3 text-xs shadow transition-all duration-150"
                          >
                            {currentQuizIdx < activeQuizQuestions.length - 1 ? 'السؤال التالي ◀' : 'الحصول على النتيجة ◀'}
                          </button>
                        </div>
                      )}

                    </div>
                  ) : (
                    <div className="text-center py-6 space-y-5 max-w-sm mx-auto select-none">
                      <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-sm border border-yellow-200">
                        🏆
                      </div>
                      <h4 className="text-lg font-black text-slate-850">نهارك مبروك يا متفوق!</h4>
                      <p className="text-xs text-slate-500">
                        أكملت هذا التقويم بنجاح. جهودك في قراءة ومطالعة العلوم مميزة!
                      </p>
                      
                      <div className="bg-sky-50 p-4 rounded-2xl border border-sky-100 text-xs font-bold text-slate-755 space-y-1">
                        <span>عدد الإجابات الصائبة: {quizScore} من {activeQuizQuestions.length}</span>
                        <span className="block text-[#0284C7] text-sm font-black">النسبة المكتسبة: {Math.round((quizScore / activeQuizQuestions.length) * 100)}%</span>
                      </div>

                      {quizType === 'unit' && (
                        Math.round((quizScore / activeQuizQuestions.length) * 100) >= 75 ? (
                          <div className="bg-green-50 text-green-800 p-3.5 rounded-xl text-[10px] font-bold border border-green-200">
                            ثمن جهودك! لقد ربحت وسام تفوق هذه الوحدة ({selectedUnit.badgeName}) وأضيف لملفك الأكاديمي الشتوي.
                          </div>
                        ) : (
                          <div className="bg-rose-50 text-rose-800 p-3.5 rounded-xl text-[10px] font-bold border border-rose-200">
                            يتطلب وسام بخت الرضا نسبة 75% فأكثر. أعد المحاولة واستمتع بالقراءة مجدداً!
                          </div>
                        )
                      )}

                      {quizType === 'lesson' && (
                        Math.round((quizScore / activeQuizQuestions.length) * 100) === 100 ? (
                          <div className="bg-green-50 text-green-800 p-3.5 rounded-xl text-[10px] font-bold border border-green-200">
                            يا لها من علامة كاملة ترفع الرأس! تم حصد وسام (تلميذ بخت الرضا المثالي) 🎖️ لملفك الشخصي.
                          </div>
                        ) : (
                          <div className="bg-amber-50 text-amber-800 p-3.5 rounded-xl text-[10px] font-bold border border-amber-200">
                            إنجاز متميز! للظفر بوسام الدرس المثالي، تدرب لتصيب العلامة كاملة 100%. واصل الطموح!
                          </div>
                        )
                      )}

                      {quizType === 'curriculum' && (
                        Math.round((quizScore / activeQuizQuestions.length) * 100) >= 80 ? (
                          <div className="bg-violet-50 text-violet-800 p-3.5 rounded-xl text-[10px] font-bold border border-violet-200">
                            فوق التوقعات! اجتزت الامتحان العام للكتاب المدرسي، وتم طبع الميدالية الفخرية الذهبية (مكتشف السودان الكبير) 🏅 بملفك.
                          </div>
                        ) : (
                          <div className="bg-rose-50 text-rose-800 p-3.5 rounded-xl text-[10px] font-bold border border-rose-200">
                            يتطلب وسام مكتشف السودان الكبير الشامل نسبة 80% فأكثر في الامتحان المنهجي الشامل. أعد الكرة مراراً لتتعلم أكثر!
                          </div>
                        )
                      )}

                      <div className="flex gap-2.5 pt-2">
                        <button
                          onClick={restartQuiz}
                          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold py-2.5 rounded-xl text-xs transition-all duration-150"
                        >
                          إعادة الامتحان 🔄
                        </button>
                        <button
                          onClick={() => {
                            setQuizMode('selection');
                            setSelectedOpt(null);
                            setQuizAnswered(false);
                            setShowExplanation(false);
                            setIsQuizCompleted(false);
                          }}
                          className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-extrabold py-2.5 rounded-xl text-xs shadow transition-all duration-150"
                        >
                          مجمع الامتحانات 📖
                        </button>
                      </div>

                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* TAB 4: My Progress Dashboard & Graduation Medal */}
          {progress.currentTab === 'progress' && (
            <div className="space-y-6">
              
              {/* Stars tally stats widget */}
              <div className="bg-sky-50/40 p-6 rounded-3xl border-2 border-sky-100/50 relative overflow-hidden flex flex-col md:flex-row justify-between items-center text-right leading-loose">
                <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full pointer-events-none transform -translate-x-12 -translate-y-12" />
                
                <div className="text-right space-y-1.5 flex-1 w-full">
                  <h3 className="text-base font-extrabold text-sky-950 flex items-center justify-end gap-1.5">
                    <span>لوحة التفوق والإنجازات العامة</span>
                    <Crown className="w-5 h-5 text-amber-500" />
                  </h3>
                  <p className="text-xs text-slate-500 max-w-lg leading-relaxed">
                    السودان أمانة علم في أعناق تلاميذه الميامين. تتبع تقدمك وحل امتحانات بخت الرضا لحصد الأوسمة العلمية وتأهيل اسمك لشهادة الشرف الفخرية من المؤلفين.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                    <div className="bg-white p-3 rounded-2xl border border-sky-100 text-center shadow-sm">
                      <span className="text-[10px] text-slate-400 block font-bold">الأوسمة المكتسبة:</span>
                      <span className="text-lg font-extrabold text-amber-600">{progress.badgesEarned.length} من 7</span>
                    </div>
                    <div className="bg-white p-3 rounded-2xl border border-sky-100 text-center shadow-sm">
                      <span className="text-[10px] text-slate-400 block font-bold">نسبة القراءة والمطالعة:</span>
                      <span className="text-lg font-extrabold text-[#0284C7]">
                        {Math.round((Object.keys(progress.completedQuizzes).length / 7) * 100)}%
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded-2xl border border-sky-100 text-center shadow-sm col-span-2 md:col-span-1">
                      <span className="text-[10px] text-slate-400 block font-bold">التلميذ:</span>
                      <span className="text-xs font-black text-slate-800 tracking-wide truncate max-w-36 block mx-auto">
                        {studentName || 'لم يُحدد الاسم بعد'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificate Widget Card */}
              <Certificate 
                scoreCount={Object.keys(progress.completedQuizzes).length} 
                completedUnits={progress.badgesEarned} 
              />

            </div>
          )}

          {/* TAB 5: Scientific Glossary of Hard Terms */}
          {progress.currentTab === 'glossary' && (
            <Glossary />
          )}

        </section>

      </main>

      {/* Portal Footer */}
      <footer className="h-auto py-4 bg-slate-100 mt-12 px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 shrink-0 border-t border-slate-200/80 gap-2">
        <p>© {new Date().getFullYear()} م مـركز تطوير المناهج - وزارة التربية والتعليم السودانية (بخت الرضا)</p>
        <div className="flex gap-4">
          <span className="flex items-center gap-1">المستخدم: تلميذ مجتهد <BookMarked className="w-3.5 h-3.5 text-sky-600" /></span>
          <span className="font-bold text-sky-600 italic">متصل الآن بالمنصة تفاعلياً ●</span>
        </div>
      </footer>

    </div>
  );
}
