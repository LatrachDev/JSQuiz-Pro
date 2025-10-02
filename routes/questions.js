import * as questions from "../controllers/questionsController";
import express from "express";

const router = express.Router();

router.post("/", questions.create);
router.put("/:id", questions.update);
router.delete("/:id", questions.deleteOne);
router.get("/:id", questions.findOne);