const Question = require("../models/Question");

//create question function
exports.create = async (req, res) => {
  try {
    const { theme_id, question_text, options, correct, multiple } = req.body;

    if (!theme_id || !question_text || !options || multiple === undefined) {
      return res.status(400).send("Champs requis manquants.");
    }

    const opts = Array.isArray(options) ? options : [options];
    const correctIndexes = Array.isArray(correct)
      ? correct.map(Number)
      : correct !== undefined
      ? [Number(correct)]
      : [];

    const formattedOptions = opts.map((opt, idx) => ({
      text: opt,
      correct: correctIndexes.includes(idx),
    }));

    const isMultiple = multiple === "true" || multiple === true;

    await Question.create({
      theme_id,
      question_text: question_text,
      options: JSON.stringify(formattedOptions),
      multiple: isMultiple,
    });


    return res.redirect("/manage_questions");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la création de la question.");
  }
}

//find question by id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const question = await Question.findByPk(id);

    if (!question) {
      return res
        .status(404)
        .json({ message: `Question with id=${id} not found.` });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: "Error while retrieving the question" });
  }
};

//update a question
exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    const updated = await Question.update(req.body, { where: { id } });

    if (updated === 0) {
      return res
        .status(404)
        .json({ message: `Question with id=${id} not found.` });
    }

    const updatedQuestion = await Question.findByPk(id);
    res.json({
      message: "question mise à jour avec succès",
      data: updatedQuestion,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de la question." });
  }
};

//delete question
exports.deleteOne = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await Question.destroy({ where: { id } });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: `Question with id=${id} not found.` });
    }

    // res.json({ message: "question supprimé avec succès" });
    return res.redirect("/manage_questions");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la question." });
  }
};
