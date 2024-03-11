import express, { Request, Response } from "express";
import AnswersModel from "../models/answersModel";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { answers, id_questions } = req.body;
    const answer = await AnswersModel.create({ answers, id_questions });
    return res.status(201).json(answer);
  } catch (error) {
    console.error("Erro ao cadastrar resposta:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const answers = await AnswersModel.findAll();
    return res.json(answers);
  } catch (error) {
    console.error("Erro ao obter respostas:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default router;
