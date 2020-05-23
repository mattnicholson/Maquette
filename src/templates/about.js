export default (about = [
  [
    // Section 1
    "viewport",
    {
      id: "about_head",
      background: "#000",
      color: "#FFF",
      opacity: 0,
      initial: { scale: 0.95 },
      variants: {
        enter: { scale: 1 },
        // Global states prefixed with global.
        // "global.initial": { color: "#fff" },
        "global.active": { color: "#555", hidden: true },
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
          id: "about_img_box",
          x: 0,
          y: 0,
          w: 1,
          h: 1
        },
        [
          [
            "image",
            {
              id: "about_img",
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
              id: "about_blackout",
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
          id: "about_text_box",
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
              id: "about_text",
              x: 0,
              y: 0,
              w: 1,
              h: 1,
              layout: "center",
              style: "hero",
              content: "About"
            }
          ]
        ]
      ]
    ]
  ]
]);
