module.exports = (app) => {
  const { Task } = app.api.task;
  const save = async (req, res) => {
    const taskData = { ...req.body };

    if (!taskData.name) {
      res.status(400).send("Tarefa inexistente, impossível persistir");
      return;
    }

    if (!req.params.id) {
      const nameTask = new Task({
        name: taskData.name,
        completed: taskData.completed
      });

      nameTask
        .save()
        .then(() => res.status(201).send("Tarefa adicionada com sucesso!"))
        .catch((err) => res.status(500).send(err.message));
    } else {
      try {
        const id = req.params.id;
        const atualizationTheTask = await Task.findByIdAndUpdate(id, {
          name: taskData.name,
          completed: taskData.completed
        });
        if (!atualizationTheTask) res.status(404).send("Task não encontrada");
        atualizationTheTask
          .save()
          .then(() => res.status(200).send("Task atualizada com sucesso"));
      } catch (err) {
        res.status(500).send(err.message);
      }
    }
  };

  const get = async (req, res) => {
    try {
      const allTasks = await Task.find({});
      res.send(allTasks);
    } catch (e) {
      res.status(500).send(err.message);
    }
  };

  const getById = async (req, res) => {
    try {
      const id = req.params.id;
      const getTask = await Task.findById(id).exec()
      if(!getTask) res.status(404).send("Task inexistente!");
      res.send(getTask)
    } catch(e) {
      res.status(500).send(e.message)
    }
  }

  const deleteTaskById = async (req, res) => {
    try {
      const id = req.params.id;

      const taskDeleted = await Task.findByIdAndDelete(id);

      if (!taskDeleted) res.status(404).send("Task não encontrada");

      res.status(204).send();
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  return {
    save,
    get,
    deleteTaskById,
    getById
  };
};
