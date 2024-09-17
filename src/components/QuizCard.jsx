import { useState } from 'react';

export default function QuizCard() {
  const questions = [
    {
      question: 'What is the capital of Lagos?',
      answers: ['Ikeja', 'Ibadan', 'Lekki', 'Benue'],
      correctAnswer: 'Ikeja',
    },
    {
      question: 'What is the largest continent?',
      answers: ['Africa', 'Asia', 'Europe', 'Australia'],
      correctAnswer: 'Asia',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      answers: ['Earth', 'Mars', 'Jupiter', 'Venus'],
      correctAnswer: 'Mars',
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (answer) => {
    setUserAnswer(answer);
    setFeedback(answer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect, try again!');
  };

  const handleNextQuestion = () => {
    setUserAnswer('');
    setFeedback('');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Reset to the first question or display a final message if it's the last question
      setFeedback('You’ve completed the quiz!');
      setCurrentQuestionIndex(0)
    }
  };

  const getButtonStyle = (answer) => {
    if (userAnswer === '') return 'bg-gray-600'; // Default button color
    return answer === currentQuestion.correctAnswer
      ? 'bg-green-500' // Green if correct
      : userAnswer === answer
      ? 'bg-red-500' // Red if incorrect and selected
      : 'bg-gray-600'; // Gray for the rest
  };

  return (
    <div className="flex flex-col rounded-2x w-96 bg-[#ffffff] shadow-xl">
      <div className="flex flex-col p-8">
        <div>{currentQuestion.question}</div>
        {currentQuestion.answers.map((answer) => (
          <button
            key={answer}
            className={`w-80 h-10 rounded-md mt-3 ${getButtonStyle(answer)}`}
            onClick={() => handleAnswerClick(answer)}
            disabled={!!userAnswer} // Disable buttons after an answer is selected
          >
            {answer}
          </button>
        ))}
        {userAnswer && (
          <div>
            <div>{feedback}</div>
            <button
              className="mt-4 w-80 h-10 bg-blue-500 rounded-md"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
