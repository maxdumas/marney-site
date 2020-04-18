import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import portfolioImage from "../../assets/port.png";

const Home = ({ onButtonClick }) => {
  const [isActive, setIsActive] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      setIsActive(true);
    }, 1000);
  }, []);

  const onClick = () => {
    setIsActive(!isActive);
    history.push("/makes/films");
    onButtonClick();
  };

  return (
    <div className="hero-container">
      <div className={"hero" + (isActive ? " active" : "")}>
        <div className="hero-clickable" onClick={onClick}>
          <img src={portfolioImage} />
        </div>
      </div>
    </div>
  );
};

export default Home;
