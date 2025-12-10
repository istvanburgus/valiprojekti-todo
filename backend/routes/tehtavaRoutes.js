import express from "express";
import Task from "../models/tehtavaModel.js";

const router = express.Router();

// GET /api/tasks – hae kaikki tehtävät
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error("Virhe haettaessa tehtäviä:", error);
    res.status(500).json({ error: "Tehtävien haku epäonnistui" });
  }
});

// POST /api/tasks – lisää uusi tehtävä
router.post("/", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ error: "Content on pakollinen" });
    }

    const newTask = new Task({
      content: content.trim(),
    });

    const saved = await newTask.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Virhe lisättäessä tehtävää:", error);
    res.status(500).json({ error: "Tehtävän lisääminen epäonnistui" });
  }
});

// PUT /api/tasks/:id – päivitä tehtävän tila (tai content, jos halutaan)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { content, isDone } = req.body;

    const updatedFields = {};
    if (content !== undefined) updatedFields.content = content;
    if (isDone !== undefined) updatedFields.isDone = isDone;

    const updated = await Task.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Tehtävää ei löytynyt" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Virhe päivitettäessä tehtävää:", error);
    res.status(500).json({ error: "Tehtävän päivitys epäonnistui" });
  }
});

// DELETE /api/tasks/:id – poista tehtävä
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Task.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Tehtävää ei löytynyt" });
    }

    res.status(204).end();
  } catch (error) {
    console.error("Virhe poistettaessa tehtävää:", error);
    res.status(500).json({ error: "Tehtävän poisto epäonnistui" });
  }
});

export default router;