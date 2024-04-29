import { createContext, useReducer } from "react";
import { normaliseQuestions, shuffleAnswers } from "../helpers";

const initialState = {
  currentQuestionIndex: 0,
  questions: [],
  showResults: false,
  answers: [], // Answers for the current question, initial answers are obv for question 1, like the currentQuestionIndex property
  currentAnswer: "",
  correctAnswersCount: 0,
  error: null,
  apiPayload: {
    noQs: 5,
    difficulty: "easy"
  },
};

// A reducer is a function where we define how our actions must change out state (View -> Actions -> State -> View -> Actions...)
const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_NEW_QUESTIONS": {
      const apiPayload = action.payload;
      return {
        ...state,
        apiPayload,
      };
    }
    case "SELECT_ANSWER": {
      const correctAnswersCount =
        action.payload ===
        state.questions[state.currentQuestionIndex].correctAnswer
          ? state.correctAnswersCount + 1
          : state.correctAnswersCount;
      return {
        ...state,
        currentAnswer: action.payload,
        correctAnswersCount,
      };
    }
    case "NEXT_QUESTION": {
      const showResults =
        state.currentQuestionIndex === state.questions.length - 1;
      const currentQuestionIndex = showResults
        ? state.currentQuestionIndex
        : state.currentQuestionIndex + 1;
      const answers = showResults
        ? []
        : shuffleAnswers(state.questions[currentQuestionIndex]);
      // We have to return a new object here for it to re-render, can't just return an altered existing object, react won't recognise this
      return {
        ...state,
        currentQuestionIndex,
        showResults,
        answers,
        currentAnswer: "",
      };
    }
    case "RESTART": {
      return initialState;
    }
    case "LOADED_QUESTIONS": {
      const normalisedQuestions = normaliseQuestions(action.payload);
      return {
        ...state,
        questions: normalisedQuestions,
        answers: shuffleAnswers(normalisedQuestions[0]),
      };
    }
    case "SERVER_ERROR": {
      return {
        ...state,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const QuizContext = createContext();

// We use contexts to be able to provide data globally essentially, e.g. if I have like 10 nested child components and I want to send data from the 1st level to the 10th, it's easier to provide a context instead of repeatedly sending the values through every nested child component
// We also want to provide all our business logic here
export const QuizProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
