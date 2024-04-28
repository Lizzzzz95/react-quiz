import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { QuizProvider } from "./contexts/quiz";

const Home = lazy(() => import("./pages/Home"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const Quiz = lazy(() => import("./pages/Quiz"));

const App = () => {
  useEffect(() => {
    document.title = "My Quiz App";
  }, []);

  return (
    <>
      <Suspense fallback={<div className="container">Loading...</div>}>
        <QuizProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </QuizProvider>
      </Suspense>
    </>
  );
};

export default App;
