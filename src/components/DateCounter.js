import { useState, useReducer } from "react";
const initialState = { count: 0, step: 1 };
function reducer(curState, action) {
  console.log(curState, action);
  //this is going to be the next state.
  // if (action.type === "dec") return curState - 1;
  // if (action.type === "inc") return curState + 1;
  // if (action.type === "setCount") return action.payLoad;
  //return the updated state object

  switch (action.type) {
    case "dec":
      // creating a new object with the previous obj and the updated data.
      return { ...curState, count: curState.count - curState.step };
    case "inc":
      return { ...curState, count: curState.count + curState.step };
    case "setCount":
      return { ...curState, count: action.payLoad };
    case "setStep":
      return { ...curState, step: action.payLoad };
    case "reset":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
}
function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);
  //dispatch function can also be used to update state
  //useReducer returns the current state and the dispatch function.
  // const [count, dispatch] = useReducer(reducer, 0);

  // lets add the step too to dispatch

  const [state, dispatch] = useReducer(reducer, initialState);
  //destructure state
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("august 13 2025");
  date.setDate(date.getDate() + count);

  const dec = function () {
    //the action in the reducer
    dispatch({ type: "dec" });
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    //takes the action in the reducer
    dispatch({ type: "inc" });
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    // CORRECT WAY
    dispatch({ type: "setCount", payLoad: Number(e.target.value) });
    //WRONG WAY
    // dispatch(Number(e.target.value));
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payLoad: Number(e.target.value) });
    // setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({ type: "reset" });
    // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
