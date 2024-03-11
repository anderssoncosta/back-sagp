import express, { Request, Response } from "express";
import { format, parse } from "date-fns";

import PatientsModel from "../models/patientsModel";
import FormTypeModel from "../models/formTypeModel";

const router = express.Router();


//Rota para cadastrar paciente
router.post("/", async (req: Request, res: Response) => {
  const {
    name,
    age,
    birth,
    resp,
    email,
    gender,
    phone,
    naturalness,
    city,
    district,
    zipcode,
    address,
    id_scheduling,
  } = req.body;

  try {
    // const dateBirth = new Date(dta_nasc);
    const dateBirth = parse(birth, "dd-MM-yyyy", new Date());

    if (isNaN(dateBirth.getTime())) {
      console.error("Erro ao converter data de nascimento");
      return res.status(400).json({ error: "Data de nascimento inválida" });
    }
    const newPatient = await PatientsModel.create({
      name,
      age,
      birth: format(dateBirth, "dd-MM-yyyy"),
      resp,
      email,
      gender,
      phone,
      naturalness,
      city,
      district,
      zipcode,
      address,
      id_scheduling,
    });

    return res
      .status(201)
      .json({ newPatient, message: "Paciente cadastrado com sucesso" });
  } catch (error) {
    console.error("Erro ao cadastrar paciente", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

//Rota para obter todos os pacientes
router.get("/", async (req: Request, res: Response) => {
  try {
    const patients = await PatientsModel.findAll();
    console.log(patients);
    return res.json(patients);
  } catch (error) {
    console.error("Erro ao obter a lista de pacientes", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Rota para obter paciente unico pela ID
router.get("/:id", async (req: Request, res: Response) => {
  const patientId = req.params.id;

  try {
    const patient = await PatientsModel.findByPk(patientId);

    if (!patient) {
      return res.status(404).json({ error: "Paciente não encontrado" });
    }

    return res.json(patient);
  } catch (error) {
    console.error("Erro ao obter paciente por ID", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

//Rota para atualizar paciente
router.put("/:id", async (req: Request, res: Response) => {
  const patientId = req.params.id;
  const {
    name,
    age,
    birth,
    resp,
    email,
    gender,
    phone,
    naturalness,
    city,
    district,
    zipcode,
    address,
  } = req.body;

  try {
    let patient = await PatientsModel.findByPk(patientId);
    if (!patient) {
      return res.status(404).json({ error: "Paciente não encontrado" });
    }
    patient.name = name || patient.name;
    patient.age = age || patient.age;
    patient.birth = birth || patient.birth;
    patient.resp = resp || patient.resp;
    patient.email = email || patient.email;
    patient.gender = gender || patient.gender;
    patient.phone = phone || patient.phone;
    patient.naturalness = naturalness || patient.naturalness;
    patient.city = city || patient.city;
    patient.district = district || patient.district;
    patient.zipcode = zipcode || patient.zipcode;
    patient.address = address || patient.address;

    await patient.save();

    return res.status(200).json({
      name: patient.name,
      age: patient.age,
      birth: patient.birth,
      resp: patient.resp,
      email: patient.email,
      gender: patient.gender,
      phone: patient.phone,
      naturalness: patient.naturalness,
      city: patient.city,
      district: patient.district,
      zipcode: patient.zipcode,
      address: patient.address,
      message: "Paciente atualizado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao atualizar Paciente", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

//Rota para deletar paciente
router.delete("/:id", async (req: Request, res: Response) => {
  const patientId = req.params.id;

  try {
    const patient = await PatientsModel.findByPk(patientId);

    if (!patient) {
      return res.status(404).json({ error: "Paciente não encontrado" });
    }

    await patient.destroy();

    return res.json({ message: "Paciente excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir paciente por ID", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default router;
