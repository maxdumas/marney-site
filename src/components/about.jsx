import React from "react";

import portraitImage from "../../assets/portrait.jpg";
import resume from "../../assets/resume.pdf";
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
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <a
            href={`mailto:${email}`}
            style={{
              display: "block",
              border: "4px solid white",
              margin: "8px",
              padding: "8px",
            }}
          >
            email
          </a>
          <a
            href={resume}
            style={{
              display: "block",
              border: "4px solid white",
              margin: "8px",
              padding: "8px",
            }}
          >
            Resume
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
