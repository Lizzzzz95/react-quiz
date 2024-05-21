import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../contexts/quiz";

const Home = () => {
  const [, dispatch] = useContext(QuizContext);
  const navigate = useNavigate();
  const questionOptions = [5, 10, 20, 30, 40, 50];
  const difficultyOptions = [
    {
      label: "Any",
      value: "",
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

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => {
        data.trivia_categories.unshift({ id: "", name: "Any" });
        setCategories(data.trivia_categories);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch({ type: "LOAD_NEW_QUESTIONS", payload: data });
    navigate("quiz");
  };

  const onErrors = (formErrors) => {
    console.log("errors: ", formErrors);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onErrors)}>
        <div className="container">
          <div className="home-title">Quiz!</div>
          <div className="home-title">Please select options...</div>
          <div>
            <label>
              How many questions?
              <select name="noQs" {...register("noQs")}>
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
              <select name="category" {...register("category")}>
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
              <select name="difficulty" {...register("difficulty")}>
                {difficultyOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Home;
