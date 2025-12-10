import express from "express";
import Tehtava from "../models/tehtavaModel.js";

const reititin = express.Router();

// Hae kaikki tehtävät
reititin.get("/", async (pyynto, vastaus) => {
  try {
    const tehtavat = await Tehtava.find().sort({ luotuAika: -1 });
    vastaus.json(tehtavat);
  } catch (virhe) {
    console.error("Virhe haettaessa tehtäviä:", virhe);
    vastaus.status(500).json({ virhe: "Tehtävien haku epäonnistui" });
  }
});

// Lisää uusi tehtävä
reititin.post("/", async (pyynto, vastaus) => {
  try {
    const { otsikko, kuvaus } = pyynto.body;

    if (!otsikko || !otsikko.trim()) {
      return vastaus.status(400).json({ virhe: "Otsikko on pakollinen" });
    }

    const uusiTehtava = new Tehtava({
      otsikko: otsikko.trim(),
      kuvaus: (kuvaus || "").trim(),
    });

    const tallennettu = await uusiTehtava.save();
    vastaus.status(201).json(tallennettu);
  } catch (virhe) {
    console.error("Virhe lisättäessä tehtävää:", virhe);
    vastaus.status(500).json({ virhe: "Tehtävän lisääminen epäonnistui" });
  }
});

// Päivitä tehtävä (esim. merkitse valmiiksi)
reititin.put("/:id", async (pyynto, vastaus) => {
  try {
    const { id } = pyynto.params;
    const { otsikko, kuvaus, valmis } = pyynto.body;

    const paivitettavat = {};

    if (otsikko !== undefined) paivitettavat.otsikko = otsikko;
    if (kuvaus !== undefined) paivitettavat.kuvaus = kuvaus;
    if (valmis !== undefined) paivitettavat.valmis = valmis;

    const paivitetty = await Tehtava.findByIdAndUpdate(id, paivitettavat, {
      new: true,
    });

    if (!paivitetty) {
      return vastaus.status(404).json({ virhe: "Tehtävää ei löytynyt" });
    }

    vastaus.json(paivitetty);
  } catch (virhe) {
    console.error("Virhe päivitettäessä tehtävää:", virhe);
    vastaus.status(500).json({ virhe: "Tehtävän päivitys epäonnistui" });
  }
});

// Poista tehtävä
reititin.delete("/:id", async (pyynto, vastaus) => {
  try {
    const { id } = pyynto.params;

    const poistettu = await Tehtava.findByIdAndDelete(id);

    if (!poistettu) {
      return vastaus.status(404).json({ virhe: "Tehtävää ei löytynyt" });
    }

    vastaus.status(204).end();
  } catch (virhe) {
    console.error("Virhe poistettaessa tehtävää:", virhe);
    vastaus.status(500).json({ virhe: "Tehtävän poisto epäonnistui" });
  }
});

export default reititin;