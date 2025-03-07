import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles.css";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 6;

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/characters")
      .then((response) => setCharacters(response.data))
      .catch((error) => console.error("Error fetching characters:", error));
  }, []);

  const filteredCharacters = characters.filter((char) => {
    if (filter === "all") return char.name.toLowerCase().includes(search.toLowerCase());
    return (filter === "heroes" ? char.alignment === "hero" : char.alignment === "villain") &&
           char.name.toLowerCase().includes(search.toLowerCase());
  });

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = filteredCharacters.slice(indexOfFirstCharacter, indexOfLastCharacter);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="page-container">
      <h2 className="highlight-gold">Marvel Characters</h2>

      <input
        type="text"
        placeholder="Search for a character..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select className="filter-dropdown" onChange={(e) => setFilter(e.target.value)}>
        <option value="all">Show All</option>
        <option value="heroes">Only Heroes</option>
        <option value="villains">Only Villains</option>
      </select>

      <div className="character-grid">
        {currentCharacters.map((char) => (
          <div key={char.id} className="character-card">
            <h3 className="highlight-gold">{char.name}</h3>
            <Link to={`/characters/${char.id}`}>
              <img src={char.image_url} alt={char.name} className="character-image" />
            </Link>
          </div>
        ))}
      </div>

/* TODO: to do use  navigate, link on click. */
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredCharacters.length / charactersPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className="pagination-btn">
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Characters;
