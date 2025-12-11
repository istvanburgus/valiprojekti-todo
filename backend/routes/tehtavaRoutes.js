import express from "express";
import Task from "../models/tehtavaModel.js";

const router = express.Router();

// GET /api/tasks – hae kaikki tehtävät
router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

// POST /api/tasks – lisää uusi tehtävä
router.post("/", async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      // käyttäjä yrittää lisätä tehtävän ilman sisältöä
      return res.status(400).json({ error: "Tehtävän sisältö ei voi olla tyhjä" });
    }

    const newTask = new Task({
      content: content.trim(),
    });

    const saved = await newTask.save();
    res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
});

// PUT /api/tasks/:id – päivitä tehtävän tila tai sisältö
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content, isDone } = req.body;

    const updatedFields = {};
    if (content !== undefined) {
      if (!content.trim()) {
        return res.status(400).json({ error: "Tehtävän sisältö ei voi olla tyhjä" });
      }
      updatedFields.content = content.trim();
    }
    if (isDone !== undefined) updatedFields.isDone = isDone;

    const updated = await Task.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!updated) {
      // käyttäjä yrittää muokata tehtävää, jota ei löydy
      return res.status(404).json({ error: "Tehtävää ei löytynyt" });
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/tasks/:id – poista tehtävä
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await Task.findByIdAndDelete(id);

    if (!deleted) {
      // käyttäjä yrittää poistaa tehtävää, jota ei löydy
      return res.status(404).json({ error: "Tehtävää ei löytynyt" });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;