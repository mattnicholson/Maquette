export default [
  [
    // Section 1
    "viewport",
    {
      id: "masthead",
      background: "#000",
      color: "#FFF",
      useVisibility: true,

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
              useMotion: true,
              useVisibility: true,
              //effects: [["fadeIn"]],
              variants: {
                hidden: { scale: 0.9, opacity: 0, transition: { delay: 0 } },
                visible: { scale: 1, opacity: 1 }
              },
              transition: {
                delay: 0,
                default: { duration: 1 }
              },
              initial: "hidden",
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
          fixed: false,
          color: "#FFFFFF"
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
              content: "Lorem ipsum dolor sit amet consecetuer adipscing elit",
              style: "p"
            }
          ],
          [
            "button",
            {
              id: "default_button",
              content: "Button",
              color: "#FFFFFF",
              background: "#0000FF",
              useMotion: true,
              variants: {
                active: { background: "#FF0000" },
                "masthead.visible": { hidden: true }
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
  ]
];
