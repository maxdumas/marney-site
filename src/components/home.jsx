import React, { useState, useEffect } from "react";

import logoImage from "../../assets/logo.png";
import portfolioImage from "../../assets/port.png";

const Home = ({ onButtonClick }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsActive(true);
    }, 1000);
  }, []);

  return (
    <div>
      <header className="nav">
        <div className="nav-left">
          <div className="logo">
            <img className="logo" src={logoImage} />
          </div>
        </div>
      </header>
      <div className="hero-container">
        <div className={"hero" + (isActive ? " active" : "")}>
          <div className="hero-clickable" onClick={onButtonClick}>
            <img src={portfolioImage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
