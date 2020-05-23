export default (nav = [
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
]);
