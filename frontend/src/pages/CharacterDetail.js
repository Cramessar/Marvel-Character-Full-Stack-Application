import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles.css";

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/characters/${id}`)
      .then((response) => {
        setCharacter(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching character:", err);
        setError("Failed to fetch character details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading character details...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!character) return <p className="text-warning">Character not found.</p>;

  return (
    <div className="character-detail">
      <img src={character.image_url} alt={character.name} className="character-image-large" />
      <h2 className="highlight-gold">{character.name}</h2>
      <h3 className="highlight-blue">{character.alias}</h3>
      <p><strong>Alignment:</strong> <span className={character.alignment === "hero" ? "hero-text" : "villain-text"}>{character.alignment}</span></p>
      <p><strong>Powers:</strong> {character.powers}</p>
      <Link to="/characters">
        <button className="btn-custom">Back to Characters</button>
      </Link>
    </div>
  );
}

export default CharacterDetail;
