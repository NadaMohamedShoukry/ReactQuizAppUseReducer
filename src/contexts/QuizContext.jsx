import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  //loading , error , ready, active,finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};
const SECS_PER_QUESTION = 30;
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      //handleing the logic is better in the reducer.
      const currentQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finishQuiz":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action Unkown");
  }
}
function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;
  const numOfQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        if (!res.ok) return console.log("invalid");
        const data = await res.json();
        if (!data) return console.log("invalid data");
        dispatch({ type: "dataReceived", payload: data });
        console.log(data);
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchQuestions();
  }, []);
  return <QuizContext.Provider value={{
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
    numOfQuestions,
    maxPoints,

    dispatch
  }}>{children}</QuizContext.Provider>;
}
function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("Quiz context was used outside of Quiz Provider!");
  return context;
}
export { QuizProvider, useQuiz };
