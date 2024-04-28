import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { QuizProvider } from "./contexts/quiz";

const Home = lazy(() => import("./pages/Home"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const Quiz = lazy(() => import("./pages/Quiz"));

const App = () => {
  return (
    <>
      <Suspense fallback={<div className="container">Loading...</div>}>
        <Routes>
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
      </Suspense>
    </>
  );
};

export default App;
