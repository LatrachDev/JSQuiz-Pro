const Question = require("../models/Question");

//create question function
exports.create= async(req, res) => {
  try {
    const { theme_id, question_text, options, multiple } = req.body;

    if (!question_text || !theme_id || !options || !multiple) {
      return res
        .status(400)
        .send({
          message:
            "the fields: theme_id, question_text, options and multiple can not be empty",
        });
    }

    const questionData = await Question.create({
      theme_id,
      question_text,
      options,
      multiple,
    });
    return res.status(201).json({
      message: "question created with succés",
      data: questionData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while creating the question.",
    });
  }
}

//find question by id
exports.findOne = async(req, res) => {
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
}

//update a question
exports.update = async(req, res) => {
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
    res.status(500).json({ message: "Erreur lors de la mise à jour de la question." });
  }
}

//delete question
exports.deleteOne = async(req, res) => {
    try {
        const id = req.params.id;

        const deleted = await Question.destroy({where: {id}});

        if(!deleted){
            return res.status(404).json({message : `Question avec id=${id} non trouvée` })
        }

        res.json({message : "question supprimé avec succès"});
    } catch (error) {
        res.status(500).json({message:"Erreur lors de la suppression de la question." });
    }
}