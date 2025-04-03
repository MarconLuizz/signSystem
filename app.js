// Carregando Módulos
const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth"); // IMPORTADO

const app = express();

// Configuração do Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose
  .connect("mongodb://localhost/cadastrodeusuarios")
  .then(() => console.log("MongoDB conectado com sucesso."))
  .catch((err) => console.log("Erro ao conectar ao banco: " + err));

// Configuração do Handlebars
app.engine("hbs", engine({ extname: "hbs", defaultLayout: "main" })); // CORRIGIDO
app.set("view engine", "hbs");

// Arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rotas
app.use(authRoutes); // USANDO O ARQUIVO DE ROTAS
app.get("/", (req, res) => res.render("home"));
app.get("/login", (req, res) => res.render("login")); // CORRIGIDO
app.get("/register", (req, res) => res.render("register")); // CORRIGIDO

// Iniciando o Servidor
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});

module.exports = app;
