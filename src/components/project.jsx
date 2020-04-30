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

  const getImageContainer = (imageUrl, i) => {
    const otherImageInfo = project.images && project.images[i];

    return (
      <a
        key={imageUrl}
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
        }}
      >
        {otherImageInfo && (
          <span style={{ display: "block", marginBottom: "16px" }}>
            {image.name}
          </span>
        )}
        <img
          style={{ display: "block", width: "100%", objectFit: "contain" }}
          src={imageUrl}
        ></img>
      </a>
    );
  };

  return (
    <article
      style={{
        position: "absolute",
        textAlign: "center",
        margin: "0 64px",
      }}
    >
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
        <div style={{ display: "block", margin: "0 auto", maxWidth: "500px" }}>
          <ReactMarkdown source={project.description} />
        </div>
      </section>
      <section
        style={{
          columnWidth: 500,
          columnGap: 0,
        }}
      >
        {Object.values(images[project.category][project.id]).map(
          getImageContainer
        )}
      </section>
    </article>
  );
};

export default Project;
