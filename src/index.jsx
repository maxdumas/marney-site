import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./index.css";
import logoImage from "../assets/logo.png";
import { initializeBackground } from "./background";
import Home from "./components/home";
import Gallery from "./components/gallery";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  const backgroundContext = null; //initializeBackground(canvas);

  // TODO: Everything about this is pretty rough. Let's find a more reasonable solution here.
  const panUpTransition = () => {
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
  };

  render(
    <Router>
      <div>
        <header className="nav">
          <div className="nav-left">
            <div className="logo">
              <img className="logo" src={logoImage} />
            </div>
          </div>
        </header>

        <Switch>
          <Route exact path="/">
            <Home onButtonClick={panUpTransition} />
          </Route>
          <Route path="/makes/:category">
            <Gallery />
          </Route>
        </Switch>
      </div>
    </Router>,
    document.getElementById("app")
  );
});
