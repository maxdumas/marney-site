import React from "react";
import { useParams } from "react-router-dom";

const Gallery = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Sup dingbat. I make {id}. </h1>
    </div>
  );
};

export default Gallery;
