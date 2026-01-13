module.exports = (app) => {
  try {
    app.get("/health", app.api.health.health);
    
    app.route("/tasks")
        .post(app.api.tasks.save)
        .get(app.api.tasks.get);

    app.route("/tasks/:id")
      .post(app.api.tasks.save)
      .get(app.api.tasks.getById)
      .delete(app.api.tasks.deleteTaskById);

    console.log("✅ Rotas carregadas com sucesso");
  } catch (e) {
    console.error("❌ ERRO ao carregar rotas: ", error.message);
    console.error(
      "Verifique se o arquivo routes/routes.js existe e exporta corretamente"
    );
    process.exit(1);
  }
};
