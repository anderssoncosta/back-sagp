import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import patientsRoutes from "./routes/patientsRoutes";
import questionRoutes from "./routes/questionRoutes";
import formTypeRoutes from "./routes/formTypeRoutes";
import answerRoutes from "./routes/answersRoutes";
import scheduleRoutes from "./routes/scheduleRoutes";
import http from "http";
import { port } from "./util/credentials";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Rotas de Registro e Login
app.use("/auth", authRoutes);

// Rotas de Registro e Login
app.use("/users", authRoutes);

// Rota de Pacientes
app.use("/paciente", patientsRoutes);

// Rota de tipo de ficha
app.use("/tipo-ficha", formTypeRoutes);

//Cadastrar questions
app.use("/perguntas", questionRoutes);

//Rota de Cadastro de Respostas
app.use("/resposta-ficha", answerRoutes);

//Rota de Agendamentos
app.use("/agenda", scheduleRoutes);

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export { http };
