import React, { useEffect, useRef } from "react";
import { Shaders, Node, GLSL } from "gl-react";
import { Motion, spring, presets } from "react-motion";

import timeLoop from "./time-loop";
import fsSource from "./fragment-shader.glsl";

const shaders = Shaders.create({
  background: {
    frag: GLSL`${fsSource}`,
  },
});

const TimedWaves = timeLoop(({ time, lookAngle }) => (
  <Node
    shader={shaders.background}
    uniforms={{
      time: time / 1000,
      lookPos: [0.0, lookAngle],
      resolution: [document.body.clientWidth, document.body.clientHeight],
    }}
  />
));

const Background = ({ lookAngle: desiredLookAngle }) => (
  <Motion style={{ lookAngle: spring(desiredLookAngle, [75, 10]) }}>
    {({ lookAngle }) => <TimedWaves lookAngle={lookAngle} />}
  </Motion>
);

export default Background;
