import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles.css";
import MarvelIntro from "../components/MarvelIntro";
import stanLee from "../assets/stan-lee.jpg";

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
      {showIntro && <MarvelIntro />}

      {!showIntro && (
        <>
          <div className="hero">
            <h1 className="highlight-gold">Welcome to the Marvel Character Hub</h1>
            <p className="highlight-blue">
              Explore your favorite heroes and villains with a unique touch.
            </p>
            <Link to="/characters">
              <button className="btn-custom">View Characters</button>
            </Link>
          </div>

          <div className="marvel-universe">
            <h2 className="highlight-blue">The Marvel Universe: A Legacy of Stories</h2>
            <p>
              The Marvel Universe is one of the most expansive and beloved storytelling franchises in history.
              Beginning in the <strong className="highlight-blue">1930s</strong> as <strong className="highlight-blue">Timely Comics</strong>, Marvel introduced characters that have since become
              cultural icons. The <strong className="highlight-blue">Silver Age of Comics</strong> in the <strong className="highlight-blue">1960s</strong> saw the rise of heroes like
              <strong className="highlight-blue"> Spider-Man, The X-Men, The Fantastic Four, and The Avengers</strong>. These characters, crafted with
              real-world problems and relatable struggles, revolutionized the superhero genre.
            </p>
            <p>
              Over the years, Marvel's stories have extended beyond comics into <strong className="highlight-blue">movies, TV shows, and animated
              series</strong>. The <strong className="highlight-blue">Marvel Cinematic Universe (MCU)</strong>, launched in 2008 with <em>Iron Man</em>, has become
              the highest-grossing film franchise of all time. Classics like <em>X-Men: The Animated Series</em> and
              <em> Spider-Man: The Animated Series</em> defined childhoods in the <strong className="highlight-blue">1990s</strong>, while newer entries like
              <em> What If...?</em> continue to push boundaries.
            </p>
            <p>
              Whether it’s the <strong className="highlight-blue">Infinity Gauntlet</strong> storyline in comics, <em>Avengers: Endgame</em> in cinema, or
              <em> Marvel’s Spider-Man</em> on PlayStation, Marvel continues to shape and redefine the superhero genre.
            </p>
          </div>

          <div className="featured-characters">
            <h2 className="highlight-gold">Featured Characters</h2>
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

          <div className="stan-lee-section">
            <h2 className="highlight-blue">Stan Lee: The Architect of Marvel</h2>
            <div className="stan-lee-content">
              <img src={stanLee} alt="Stan Lee" className="stan-lee-image" />
              <div className="stan-lee-text">
                <p>
                  <strong className="highlight-blue">Stan Lee</strong> (1922-2018) was more than just a comic book writer—he was the visionary behind the
                  Marvel Universe. Co-creating heroes like <strong className="highlight-blue">Spider-Man, Iron Man, The Hulk, Black Panther, Thor,
                  and The X-Men</strong>, his stories brought depth and humanity to superheroes.
                </p>
                <p>
                  Lee’s <strong className="highlight-blue">dynamic storytelling</strong> and <strong className="highlight-blue">groundbreaking social commentary</strong> reshaped the comic
                  book industry. His influence extended beyond the page, appearing in <strong className="highlight-blue">Marvel films</strong>, advocating
                  for fans, and inspiring countless creators.
                </p>
                <p>
                  With his famous phrase, <em>"Excelsior!"</em>, Stan Lee left behind a legacy that will forever
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
