const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path')

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
// app.use(cors());
app.use(bodyParser.json());

// Подключение к MongoDB
const mongoURI = "mongodb+srv://kolosovmatveymk:AFblRZu9hLe70Sks@cluster0.414nj.mongodb.net/TodoDB?retryWrites=true&w=majority"; // Замените на вашу MongoDB строку подключения

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions = {
      origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
      credentials: true
  }
  app.use(cors(corsOptions))
}


(async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Завершить процесс, если соединение не удалось
  }
})();

// Создание схемы и модели
const TaskSchema = new mongoose.Schema({
  text: String,
  owner: String,
  type: String,
  dueDate: Number,
  repeat: Boolean,
  createdAt: Number,
  isCompleted: { type: Boolean, default: false },
});

const Task = mongoose.model('Task', TaskSchema);
// Получить все данные

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Добавить данные

app.post('/tasks', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Используем корректное создание ObjectId
    const objectId = new mongoose.Types.ObjectId(id);

    // Обновляем задачу
    const updatedTask = await Task.findByIdAndUpdate(objectId, req.body, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);

  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {

    const { id } = req.params;
    // Используем корректное создание ObjectId
    const objectId = new mongoose.Types.ObjectId(id);

    const deletedTask = await Task.findByIdAndDelete(objectId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully", deletedTask });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "An error occurred while deleting the task" });
  }
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
