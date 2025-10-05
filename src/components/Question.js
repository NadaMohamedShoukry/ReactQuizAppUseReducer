import { useQuiz } from "../contexts/QuizContext";
import Option from "./Option";

function Question() {
  const { questions, index } = useQuiz();
  const question = questions.at(index);
  return (
    <div>
      <h2>{question.question}</h2>
      <Option question={question} />
    </div>
  );
}

export default Question;
