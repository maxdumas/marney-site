import React from "react";
import ReactMarkdown from "react-markdown";

import portraitImage from "../../assets/portrait.jpg";
import businessCard from "../../assets/logo2.jpg";
import resume from "../../assets/resume.pdf";
import { getAboutData } from "../data";

const About = () => {
  const { email, bio } = getAboutData();

  return (
    <div
      style={{
        margin: "0 25%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <img src={portraitImage} style={{ width: "300px" }} />
        <div style={{ flexGrow: 1, marginLeft: "8px" }}>
          <ReactMarkdown>{bio}</ReactMarkdown>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          margin: "32px 0",
        }}
      >
        <img src={businessCard} style={{ width: "300px" }} />
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              display: "block",
              border: "4px solid white",
              margin: "8px",
              padding: "8px",
            }}
          >
            {email}
          </span>
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
