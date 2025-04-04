const express = require("express");
const router = express.Router(); // Cria um roteador modular do Express
const User = require("../models/User"); // Importa o modelo de usuário (mongoose)

// Rota de registro
router.post("/register", async (req, res) => {
  const { nome, idade, email, senha, confirmarSenha } = req.body; // Desestrutura os dados do corpo da requisição

  // Verifica se as senhas digitadas são iguais
  if (senha !== confirmarSenha) {
    return res.render("register", { error: "As senhas não coincidem." }); // Retorna erro para a view caso não coincidam
  }

  try {
    // Cria um novo usuário com os dados fornecidos
    const newUser = new User({ nome, idade, email, senha });

    // Salva o novo usuário no banco de dados MongoDB
    await newUser.save();

    // Redireciona o usuário para a página de login após cadastro bem-sucedido
    res.redirect("/login");
  } catch (err) {
    // Em caso de erro (ex: email duplicado, problema no banco), renderiza a página de registro com mensagem de erro
    res.render("register", { error: "Erro ao criar conta. Tente novamente." });
  }
});

// Rota de login (autenticação de usuário)
router.post("/login", async (req, res) => {
  const { email, senha } = req.body; // Desestrutura os dados do corpo da requisição

  try {
    // Busca no banco de dados um usuário com o email informado
    const user = await User.findOne({ email });

    // Verifica se o usuário existe e se a senha está correta
    // OBS: Comparação direta de senha (sem hash) — ideal usar bcrypt futuramente
    if (!user || user.senha !== senha) {
      return res.render("login", { error: "Email ou senha incorretos." }); // Erro de autenticação
    }

    // Caso login seja bem-sucedido, exibe mensagem
    res.send("Login efetuado com sucesso.");
  } catch (err) {
    // Em caso de erro na requisição ou banco, renderiza a view com mensagem de erro
    res.render("login", { error: "Erro ao tentar fazer login." });
  }
});

module.exports = router; // Exporta o roteador para ser usado no app principal
