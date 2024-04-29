import { useContext, useEffect } from "react";
import Question from "../components/Question";
import { QuizContext } from "../contexts/quiz";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  // dispatch is how we trigger our actions
  const [quizState, dispatch] = useContext(QuizContext);
  const navigate = useNavigate();
  const apiUrl = new URL("/api.php", "https://opentdb.com");
  apiUrl.search = new URLSearchParams({
    amount: quizState.apiPayload.noQs,
    difficulty: quizState.apiPayload.difficulty,
    category: "31",
    type: "multiple",
    encode: "url3986"
  });

  // By default, useEffect is triggered after every render of our code. But if provide an empty array in the 2nd param, it will be triggered only once, because we don't have any dependencies
  useEffect(() => {
    if (quizState.questions.length > 0 || quizState.error) {
      return;
    }
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          dispatch({ type: "SERVER_ERROR", payload: res.status + " Error" });
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          dispatch({ type: "LOADED_QUESTIONS", payload: data.results });
        }
      })
      .catch((err) => {
        dispatch({ type: "SERVER_ERROR", payload: err.message });
      });
  });
  // We wrap the if statement in {}, the && symbol basically means render the html after it if the 'if' statement is true
  return (
    <div className="quiz">
      {quizState.error && (
        <div className="results">
          <div className="congratulations">Server error</div>
          <div className="results-info">
            <div>{quizState.error}</div>
          </div>
        </div>
      )}
      {quizState.showResults && (
        <div className="results">
          <div className="congratulations">Congratulations</div>
          <div className="results-info">
            <div>You have completed the quiz</div>
            <div>
              You've got {quizState.correctAnswersCount} of{" "}
              {quizState.questions.length}
            </div>
          </div>
          <div
            className="next-button"
            onClick={() => dispatch({ type: "RESTART" })}
          >
            Restart
          </div>
        </div>
      )}
      {!quizState.showResults && quizState.questions.length > 0 && (
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
      )}
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

export default Quiz;

// React renders like a snapshot, it is rendered once on init. We need to use useState to get around this
