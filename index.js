const db = require("@makeitrealcamp/db-mock");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json()); // POST que pueda llegar el body

db.insert({ name: "Pedro Perez" });
db.insert({ name: "Maria Gomez" });

app.get("/api/tasks", (req, res) => {
  const records = db.findAll();
  res.status(200).json(records);
});

app.get("/api/tasks/:id", (req, res) => {
  const record = db.findById(req.params.id);
  res.status(200).json(record);
});

app.post("/api/tasks", (req, res) => {
  const record = db.insert(req.body);
  res.status(200).json(record);
});

app.delete("/api/tasks/:id", (req, res) => {
  const record = db.remove(req.params.id);
  res.status(200).json(record);
});

app.put("/api/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const taskUpdated = { ...req.body, id: taskId };
  const record = db.update(taskUpdated);
  res.status(200).json(record);
});

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
