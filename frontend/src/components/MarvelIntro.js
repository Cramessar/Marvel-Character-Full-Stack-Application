import React from "react";
import "./MarvelIntro.css"; // Import CSS for animation
import marvelLogo from "../assets/marvel-logo.png"; // Marvel logo image
import comic1 from "../assets/comic1.jpg";
import comic2 from "../assets/comic2.jpg";
import comic3 from "../assets/comic3.jpg";
import comic4 from "../assets/comic4.jpg";

const MarvelIntro = () => {
  return (
    <div className="marvel-intro">
      <div className="comic-flip">
        <img src={comic1} alt="Comic 1" className="comic-page" />
        <img src={comic2} alt="Comic 2" className="comic-page" />
        <img src={comic3} alt="Comic 3" className="comic-page" />
        <img src={comic4} alt="Comic 4" className="comic-page" />
      </div>
      <img src={marvelLogo} alt="Marvel Logo" className="marvel-logo" />
    </div>
  );
};

export default MarvelIntro;
