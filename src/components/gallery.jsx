import React from "react";
import { Link, useParams } from "react-router-dom";

import { getProjectsForCategory } from "../data";

import images from "../../assets/project-photos/**/*.jpg";

const Gallery = () => {
  const { category } = useParams();

  const projects = getProjectsForCategory(category);

  if (!projects) {
    return "Bunk bro";
  }

  const getProjectThumbnail = (project) => {
    const imagefilename = project.images[0].filename;

    return (
      <Link
        key={project.id}
        to={`/made/${project.id}`}
        style={{
          display: "flex",
          flexDirection: "column",
          // backgroundColor: "rgba(255, 255, 255, 0.3)",
          margin: "16px",
          padding: "16px",
          textAlign: "center",
          fontSize: "24px",
          // boxShadow: "5px 0px 10px rgba(0, 0, 0, 0.25)",
        }}
      >
        <img
          style={{ height: "250px", width: "250px", objectFit: "cover" }}
          src={images[category][project.id][imagefilename]}
        />
        <span style={{ marginTop: "8px" }}>{project.title}</span>
      </Link>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",

        margin: "0 64px",
      }}
    >
      {projects.map(getProjectThumbnail)}
    </div>
  );
};

export default Gallery;
