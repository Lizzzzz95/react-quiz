//  ... spreads the array values
// .map((key1) => ({key2: 'test1', key3: 'test2}))  re-formats the object e.g. turn an array of strings into an array of objects

export const shuffleAnswers = (question) => {
  const unshuffledAnswers = [
    question.correctAnswer,
    ...question.incorrectAnswers,
  ];

  return unshuffledAnswers
    .map((unshuffledAnswer) => ({
      sort: Math.random(),
      value: unshuffledAnswer,
    }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
};

export const normaliseQuestions = (apiQuestions) => {
  return apiQuestions.map((apiQuestions) => {
    const incorrectAnswers = apiQuestions.incorrect_answers.map(
      (incorrectAnswer) => decodeURIComponent(incorrectAnswer)
    );
    return {
      correctAnswer: decodeURIComponent(apiQuestions.correct_answer),
      question: decodeURIComponent(apiQuestions.question),
      incorrectAnswers,
    };
  });
};

export const normaliseQueryParams = (queryParams) => {
  for (let key in queryParams) {
    if (queryParams[key] === null || queryParams[key] === "") {
      delete queryParams[key];
    }
  }
  return new URLSearchParams(queryParams);
};
