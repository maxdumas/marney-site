import React from "react";

import portraitImage from "../../assets/portrait.jpg";
import { getAboutData } from "../data";

const About = () => {
  const { email, bio } = getAboutData();

  return (
    <div
      style={{
        margin: "0 64px",
        columns: 2,
        columnGap: "32px",
        columnWidth: "300px",
      }}
    >
      <div style={{ textAlign: "right" }}>
        <img src={portraitImage} style={{ height: "300px" }} />
      </div>
      <div>
        <div>
          <p>{bio}</p>
        </div>
        <div
          style={{
            marginTop: "16px",
          }}
        >
          <span
            style={{
              display: "inline-bock",
              border: "4px solid white",
              margin: "8px",
              padding: "8px",
            }}
          >
            {email}
          </span>
          <span
            style={{
              display: "inline-bock",
              border: "4px solid white",
              margin: "8px",
              padding: "8px",
            }}
          >
            Resume
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
