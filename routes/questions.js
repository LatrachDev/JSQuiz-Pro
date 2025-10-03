const questions = require("../controllers/questionsController");
const express = require('express');

const router = express.Router();

router.post("/", questions.create);
router.put("/:id", questions.update);
router.delete("/:id", questions.deleteOne);
router.get("/:id", questions.findOne);

module.exports = router;