import React from "react";

export default function ModelViewerCard({ modelPath }) {
  return (
    <model-viewer
      src={modelPath}
      alt="Modelo Pokémon"
      auto-rotate
      camera-controls
      style={{ width: "200px", height: "200px", marginTop: "15px" }}
    ></model-viewer>
  );
}
