// ====================================================
// SERVER.JS - SERVIDOR EXPRESS
// ====================================================
require("dotenv").config();

// =====================================================
// BANNER INICIAL
// =====================================================

console.log("");
console.log("═══════════════════════════════════════════");
console.log("🎉 ToDóList - Sistema de controle de tarfeas");
console.log("Edoardo Rocha Paz © Direitos Reservados do Autor.");
console.log("═══════════════════════════════════════════");
console.log("");

const express = require("express");
const app = express();
const port = 3000;
const consign = require("consign");
const mongoose = require("mongoose");
require("./config/mongodb.js");

app.mongoose = mongoose;

consign()
  .include("config/middlewares.js")
  .then("api/task.js")
  .then("api")
  .then("config/routes.js")
  .into(app);

app.listen(port, () => {
  console.log("");
  console.log("═══════════════════════════════════════════");
  console.log("🎉 ToDóList - Sistema de controle de tarefas");
  console.log("═══════════════════════════════════════════");
  console.log(`📍 URL: http://${process.env.URL}:${port}`);
  console.log(`🏥 Health: http://${process.env.URL}:${port}/health`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || "production"}`);
  console.log("═══════════════════════════════════════════");
  console.log("");
  console.log("✅ Rotas disponíveis (3 endpoints):");
  console.log("");
  console.log("📍 SISTEMA:");
  console.log("   GET    /health");
  console.log("");
  console.log("📍 TASKS:");
  console.log("   GET    /tasks");
  console.log("   POST    /tasks");
  console.log("   DELETE    /tasks/:id");
  console.log("   POST    /tasks/:id");
  console.log("");
  console.log(`Servidor executando na porta ${port}...`);
});

// =====================================================
// TRATAMENTO DE SINAIS DE ENCERRAMENTO
// =====================================================
process.on("SIGTERM", () => {
  console.log("⚠️  SIGTERM recebido, encerrando servidor...");
  server.close(() => {
    console.log("✅ Servidor encerrado");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("\n⚠️  SIGINT recebido, encerrando servidor...");
  process.exit(0);
});
