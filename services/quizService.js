// check if user answers are correct for a question
exports.checkAnswers = (question, userAnswers) => {
    // question.options is already an array
    const options = question.options;

    // get correct options
    const correctOptions = options
        .filter(o => o.correct)
        .map(o => o.text);

    // ensure userAnswers is an array
    if (!Array.isArray(userAnswers)) userAnswers = [userAnswers];

    // correct if all correct selected and no extras
    const isCorrect = correctOptions.length === userAnswers.length &&
        correctOptions.every(opt => userAnswers.includes(opt));

    return isCorrect;
};
