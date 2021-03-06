import React from "react";
import { Link } from "react-router-dom";

import { getCategories } from "../data";

const Portfolio = () => {
  const categories = getCategories();

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px 0",
      }}
    >
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/makes/${category.id}`}
          style={{
            display: "block",
            height: "100%",
            flexGrow: 1,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            textAlign: "center",
            padding: "16px 0",
            margin: "0 16px",
            fontSize: "24pt",
          }}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default Portfolio;
