import React, { useState } from "react";
import Maquette from "./components/Maquette/Maquette";
import MaquetteTheme from "./components/Maquette/Theme";
import "./normalize.css";
import "./styles.css";

const maquette = {
  state: "__initial",
  fonts: [
    {
      href: `https://fonts.googleapis.com/css2?family=DM+Sans&display=swap`,
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
    background: {
      default: "#000"
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
          { id: "masthead", background: "black", color: "white" },
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
                    background: `rgba(0,0,0,0.3)`
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
                    x: 0,
                    y: 0,
                    w: 1,
                    h: 1,
                    layout: "cover",
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
                h: 1
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
                    content: "Button",
                    effects: [["scaleHover", {}]]
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
                x: 0.01,
                y: 0.05,
                w: 0.2,
                h: 0,
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
            ]
          ]
        ]
      ]
    ]
  ]
};

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
