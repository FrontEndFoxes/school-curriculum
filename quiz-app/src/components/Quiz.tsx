import { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti'; // Import Confetti
import { MdNavigateNext, MdDone, MdHome } from 'react-icons/md'; // Import icons
import type { Question } from '../types/quiz';

interface QuizProps {
  questions: Question[];
  lang: string;
  title: string;
  completeText: string;
  errorText: string;
}

export default function Quiz({ questions, lang, title, completeText, errorText }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = questions[currentQuestion].answerOptions.find(
      opt => opt.answerText === answer
    )?.isCorrect === true || questions[currentQuestion].answerOptions.find(
      opt => opt.answerText === answer
    )?.isCorrect === "true";
    
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8"
      >
        {/* Show confetti if the user scores 100% */}
        {percentage === 100 && <Confetti />}
        <h2 className="text-2xl font-bold mb-4">{completeText}</h2>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-6xl font-bold text-indigo-600 mb-8"
        >
          {percentage}%
        </motion.div>
        <a
          href={`/`}
          className="bg-indigo-600 text-white w-20 m-auto px-6 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <MdHome size={24} />
        </a>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <h2 className="text-xl font-semibold mb-4">
        {questions[currentQuestion].questionText}
      </h2>
      <div className="space-y-4">
        {questions[currentQuestion].answerOptions.map((answer) => (
          <button
          key={answer.answerText}
          onClick={() => handleAnswerSelect(answer.answerText)}
          disabled={!!selectedAnswer} // Disable the button if an answer is already selected
          className={`w-full p-4 text-left rounded-lg transition-colors ${
            selectedAnswer === answer.answerText
              ? isCorrect
                ? 'bg-green-100 border-green-500'
                : 'bg-red-100 border-red-500'
              : 'bg-white hover:bg-gray-50'
          } border ${selectedAnswer ? 'cursor-not-allowed' : ''}`} // Add a "not-allowed" cursor when disabled
        >
          {answer.answerText}
        </button>
        ))}
      </div>
      {selectedAnswer && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleNext}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            {currentQuestion < questions.length - 1 ? (
              <>
                <MdNavigateNext size={24} /> {/* Icon for "Next Question" */}
              </>
            ) : (
              <>
                <MdDone size={24} /> {/* Icon for "Finish Quiz" */}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}