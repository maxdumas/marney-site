import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Surface } from "gl-react-dom";

import "./index.css";
import logoImage from "../assets/logo.png";
import Background from "./components/background/index";
import Home from "./components/home";
import Gallery from "./components/gallery";
import Project from "./components/project";
import Portfolio from "./components/portfolio";

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
        <Background lookAngle={1.0} />
      </Surface>
      <main className="content">
        <header className="nav">
          <div className="nav-left">
            <a href="/" className="logo">
              <img className="logo" src={logoImage} />
            </a>
          </div>
          <div className="nav-right">
            <a href="/is">Contact/About</a>
          </div>
        </header>

        <Switch>
          <Route exact path="/">
            <Home onButtonClick={() => {}} />
          </Route>
          <Route exact path="/makes">
            <Portfolio />
          </Route>
          <Route path="/makes/:category">
            <Gallery />
          </Route>
          <Route path="/made/:projectId">
            <Project />
          </Route>
        </Switch>
      </main>
    </Router>,
    document.getElementById("app")
  );
});
