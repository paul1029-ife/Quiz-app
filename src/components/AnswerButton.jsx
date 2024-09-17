export default function AnswerButton({ answer, onClick, buttonStyle, disabled }) {
    return (
      <button
        className={`w-80 h-10 rounded-md mt-3 ${buttonStyle}`}
        onClick={() => onClick(answer)}
        disabled={disabled}
      >
        {answer}
      </button>
    );
  }
  