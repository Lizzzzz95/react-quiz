import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../contexts/quiz";

const Home = () => {
  const [, dispatch] = useContext(QuizContext);
  const navigate = useNavigate();
  const questionOptions = [5, 10, 20, 30, 40, 50];
  const difficultyOptions = [
    {
      label: "Easy",
      value: "easy",
    },
    {
      label: "Medium",
      value: "medium",
    },
    {
      label: "Hard",
      value: "hard",
    },
  ];

  const [formData, setFormData] = useState({
    noQs: questionOptions[0],
    difficulty: "easy",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div>
      <div className="container">
        <div className="home-title">Quiz!</div>
        <div className="home-title">Please select options...</div>
        <div>
          <label>
            How many questions?
            <select name="noQs" onChange={handleChange} value={formData.noQs}>
              {questionOptions.map((num, index) => (
                <option key={index} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Difficulty?
            <select
              name="difficulty"
              onChange={handleChange}
              value={formData.difficulty}
            >
              {difficultyOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button
          onClick={() => {
            dispatch({ type: "LOAD_NEW_QUESTIONS", payload: formData });
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
