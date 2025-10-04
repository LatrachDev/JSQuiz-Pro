const questions = require("../controllers/questionsController");
const express = require('express');

const router = express.Router();

router.post("/create", questions.create);
router.put("/:id/update", questions.update);
router.post("/:id/delete", questions.deleteOne);
router.get("/:id", questions.findOne);


module.exports = router;