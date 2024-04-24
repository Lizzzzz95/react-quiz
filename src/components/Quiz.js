import { useState } from "react";
import Question from "./Question";

const Quiz = () => {
  const [state, setState] = useState({
    currentQuestionIndex: 0,
    questions: []
  }) // useStae uses: [state, setState] = useState(initialState)  
  const testClick = () => {
    console.log('clicckkk');
    setState({
      ...state,
      currentQuestionIndex: state.currentQuestionIndex +1
    }) // This will update the state, and therefore re-renders our component e.g. it initially renders as 0, then re-renders as 1, then 2 etc.
  }

  return (
    <div className="quiz">
      <div>
        <div className="score">
          Question 1/8
        </div>
        <Question />
        <div className="next-button" onClick={testClick}>
          Next Question {state.currentQuestionIndex}
        </div>
      </div>
    </div>
  );
};

export default Quiz;

// React renders like a snapshot, it is rendered once on init. We need to use useState to get around this