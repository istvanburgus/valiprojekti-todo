import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import taskRoutes from "./routes/tehtavaRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB-yhteys
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Yhteys MongoDB:hen onnistui");
  })
  .catch((error) => {
    console.error("Virhe yhdistäessä MongoDB:hen:", error.message);
  });

// Testireitti
app.get("/api/terve", (req, res) => {
  res.json({ viesti: "Backendi toimii ja Mongo-yhteys yritetään!" });
});

// Varsinaiset task-reitit /api/tasks
app.use("/api/tasks", taskRoutes);

// Tuntematon endpoint
const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "Tuntematon endpoint" });
};
app.use(unknownEndpoint);

// Virheidenkäsittely middleware
const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).json({ error: "Virheellinen id" });
  }

  res.status(500).json({ error: "Palvelimella tapahtui virhe" });
};

app.use(errorHandler);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Palvelin käynnissä portissa ${port}`);
});