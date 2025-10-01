import Question from "../models/Question";

//create question function
async function create(req, res){
    try {
        const {theme_id, question_text, options, multiple} =req.body;
        
        if(!question_text || !theme_id || !options || !multiple){
            return res.status(400).send({ message: "the fields: theme_id, question_text, options and multiple can not be empty"});
        }

        const questionData = await Question.create({theme_id, question_text, options, multiple});
        return res.status(201).json({
            message: "question created with succés",
            data: questionData,
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while creating the question."
        })
    }
}

