import { createContext, useReducer } from "react";

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


export const QuizContext = createContext();

// We use contexts to be able to provide data globally essentially, e.g. if I have like 10 nested child components and I want to send data from the 1st level to the 10th, it's easier to provide a context instead of repeatedly sending the values through every nested child component
// We also want to provide all our business logic here
export const QuizProvider = ({ children }) => {
    const value = useReducer(reducer, initialState);
    console.log("rendered!", value);
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
