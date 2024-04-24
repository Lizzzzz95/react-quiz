import Answer from "./Answer";

const Question = ({questions}) => {
  console.log('q\'s', questions)
  return (
    <div>
      <div className="question">Text of our question</div>
      <div className="answers">
        <Answer />
        <Answer />
        <Answer />
        <Answer />
      </div>
    </div>
  )
}

export default Question;