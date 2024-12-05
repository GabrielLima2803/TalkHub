const mongoose = require("mongoose");

const MensagemSchema = new mongoose.Schema({
  username: { type: String, required: true },
  texto: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Mensagem = mongoose.model("Mensagem", MensagemSchema);
module.exports = Mensagem;
