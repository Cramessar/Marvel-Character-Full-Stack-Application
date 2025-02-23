import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles.css";
import MarvelIntro from "../components/MarvelIntro";
import stanLee from "../assets/stan-lee.jpg"; // Stan Lee's image

const Home = () => {
  const [featuredCharacters, setFeaturedCharacters] = useState([]);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/characters")
      .then((response) => {
        const shuffled = response.data.sort(() => 0.5 - Math.random());
        setFeaturedCharacters(shuffled.slice(0, 3));
      })
      .catch((error) => console.error("Error fetching characters:", error));

    setTimeout(() => {
      setShowIntro(false);
    }, 3000);
  }, []);

  return (
    <div className="home-container">
      {/* Marvel Intro Animation */}
      {showIntro && <MarvelIntro />}

      {!showIntro && (
        <>
          {/* Hero Section */}
          <div className="hero">
            <h1 className="highlight-gold">Welcome to the Marvel Character Hub</h1>
            <p className="highlight-blue">
              Explore your favorite heroes and villains with a unique touch.
            </p>
            <Link to="/characters">
              <button className="btn-custom">View Characters</button>
            </Link>
          </div>

          {/* Marvel Universe Section */}
          <div className="marvel-universe">
            <h2 className="highlight-blue">The Marvel Universe: A Legacy of Stories</h2>
            <p>
              The Marvel Universe is one of the most expansive and beloved storytelling franchises in history.
              Beginning in the **1930s** as **Timely Comics**, Marvel introduced characters that have since become
              cultural icons. The **Silver Age of Comics** in the **1960s** saw the rise of heroes like
              **Spider-Man, The X-Men, The Fantastic Four, and The Avengers**. These characters, crafted with
              real-world problems and relatable struggles, revolutionized the superhero genre.
            </p>
            <p>
              Over the years, Marvel's stories have extended beyond comics into **movies, TV shows, and animated
              series**. The **Marvel Cinematic Universe (MCU)**, launched in 2008 with *Iron Man*, has become
              the highest-grossing film franchise of all time. Classics like *X-Men: The Animated Series* and
              *Spider-Man: The Animated Series* defined childhoods in the **1990s**, while newer entries like
              *What If...?* continue to push boundaries.
            </p>
            <p>
              Whether it’s the **Infinity Gauntlet** storyline in comics, *Avengers: Endgame* in cinema, or
              *Marvel’s Spider-Man* on PlayStation, Marvel continues to shape and redefine the superhero genre.
            </p>
          </div>

          {/* Featured Characters Section */}
          <div className="featured-characters">
            <h2 className="highlight-blue">Featured Characters</h2>
            <div className="character-grid">
              {featuredCharacters.map((char) => (
                <div key={char.id} className="character-card">
                  <h3 className="highlight-gold">{char.name}</h3>
                  <Link to={`/characters/${char.id}`}>
                    <img src={char.image_url} alt={char.name} className="character-image"/>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Stan Lee Tribute Section */}
          <div className="stan-lee-section">
            <h2 className="highlight-gold">Stan Lee: The Architect of Marvel</h2>
            <div className="stan-lee-content">
              <img src={stanLee} alt="Stan Lee" className="stan-lee-image" />
              <div className="stan-lee-text">
                <p>
                  **Stan Lee** (1922-2018) was more than just a comic book writer—he was the visionary behind the
                  Marvel Universe. Co-creating heroes like **Spider-Man, Iron Man, The Hulk, Black Panther, Thor,
                  and The X-Men**, his stories brought depth and humanity to superheroes.
                </p>
                <p>
                  Lee’s **dynamic storytelling** and **groundbreaking social commentary** reshaped the comic
                  book industry. His influence extended beyond the page, appearing in **Marvel films**, advocating
                  for fans, and inspiring countless creators.
                </p>
                <p>
                  With his famous phrase, *"Excelsior!"*, Stan Lee left behind a legacy that will forever
                  resonate in the hearts of Marvel fans around the world.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
