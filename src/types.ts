export interface Lesson {
  id: string;
  title: string;
  page?: number;
  content: string[]; // key scientific points
  didYouKnow?: string;
}

export interface QuizQuestion {
  id: string;
  type: 'select' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer: string; // 'true'/'false' or option text
  explanation: string;
}

export interface CurriculumUnit {
  id: string;
  number: number;
  title: string;
  description: string;
  learningObjectives: string[];
  lessons: Lesson[];
  quizzes: QuizQuestion[];
  badgeName: string;
  badgeIcon: string; // Lucide icon string
  color: string; // Tailwind color class prefix
}

export interface StudentProgress {
  selectedUnit: string;
  completedQuizzes: Record<string, number>; // unitId -> score out of 100
  badgesEarned: string[]; // list of badgeNames
  currentTab: 'explore' | 'simulation' | 'quiz' | 'progress' | 'glossary';
}
