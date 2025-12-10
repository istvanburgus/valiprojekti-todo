import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tehtavat, asetaTehtavat] = useState([]);
  const [otsikko, asetaOtsikko] = useState("");
  const [kuvaus, asetaKuvaus] = useState("");

  // Haetaan tehtävät backendistä kun sovellus käynnistyy
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/tehtavat")
      .then((vastaus) => {
        asetaTehtavat(vastaus.data);
      })
      .catch((virhe) => {
        console.error("Virhe haettaessa tehtäviä:", virhe);
      });
  }, []);

  // Uuden tehtävän lisääminen
  const lisaatehtava = (e) => {
    e.preventDefault();

    if (!otsikko.trim()) {
      return;
    }

    axios
      .post("http://localhost:3001/api/tehtavat", {
        otsikko: otsikko.trim(),
        kuvaus: kuvaus.trim(),
      })
      .then((vastaus) => {
        // lisätään uusi tehtävä listan alkuun
        asetaTehtavat([vastaus.data, ...tehtavat]);
        asetaOtsikko("");
        asetaKuvaus("");
      })
      .catch((virhe) => {
        console.error("Virhe lisättäessä tehtävää:", virhe);
      });
  };

  // Tehtävän poistaminen
  const poistaTehtava = (id) => {
    axios
      .delete(`http://localhost:3001/api/tehtavat/${id}`)
      .then(() => {
        asetaTehtavat(tehtavat.filter((t) => t._id !== id && t.id !== id));
      })
      .catch((virhe) => {
        console.error("Virhe poistettaessa tehtävää:", virhe);
      });
  };

  // Tehtävän merkitseminen valmiiksi / ei valmiiksi
  const vaihdaValmis = (id, nykyinenValmis) => {
    axios
      .put(`http://localhost:3001/api/tehtavat/${id}`, {
        valmis: !nykyinenValmis,
      })
      .then((vastaus) => {
        const paivitetty = vastaus.data;
        asetaTehtavat(
          tehtavat.map((t) =>
            t._id === id || t.id === id ? paivitetty : t
          )
        );
      })
      .catch((virhe) => {
        console.error("Virhe päivitettäessä tehtävää:", virhe);
      });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h1>Tehtävälista</h1>

      <form onSubmit={lisaatehtava}>
        <input
          type="text"
          placeholder="Otsikko"
          value={otsikko}
          onChange={(e) => asetaOtsikko(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Kuvaus"
          value={kuvaus}
          onChange={(e) => asetaKuvaus(e.target.value)}
          style={{ width: "100%", height: "60px", marginTop: "0.5rem" }}
        />
        <br />
        <button type="submit" style={{ marginTop: "0.5rem" }}>
          Lisää tehtävä
        </button>
      </form>

      <hr />

      <ul>
        {tehtavat.map((t) => (
          <li key={t._id || t.id}>
            <label>
              <input
                type="checkbox"
                checked={t.valmis}
                onChange={() => vaihdaValmis(t._id || t.id, t.valmis)}
              />
              <span
                style={{
                  textDecoration: t.valmis ? "line-through" : "none",
                  marginLeft: "0.5rem",
                }}
              >
                <strong>{t.otsikko}</strong>
              </span>
            </label>
            <br />
            <small>{t.kuvaus}</small>
            <br />
            {t.luotuAika && (
              <small>{new Date(t.luotuAika).toLocaleString()}</small>
            )}
            <br />
            <button
              onClick={() => poistaTehtava(t._id || t.id)}
              style={{ marginTop: "0.5rem" }}
            >
              Poista
            </button>
            <br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
