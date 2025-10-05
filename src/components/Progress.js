import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { index, numOfQuestions, points, maxPoints, answer }=useQuiz()
  return (
    <header className="progress">
      <progress max={numOfQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}

export default Progress;
