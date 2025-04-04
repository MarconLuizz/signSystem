// Módulos
const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express(); // Inicializa a aplicação

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB
mongoose
  .connect("mongodb://localhost/cadastrodeusuarios") // Nome do Banco: cadastroeusuarios
  .then(() => console.log("MongoDB conectado com sucesso."))
  .catch((err) => console.log("Erro ao conectar ao banco: " + err));

// Handlebars
app.engine("hbs", engine({ extname: "hbs", defaultLayout: "main" })); // Define o motor de template com extensão .hbs e layout principal
app.set("view engine", "hbs");

// Arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rotas
app.use(authRoutes);
app.get("/", (req, res) => res.render("home")); // Rota da página inicial
app.get("/login", (req, res) => res.render("login")); // Rota da tela de login
app.get("/register", (req, res) => res.render("register")); // Rota da tela de registro

// Porta do servidor
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});

module.exports = app; // Exporta o app para outros arquivos utilizarem
