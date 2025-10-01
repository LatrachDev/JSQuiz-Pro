import * as questions from "../controllers/questionsController";
import express from "express";

const router = express.Router();

router.post("/", questions.create)