import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { getProjectById } from "../data";

import images from "../../assets/project-photos/**/*.jpg";

const Project = () => {
  const { projectId } = useParams();

  const project = getProjectById(projectId);

  if (!project) {
    // TODO: Create a 404 page
    return "Page not found!";
  }

  const getImageContainer = (image) => {
    const imageUrl = images[project.category][project.id][image.filename];

    return (
      <a
        key={image.filename}
        href={imageUrl}
        target="_blank"
        style={{
          display: "inline-block",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          margin: "16px",
          padding: "16px",
          textAlign: "center",
          fontSize: "24px",
          boxShadow: "5px 0px 10px rgba(0, 0, 0, 0.25)",
          maxWidth: "500px",
        }}
      >
        <span style={{ display: "block", marginBottom: "16px" }}>
          {image.name}
        </span>
        <img
          style={{ display: "block", width: "100%", objectFit: "contain" }}
          src={imageUrl}
        ></img>
      </a>
    );
  };

  return (
    <article style={{ textAlign: "center", margin: "0 64px" }}>
      <section
        style={{
          paddingBottom: "32px",
          borderBottom: "2px solid rgba(255, 255, 255, 0.25)",
          marginBottom: "32px",
        }}
      >
        <header>
          <h1>{project.title}</h1>
        </header>
        <ReactMarkdown source={project.description} />
      </section>
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {project.images.map(getImageContainer)}
      </section>
    </article>
  );
};

export default Project;
