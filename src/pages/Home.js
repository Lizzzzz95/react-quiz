import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../contexts/quiz";

const Home = () => {
  const [, dispatch] = useContext(QuizContext);
  const navigate = useNavigate();
  const questionOptions = [5, 10, 20, 30, 40, 50];
  let quizPayload = { noQs: questionOptions[0] };

  const handleChange = (event) => {
    quizPayload.noQs = event.target.value;
  };

  return (
    <div>
      <div className="container">
        <div className="home-title">Quiz!</div>
        <div className="home-title">Please select options...</div>
        <div>
          <label>
            How many questions?
            <select name="question-numbers" onChange={handleChange}>
              {questionOptions.map((num, index) => (
                <option key={index} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button
          onClick={() => {
            dispatch({ type: "LOAD_NEW_QUESTIONS", payload: quizPayload });
            navigate("quiz");
          }}
        >
          Go to quiz on click
        </button>
      </div>
    </div>
  );
};

export default Home;
