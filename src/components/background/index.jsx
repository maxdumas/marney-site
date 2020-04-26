import React, { useEffect, useRef } from "react";
import { Shaders, Node, GLSL } from "gl-react";

import fsSource from "./fragment-shader.glsl";

const shaders = Shaders.create({
  background: {
    frag: GLSL`${fsSource}`,
  },
});

const Background = ({ lookAngle }) => {
  const node = useRef(null);

  useEffect(() => {
    let handle = null;
    function render(now) {
      const time = now / 1000;
      if (node.current) {
        node.current.setDrawProps({
          uniforms: {
            time,
            lookPos: [0.5, lookAngle],
            resolution: [document.body.clientWidth, document.body.clientHeight],
          },
        });
      }
      // The image is static if we are looking straight up, so don't bother
      // re-rendering if we get to that point.
      if (lookAngle < 0.99) {
        handle = requestAnimationFrame(render);
      }
    }
    handle = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(handle);
    };
  }, [lookAngle]);

  return (
    <Node
      ref={node}
      shader={shaders.background}
      uniforms={{
        time: 0,
        lookPos: [0.0, lookAngle],
        resolution: [document.body.clientWidth, document.body.clientHeight],
      }}
    />
  );
};

export default Background;
