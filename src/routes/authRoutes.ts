import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UsersModel from "../models/usersModel";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Nome, email e senha são obrigatórios" });
  }

  try {
    // Verifica se o usuario está cadastrado no banco
    const existingUser = await UsersModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Usuário ou e-mail não existe" });
    }

    // Verifica senha antes de salvar no banco
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuario no banco
    const newUser = await UsersModel.create({
      username,
      email,
      password: hashedPassword,
    });

    // Retorno do JSON
    return res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      message: "Usuário registrado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao registrar usuário" + error);
    return res.status(500).json({ error: "Erro servidor interno" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  try {
    const user = await UsersModel.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign({ userId: user.id }, "token");
      return res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        token,
        message: "Logado com sucesso",
      });
    } else {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }
  } catch (error) {
    console.error("Error logging in", error);
    res.status(500).json({ error: "Erro servidor interno" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await UsersModel.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const user = await UsersModel.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user by ID", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;

  const { username, email, password, phone, city, district, zipcode, address } =
    req.body;

  try {
    let user = await UsersModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password ? await bcrypt.hash(password, 10) : user.password;
    user.phone = phone || user.phone;
    user.city = city || user.city;
    user.district = district || user.district;
    user.zipcode = zipcode || user.zipcode;
    user.address = address || user.address;

    await user.save();

    return res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      city: user.city,
      district: user.district,
      zipcode: user.zipcode,
      address: user.address,
      message: "Usuário atualizado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default router;
