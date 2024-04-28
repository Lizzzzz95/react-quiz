import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Quiz from "./pages/Quiz";
import { QuizProvider } from "./contexts/quiz";

const App = () => {
  return (
    <>
      <Routes>
        {/* <Route index element={<Home />} /> */}
        <Route path="/" element={<Home />} />
        <Route
          path="/quiz"
          element={
            <QuizProvider>
              <Quiz />
            </QuizProvider>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
