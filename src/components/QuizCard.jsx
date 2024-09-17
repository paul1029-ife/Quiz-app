import { useState } from 'react';
import questions from './questions'; // Import questions from the external file
import Question from './Question';
import AnswerButton from './AnswerButton';

export default function QuizCard() {
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
      alert("You are done with the quiz")
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
        <Question questionText={currentQuestion.question} />
        {currentQuestion.answers.map((answer) => (
          <AnswerButton
            key={answer}
            answer={answer}
            onClick={handleAnswerClick}
            buttonStyle={getButtonStyle(answer)}
            disabled={!!userAnswer} // Disable after selecting an answer
          />
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
