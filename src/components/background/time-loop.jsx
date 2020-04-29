import React, { useEffect, useState } from "react";
import raf from "raf";

const timeLoop = (C, { refreshRate = 60 } = {}) => (props) => {
  const [{ time, tick }, setState] = useState({ time: 0, tick: 0 });
  useEffect(() => {
    let startTime, lastTime;
    let interval = 1000 / refreshRate;
    lastTime = -interval;
    let r;
    const loop = (t) => {
      r = raf(loop);
      if (!startTime) startTime = t;
      if (t - lastTime > interval) {
        lastTime = t;
        setState({
          time: t - startTime,
          tick: tick + 1,
        });
      }
    };
    r = raf(loop);

    return () => {
      raf.cancel(r);
    };
  }, []);

  return <C {...props} time={time} tick={tick} />;
};

export default timeLoop;
