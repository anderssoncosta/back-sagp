import express, { Request, Response } from "express";
import FormTypeModel from "../models/formTypeModel";
import PatientsModel from "../models/patientsModel";

const router = express.Router();

//Rota para cadastrar ficha
router.post("/", async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const newFormType = await FormTypeModel.create({ name });
    return res
      .status(201)
      .json({
        name: newFormType.name,
        message: "Ficha cadastrada com sucesso!",
      });
  } catch (error) {
    console.error("Erro ao cadastrar tipo de ficha:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

//Rota para buscar todas as fichas cadastradas
router.get("/", async (req: Request, res: Response) => {
  try {
    const formTypes = await FormTypeModel.findAll();
    return res.json(formTypes);
  } catch (error) {
    console.error("Erro ao obter tipos de ficha:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

//Rota para atualizar ficha cadastrada
router.put("/:id", async (req: Request, res: Response) => {
  const formTypeId = req.params.id;

  const { name } = req.body;

  try {
    let formType = await FormTypeModel.findByPk(formTypeId);

    if (!formType) {
      return res.status(404).json({ error: "Tipo de ficha não encontrado" });
    }

    formType.name = name;
    await formType.save();

    return res.json({
      name: formType.name,
      message: "Ficha atualizada com sucesso !",
    });
  } catch (error) {
    console.error("Erro ao atualizar ficha !", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

//Rota para deletar ficha cadastrada
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const formType = await FormTypeModel.findByPk(id);
    if (!formType) {
      return res.status(404).json({ error: "Ficha não encontrada !" });
    }

    await formType.destroy();

    res.json({ message: "Ficha deletada com sucesso !" });
  } catch (error) {
    console.error("Erro ao deletar ficha:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default router;
