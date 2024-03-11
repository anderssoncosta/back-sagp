import express, { Request, Response } from "express";
import ScheduleModel from "../models/scheduleModel";
import PatientsModel from "../models/patientsModel";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { id_patient, date, hour } = req.body;

  if (!id_patient && id_patient === "") {
    return res.status(400).json({ error: "Selecione um paciente" });
  }
  if (!date && date === "") {
    return res.status(400).json({ error: "Selecione uma data" });
  }
  if (!hour && hour === "") {
    return res.status(400).json({ error: "Selecione uma data" });
  }

  try {
    const schedule = await ScheduleModel.create({
      id_patient,
      date,
      hour,
    });
    return res.status(201).json(schedule);
  } catch (error) {
    console.error("Erro ao cadastrar agendamento:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const schedule = await ScheduleModel.findAll({
      include: [{ model: PatientsModel, as: "patients" }],
    });
    return res.json(schedule);
  } catch (error) {
    console.error("Erro ao obter agendamentos:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.get("/:id", async (req, res) => {
  const scheduleId = req.params.id;

  try {
    const schedule = await ScheduleModel.findByPk(scheduleId, {
      include: [{ model: PatientsModel, as: "patients" }],
    });

    if (!schedule) {
      return res.status(404).json({ error: "Agendamento não encontrado" });
    }
    return res.json(schedule);
  } catch (error) {
    console.error("Erro ao obter agendamento:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { scheduleId } = req.params;
  try {
    const schedule = await ScheduleModel.findByPk(scheduleId);

    if (!schedule) {
      return res.status(404).json({ error: "Agendamento não encontrado" });
    }

    await schedule.destroy();
    return res
      .status(200)
      .json({ message: "Agendamento excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir agendamento", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default router;
