import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>Home!!!</div>
      <button>
        <Link to="/quiz">Go to quiz</Link>
      </button>
      <button onClick={() => navigate("quiz")}>Go to quiz on click</button>
    </div>
  );
};

export default Home;
