import { useState, useEffect } from "react";
import Header from "./components/Header";
import CharacterCard from "./components/CharacterCard";
import './App.css'

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((data) => {
          // Mezcla los personajes de forma aleatoria
        const shuffled = [...data.results].sort(() => Math.random() - 0.5);
        // Toma 5 aleatorios
        setCharacters(shuffled.slice(0, 5));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Header />
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>
    </div>
  );
}

export default App;
