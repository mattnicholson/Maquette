export default [
  [
    // Section 1
    "viewport",
    {
      id: "about_head",

      background: "#000",
      color: "#FFF"
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
              src: "https://picsum.photos/1920/1080?random=3"
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
];
