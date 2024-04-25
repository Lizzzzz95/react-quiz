import { useContext } from "react";
import Answer from "./Answer";
import { QuizContext } from "../contexts/quiz";

// If we are using a loop like here, we shouldn't subscribe to the state, as this will not be performative
// We are using the 'key' prop as it is standard for React to be able to render the component properly, gives an error in  console if we don't have it. Ideally we should use a unique id instead of just a number iteration

const Question = () => {
  const [quizState] = useContext(QuizContext);
  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  return (
    <div>
      <div className="question">{currentQuestion.question}</div>
      <div className="answers">
        {quizState.answers.map((answer, index) => (
          <Answer answerText={answer} key={index}/>
        ))}
      </div>
    </div>
  );
};

export default Question;
