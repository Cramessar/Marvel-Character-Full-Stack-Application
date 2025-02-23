import React from "react";
import { Link } from "react-router-dom";
import deadpoolGif from "../assets/deadpool.gif";

function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="highlight-gold">404 - Lost in the Multiverse!</h1>
      <p className="highlight-blue">
        Oops! This page has been <strong>snapped out of existence</strong> or it's hiding in a <strong>parallel dimension</strong>.
      </p>
      <img 
        src={deadpoolGif} // you wouldnt belive how long it took me to decide on a gif.
        alt="Deadpool confused" 
        className="not-found-gif" 
      />
      <p className="highlight-blue">
        But don't worry, <strong>even Deadpool</strong> gets lost sometimes.  
        <br /> Let’s <strong>get you back on track!</strong>
      </p>
      <Link to="/" className="btn-custom">Return to Safety</Link>
    </div>
  );
}

export default NotFound;
