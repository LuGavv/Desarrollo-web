export default function CharacterCard({ character }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "1rem",
      margin: "1rem",
      width: "200px",
      textAlign: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <img 
        src={character.image} 
        alt={character.name} 
        style={{ width: "100%", borderRadius: "10px" }} 
      />
      <h2>{character.name}</h2>
      <p>Especie: {character.species}</p>
      <p>Estado: {character.status}</p>
    </div>
);
}