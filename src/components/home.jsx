import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import portfolioImage from "../../assets/port.png";

const Home = () => (
  <div
    style={{
      position: "absolute",
      display: "flex",
      width: "100%",
      justifyContent: "center",
    }}
  >
    <div className="hero">
      <Link className="hero-clickable" to="/makes">
        <img src={portfolioImage} />
      </Link>
    </div>
  </div>
);

export default Home;
