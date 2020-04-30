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
    const imagefilename = images[category][project.id]["0"];

    return (
      <Link
        key={project.id}
        to={`/made/${project.id}`}
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "16px",
          padding: "16px",
          textAlign: "center",
          fontSize: "24px",
        }}
      >
        <img
          style={{ height: "250px", width: "250px", objectFit: "cover" }}
          src={imagefilename}
        />
        <span style={{ marginTop: "8px" }}>{project.title}</span>
      </Link>
    );
  };

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        padding: "0 64px",
        boxSizing: "border-box",
      }}
    >
      {projects.map(getProjectThumbnail)}
    </div>
  );
};

export default Gallery;
