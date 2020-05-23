import React, { useState } from "react";
import Maquette from "./components/Maquette/Maquette";
import MaquetteTheme from "./components/Maquette/Theme";
import useMaquetteStore, { maquetteApi } from "./components/Maquette/store";

import HOME_TEMPLATE from "./templates/home";
import ABOUT_TEMPLATE from "./templates/about";
import NAV from "./templates/nav";

import "./normalize.css";
import "./styles.css";

const maquette = {
  state: "initial",
  stateMap: {
    global: ["initial"],
    default_button: ["initial"],
    clicker: ["initial"],
    masthead: ["initial"]
  },
  fonts: [
    {
      href: `https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap`,
      stack: `'DM Sans', sans-serif`
    },
    {
      href: `https://fonts.googleapis.com/css2?family=DM+Mono:wght@300&display=swap`,
      stack: `'DM Mono', monospace`
    }
    /*{
      href: `https://mattnicholson.github.io/fonts/Bagnard/font-face.css`,
      stack: `'Bagnard',serif`
    },
    {
      href: `https://mattnicholson.github.io/fonts/Nimbus_Sans_L/font-face.css`,
      stack: `'Nimbus Sans L',sans-serif`
    }*/
  ],
  theme: {
    spacing: 16,
    background: {
      default: "#000"
    },
    color: {
      default: "#FFF"
    },
    buttons: {
      spacing: 1,
      roundness: 2
    }
  },
  elements: [
    [
      "root",
      { id: "main" },
      [
        [
          "box",
          {
            id: "homepage",
            x: 0,
            y: 0,
            w: 1,
            h: 3,
            opacity: 1,
            /*exit: {
              opacity: 0
            },*/
            initial: {
              opacity: 1
            },

            hidden: false,
            variants: {
              "global.active": { hidden: true }
            }
          },
          HOME_TEMPLATE
        ],
        [
          "box",
          {
            id: "aboutpage",
            hidden: true,
            x: 0,
            y: 0,
            w: 1,
            h: 3,
            opacity: 1,
            initial: {
              opacity: 1
            },
            /*exit: {
              opacity: 0
            },*/
            variants: {
              "global.active": { hidden: false }
            }
          },
          ABOUT_TEMPLATE
        ],
        NAV
      ]
    ]
  ]
};

maquetteApi.setState(maquette);

export default function App() {
  const [ready, setReady] = useState("loading");

  return (
    <div className={`App App--${ready}`}>
      <MaquetteTheme settings={maquette} loaded={() => setReady("ready")}>
        <Maquette
          settings={maquette}
          root={maquette.elements.find(e => e[0] === "root")}
        />
      </MaquetteTheme>
    </div>
  );
}
