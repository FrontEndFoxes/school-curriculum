export interface Answer {
  answerText: string;
  isCorrect: string | boolean;
}

export interface Question {
  questionText: string;
  answerOptions: Answer[];
}

export interface Quiz {
  id: number;
  title: string;
  quiz: Question[];
}

export interface QuizData {
  title: string;
  complete: string;
  error: string;
  quizzes: Quiz[];
}