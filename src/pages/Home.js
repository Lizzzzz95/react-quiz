import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../contexts/quiz";

const Home = () => {
  const [, dispatch] = useContext(QuizContext);
  const navigate = useNavigate();
  const questionOptions = [5, 10, 20, 30, 40, 50];
  const difficultyOptions = [
    {
      label: "Any",
      value: null,
    },
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

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    noQs: questionOptions[0],
    difficulty: null,
    category: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => {
        data.trivia_categories.unshift({ id: null, name: "Any" });
        setCategories(data.trivia_categories);
      });
  }, []);

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
            Which category?
            <select
              name="category"
              onChange={handleChange}
              value={formData.category}
            >
              {categories.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name}
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
