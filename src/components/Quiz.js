import { useReducer } from "react";
import Question from "./Question";

// writing the business logic outside the component
const initialState = {
  currentQuestionIndex: 0,
  questions: [],
};

// A reducer is a function where we define how our actions must change out state (View -> Actions -> State -> View -> Actions...)
const reducer = (state, action) => {
  if (action.type === "NEXT_QUESTION") {
    return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };
  }
  return state;
};

const Quiz = () => {
  // dispatch is how we trigger our actions
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("rendered!", state);

  return (
    <div className="quiz">
      <div>
        <div className="score">Question 1/8</div>
        <Question />
        <div
          className="next-button"
          // All we are doing here is dispatching an action and the business logic outside the component will handle it, better than using useState (using an anonymouse function)
          onClick={() =>
            dispatch({
              type: "NEXT_QUESTION",
            })
          }
        >
          Next Question
        </div>
      </div>
    </div>
  );
};

export default Quiz;

// React renders like a snapshot, it is rendered once on init. We need to use useState to get around this
