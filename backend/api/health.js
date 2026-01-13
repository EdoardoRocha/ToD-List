module.exports = (app) => {
  const { Task } = app.api.task;
  const health = async (req, res) => {
    const statusMap = {
      0: "Desconectado",
      1: "Conectado",
      2: "Conectando",
      3: "Desconectando",
    };
    const status = app.mongoose.connection.readyState;
    try {
      await Task.find({});

      res.json({
        status: "OK ✅",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memoria: {
          usado:
            Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + " MB",
          total:
            Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + " MB",
        },
        banco_dados: {
          status: "Conectado ✅",
          pool: `Status atual do mongoDB: ${statusMap[await status]}`,
        },
      });
    } catch (e) {
      res.status(500).json({
        status: "ERROR ❌",
        timestamp: new Date().toISOString(),
        banco_dados: {
          status: "Desconectado ❌",
          erro: e.message,
        },
      });
    }
  };

  return {
    health,
  };
};
