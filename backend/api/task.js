module.exports = (app) => {
  const taskSchema = new app.mongoose.Schema({
    _id: Number,
    name: String,
    completed: {type: Boolean, default: false}
  });
  const counterSchema = new app.mongoose.Schema({
    _id: String,
    seq: { type: Number, default: 0 },
  });

  const Counter = app.mongoose.model("Counter", counterSchema);

  const getNextSequence = async (sequenceName) => {

    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: sequenceName },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      return counter.seq;
    } catch (e) {
      console.error(e.message)
    }
  };

  taskSchema.pre("save", async function () {
    if (this.isNew) {
      const nextId = await getNextSequence("taskId")
      this._id = nextId;
    }
  });

  const Task = app.mongoose.model("Task", taskSchema);

  return {
    Task,
    Counter,
    getNextSequence,
  };
};
