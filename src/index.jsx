import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Surface } from "gl-react-dom";

import "./index.css";
import logoImage from "../assets/logo.png";
import Background from "./components/background/index";
import Home from "./components/home";
import Gallery from "./components/gallery";

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Router>
      <Surface
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        width={document.body.clientWidth}
        height={document.body.clientHeight}
        pixelRatio={1}
      >
        <Background lookAngle={0.5} />
      </Surface>
      <main className="content">
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
              <Home onButtonClick={() => {}} />
            </Route>
            <Route path="/makes/:category">
              <Gallery />
            </Route>
          </Switch>
        </div>
      </main>
    </Router>,
    document.getElementById("app")
  );
});
