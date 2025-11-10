import React, { useState } from "react";
import ModelViewerCard from "./ModelViewerCard";

export default function Card({ card, onInvoke }) {
  const [estado, setEstado] = useState(card.state);

  const handleInvoke = () => {
    if (estado === "disponible") {
      setEstado("invocado");
      onInvoke(card);
    }
  };

  return (
    <div className={`card ${estado === "invocado" ? "glow" : ""}`}>
      <h2>{card.name}</h2>
      <img src={card.image} alt={card.name} />
      <p>Estado: {estado}</p>

      <ModelViewerCard modelPath={card.model} />

      <button
        className={estado === "invocado" ? "invocado" : "invocar"}
        onClick={handleInvoke}
        disabled={estado === "invocado"}
      >
        {estado === "invocado" ? "Invocado" : "Invocar"}
      </button>
    </div>
  );
}
