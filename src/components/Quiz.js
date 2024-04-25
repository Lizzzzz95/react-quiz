import { useContext } from "react";
import Question from "./Question";
import { QuizContext } from "../contexts/quiz";

const Quiz = () => {
  // dispatch is how we trigger our actions
  const [quizState, dispatch] = useContext(QuizContext);

  return (
    <div className="quiz">
      <div>
        <div className="score">
          Question {quizState.currentQuestionIndex + 1}/
          {quizState.questions.length}
        </div>
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
