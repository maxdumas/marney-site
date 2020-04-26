import React from "react";

import { getCategories } from "../data";

const Portfolio = () => {
  const categories = getCategories();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
      }}
    >
      {categories.map((category) => (
        <a
          key={category.id}
          href={`/makes/${category.id}`}
          style={{
            display: "block",
            height: "100%",
            flexGrow: 1,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            textAlign: "center",
            padding: "16px 0",
            margin: "0 16px",
            fontSize: "34pt",
          }}
        >
          {category.name}
        </a>
      ))}
    </div>
  );
};

export default Portfolio;
