import React, { useState } from "react";
import Maquette from "./components/Maquette/Maquette";
import MaquetteTheme from "./components/Maquette/Theme";
import useMaquetteStore, { maquetteApi } from "./components/Maquette/store";

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
          // Section 1
          "viewport",
          {
            id: "masthead",
            background: "#000",
            color: "#FFF",
            opacity: 0,
            variants: {
              // Global states prefixed with global.
              "global.active": { color: "#555" },
              // Element states prefixed with {id}.{state}
              "default_button.active": { color: "#0000FF" },
              // Element states without any prefixing
              active: { color: "#333", borderRadius: `10px` }
            },
            breakpoints: {
              mobile: { border: "10px solid white" }
            }
          },
          [
            [
              "box",
              {
                id: "masthead_img_box",
                x: 0,
                y: 0,
                w: 1,
                h: 1
              },
              [
                [
                  "image",
                  {
                    id: "masthead_img",
                    x: 0,
                    y: 0,
                    w: 1,
                    h: 1,
                    layout: "cover",
                    effects: [["fadeIn"]],
                    src: "https://picsum.photos/1920/1080"
                  }
                ],
                [
                  "box",
                  {
                    id: "masthead_blackout",
                    x: 0,
                    y: 0,
                    w: 1,
                    h: 1,
                    background: `rgba(0,0,0,0.3)`,
                    variants: {
                      "global.active": {
                        background: `rgba(0,0,0,0.8)`
                      }
                    },
                    transition: {
                      duration: 1
                    }
                  }
                ]
              ]
            ],
            [
              "box",
              {
                id: "masthead_text_box",
                x: 0,
                y: 0.5,
                w: 1,
                h: 0,
                fixed: false
              },
              [
                [
                  "text",
                  {
                    id: "masthead_text",
                    x: 0,
                    y: 0,
                    w: 1,
                    h: 1,
                    layout: "center",
                    style: "hero",
                    content: "Hero"
                  }
                ]
              ]
            ]
          ]
        ],
        // Section 2
        [
          "viewport",
          { id: "section2", background: "#DDD", color: "#222" },
          [
            [
              "box",
              {
                id: "spread_img",
                x: 0.5,
                y: 0,
                w: 0.5,
                h: 1,
                background: `#666`
              },
              [
                [
                  "image",
                  {
                    layout: "center",
                    src: "https://picsum.photos/1200/800"
                  }
                ]
              ]
            ],
            [
              "box",
              {
                id: "spread_text",
                x: 0,
                y: 0,
                w: 0.5,
                h: 1,
                spacing: 1
              },
              [
                [
                  "text",
                  {
                    content: "Heading 2",
                    style: "h2"
                  }
                ],
                [
                  "text",
                  {
                    content: "Heading 3",
                    style: "h3"
                  }
                ],
                [
                  "text",
                  {
                    content: "Heading 4",
                    style: "h4"
                  }
                ],
                [
                  "text",
                  {
                    content:
                      "Lorem ipsum dolor sit amet consecetuer adipscing elit",
                    style: "p"
                  }
                ],
                [
                  "button",
                  {
                    id: "default_button",
                    content: "Button",
                    variants: {
                      active: { background: "#FF0000" }
                    },
                    effects: [["scaleHover", {}], ["toggle", { id: "global" }]]
                  }
                ]
              ]
            ]
          ]
        ],
        [
          "alias",
          {
            id: "section3",
            alias: "masthead",
            masthead: { background: "#FFF", color: "#111" },
            masthead_img: {
              src: "https://picsum.photos/seed/23/1920/1080?random=2"
            },
            masthead_text: { content: "Another Heading" }
          }
        ],
        // Nav
        [
          "box",
          { id: "header", fixed: true, x: 0, y: 0, w: 1, h: 0.2 },
          [
            [
              "box",
              {
                id: "logo_box",
                x: 0,
                y: 0,
                w: 0.2,
                h: 0,
                spacing: 1,
                color: "white"
              },
              [
                [
                  "text",
                  {
                    content: "maquette.",
                    style: "logo",
                    component: "div"
                  }
                ]
              ]
            ],
            [
              "box",
              {
                id: "logo_box",
                x: 0.2,
                y: 0,
                w: 0.8,
                h: 0,
                spacing: 1,
                textAlign: "right"
              },
              [
                [
                  "alias",
                  {
                    alias: "default_button",
                    id: "clicker",
                    default_button: {
                      content: "Go Dark",
                      //component: "a",
                      background: "#4b42f5",
                      color: "#FFFFFF",
                      variants: {
                        "global.active": {
                          background: "#222",
                          content: "Go Light"
                        }
                      }
                    }
                  }
                ]
              ]
            ]
          ]
        ]
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
