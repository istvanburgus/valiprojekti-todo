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

// Testireitti (maradhat)
app.get("/api/terve", (req, res) => {
  res.json({ viesti: "Backendi toimii ja Mongo-yhteys yritetään!" });
});

// TÄRKE: nyt /api/tasks, kuten tehtävässä
app.use("/api/tasks", taskRoutes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Palvelin käynnissä portissa ${port}`);
});