import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import tehtavaReitit from "./routes/tehtavaRoutes.js";

const sovellus = express();

sovellus.use(cors());
sovellus.use(express.json());

// Yhdistetään MongoDB:hen
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Yhteys MongoDB:hen onnistui");
  })
  .catch((virhe) => {
    console.error("Virhe yhdistäessä MongoDB:hen:", virhe.message);
  });

// Testireitti
sovellus.get("/api/terve", (pyynto, vastaus) => {
  vastaus.json({ viesti: "Backendi toimii ja Mongo-yhteys yritetään!" });
});

// Tehtävä-reitit
sovellus.use("/api/tehtavat", tehtavaReitit);

const portti = process.env.PORT || 3001;

sovellus.listen(portti, () => {
  console.log(`Palvelin käynnissä portissa ${portti}`);
});