import { useState } from "react";
import questions from "./questions"; // Import questions from the external file
import Question from "./Question";
import AnswerButton from "./AnswerButton";

export default function QuizCard() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    Math.floor(Math.random() * questions.length)
  );
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showQuiz, setShowQuiz] = useState(true);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const currentQuestion = questions[currentQuestionIndex];
  const handleAnswerClick = (answer) => {
    setUserAnswer(answer);
    setFeedback(
      answer === currentQuestion.correctAnswer
        ? "Correct!"
        : "Incorrect, try again!"
    );
  };



const handleNextQuestion = () => {
  if (answeredQuestions.length === questions.length) {
    setShowQuiz(false); // Quiz is over
    return;
  }

  let nextQuestionIndex;
  do {
    nextQuestionIndex = Math.floor(Math.random() * questions.length);
  } while (answeredQuestions.includes(nextQuestionIndex));

  setAnsweredQuestions([...answeredQuestions, currentQuestionIndex]);
  setCurrentQuestionIndex(nextQuestionIndex);
  setUserAnswer(""); // Reset the selected answer
  setFeedback(""); // Reset the feedback
};


  const getButtonStyle = (answer) => {
    if (userAnswer === "") return "bg-gray-600"; // Default button color
    return answer === currentQuestion.correctAnswer
      ? "bg-green-500" // Green if correct
      : userAnswer === answer
      ? "bg-red-500" // Red if incorrect and selected
      : "bg-gray-600"; // Gray for the rest
  };

  return (
    <>
      {showQuiz ? (
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
      ) : (
        <div>You have completed this quiz🥳</div>
      )}
    </>
  );
}
