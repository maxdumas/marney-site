import React from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Link,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import { Surface } from "gl-react-dom";

import "./index.css";
import logoImage from "../assets/logo.png";
import Background from "./components/background/index";
import Home from "./components/home";
import Gallery from "./components/gallery";
import Project from "./components/project";
import Portfolio from "./components/portfolio";
import About from "./components/about";

const BackgroundSurface = () => {
  const { pathname } = useLocation();
  const lookUp = pathname !== "/" && pathname !== "/makes";

  return (
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
      <Background lookAngle={lookUp ? 1.0 : 0.5} />
    </Surface>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Router>
      <BackgroundSurface />
      <main className="content">
        <header className="nav">
          <div className="nav-left">
            <Link to="/" className="logo">
              <img className="logo" src={logoImage} />
            </Link>
          </div>
          <div className="nav-right">
            <Link to="/is">Contact/About</Link>
          </div>
        </header>

        {/* TODO: We need to get these components to unmount when transitioned out */}
        <AnimatedSwitch
          atEnter={{ opacity: 0, marginTop: "25px" }}
          atLeave={{ opacity: 0, marginTop: "25px" }}
          atActive={{ opacity: 1, marginTop: 0 }}
          style={{ position: "relative" }}
        >
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
          <Route path="/is">
            <About />
          </Route>
        </AnimatedSwitch>
      </main>
    </Router>,
    document.getElementById("app")
  );
});
