# Väliprojekti – Tehtävälista (ToDo-sovellus)

Tämän projektin tarkoituksena on tehdä yksinkertainen tehtävälista, jossa käyttäjä voi lisätä omia tehtäviään, merkitä niitä tehdyksi ja poistaa niitä. Projektissa käytän Reactia, Node.js:ää, Expressiä, MongoDB:tä ja GitHubia.

## Sovelluksen toiminta

Sovelluksessa voi:

- Lisätä uuden tehtävän (otsikko + halutessa kuvaus)
- Merkitä tehtävän tehdyksi
- Poistaa tehtävän listalta

## Käyttöliittymä

Sovelluksessa on yksi näkymä, jossa on:

- Otsikko
- Lomake uuden tehtävän lisäämiseen
- Lista kaikista tehtävistä

Jokaisella tehtävällä näkyy:

- otsikko
- kuvaus (jos annettu)
- nappi tai checkbox tehtävän merkitsemiseen tehdyksi
- poista-nappi

## Rakenne

### Frontend (React)

Teen seuraavat komponentit:

- **App** – pääkomponentti, jossa sovelluksen tila
- **TehtavaLista** – näyttää tehtävälistan
- **TehtavaRivi** – näyttää yhden tehtävän rivin
- **UusiTehtavaLomake** – lomake uuden tehtävän lisäämistä varten

Frontend tulee kansioon: `frontend`

### Backend (Node + Express + MongoDB)

Backend tulee kansioon: `backend`

Backendissä on yksi tietomalli:

- **Tehtava**, jossa on:
  - otsikko
  - kuvaus
  - valmis-tieto
  - luontiaika

REST API -reitit (`/api/tehtavat`):

- **GET** – hakee kaikki tehtävät
- **POST** – lisää tehtävän
- **PUT** – muokkaa tehtävää (esim. merkitse tehdyksi)
- **DELETE** – poistaa tehtävän