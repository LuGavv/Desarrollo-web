import React from "react";
import Card from "./Card";

const cards = [
  {
    id: "p1",
    name: "Pikachu",
    image: "/assets/pikachu.png",
    model: "/models/pikachu.glb",
    state: "disponible",
  },
  {
    id: "p2",
    name: "Charizard",
    image: "/assets/charizard.png",
    model: "/models/charizard.glb",
    state: "disponible",
  },
  {
    id: "p3",
    name: "Bulbasaur",
    image: "/assets/bulbasaur.png",
    model: "/models/bulbasaur.glb",
    state: "disponible",
  },
  {
    id: "p4",
    name: "Squirtle",
    image: "/assets/squirtle.png",
    model: "/models/squirtle.glb",
    state: "disponible",
  },
  {
    id: "p5",
    name: "Gengar",
    image: "/assets/gengar.png",
    model: "/models/gengar.glb",
    state: "disponible",
  },
];

export default function CardList({ onInvoke }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {cards.map((card) => (
        <Card key={card.id} card={card} onInvoke={onInvoke} />
      ))}
    </div>
  );
}
