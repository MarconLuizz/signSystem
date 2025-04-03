const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Rota de registro
router.post("/register", async (req, res) => {
  const { nome, idade, email, senha, confirmarSenha } = req.body;

  if (senha !== confirmarSenha) {
    return res.render("register", { error: "As senhas não coincidem." });
  }

  try {
    const newUser = new User({ nome, idade, email, senha });
    await newUser.save();

    res.redirect("/login");
  } catch (err) {
    res.render("register", { error: "Erro ao criar conta. Tente novamente." });
  }
});

// Rota de login
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.senha !== senha) {
      return res.render("login", { error: "Email ou senha incorretos." });
    }

    res.send("Login efetuado com sucesso.");
  } catch (err) {
    res.render("login", { error: "Erro ao tentar fazer login." });
  }
});

module.exports = router;
