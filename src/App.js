import React from "react";
import Maquette from "./components/Maquette/Maquette";
import MaquetteTheme from "./components/Maquette/Theme";
import "./normalize.css";
import "./styles.css";

const maquette = {
  state: "__initial",
  fonts: [
    {
      href: `https://mattnicholson.github.io/fonts/Bagnard/font-face.css`,
      stack: `'Bagnard',serif`
    },
    {
      href: `https://mattnicholson.github.io/fonts/Nimbus_Sans_L/font-face.css`,
      stack: `'Nimbus Sans L',sans-serif`
    }
  ],
  elements: [
    [
      "root",
      { id: "main" },
      [
        // Section 1
        [
          "viewport",
          { id: "section1", background: "black", color: "white" },
          [
            [
              "box",
              {
                id: "masthead_img",
                x: 0,
                y: 0,
                w: 1,
                h: 1
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
                id: "masthead_text",
                x: 0,
                y: 0.5,
                w: 1,
                h: 1,
                fixed: true
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
                    content: "Heading 1"
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
                    content: "Button"
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
  return (
    <div className="App">
      <MaquetteTheme settings={maquette}>
        <Maquette
          settings={maquette}
          root={maquette.elements.find(e => e[0] === "root")}
        />
      </MaquetteTheme>
    </div>
  );
}
