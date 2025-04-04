const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definição do schema (estrutura) para o modelo de Usuário
const UserSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    idade: {
      type: Number,
      required: true,
      min: 0,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Email inválido"],
    },
    senha: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

// Criação do modelo 'User' com base no schema definido
const User = mongoose.model("User", UserSchema);

// Exporta o modelo para ser utilizado em outras partes da aplicação (como nas rotas)
module.exports = User;
