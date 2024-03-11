import express, { Request, Response } from "express";
import FormTypeModel from "../models/formTypeModel";
import QuestionModel from "../models/questionModel";

const router = express.Router();

router.post("/:id", async (req: Request, res: Response) => {
  const questionId = req.params.id;
  
  try {
    const { question, formType } = req.body;
    const newQuestion = QuestionModel.create({ question });
    return res.status(201).json(newQuestion);
  } catch (error) {
    console.error("Erro ao cadastrar perguntas:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});


export default router;
