import { initializeBackground } from "./background";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  const backgroundContext = initializeBackground(canvas);

  // TODO: Everything about this is pretty rough. Let's find a more reasonable solution here.
  const button = document.getElementById("main-button");
  button.addEventListener("click", () => {
    let then = 0;
    function render(now) {
      now /= 1000;
      if (then === 0) {
        then = now;
      }

      backgroundContext.lookAngle += 0.25 * (now - then);
      then = now;
      if (backgroundContext.lookAngle < 1.0) {
        requestAnimationFrame(render);
      }
    }
    requestAnimationFrame(render);

    const heroElement = document.getElementById("hero");
    heroElement.classList.remove("active");
  });
});
