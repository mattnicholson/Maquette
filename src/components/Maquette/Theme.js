import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

let COMPLETE = 0;
let LOADED = false;

export default function Theme({ settings, children, loaded }) {
  useEffect(() => {
    if (LOADED) return;
    settings.fonts.forEach(f => {
      let link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = f.href;
      link.onload = function() {
        COMPLETE++;
        if (COMPLETE === settings.fonts.length) {
          LOADED = true;
          loaded();
        }
      };
      document.head.appendChild(link);
    });
  });

  return (
    <>
      <style>
        {`

        html{
          transition:background 0.4s ease;
          background: ${settings.theme.background.default};
        }
        body{
          font-family:'DM Sans', sans-serif;
          font-weight:400;
        }
      .hero{
        /*font-family:'DM Mono', monospace;*/
        font-weight:700;
        text-transform:uppercase;
        letter-spacing:0em;
        font-size : 12vw;
        text-align:center;
        margin:0;
      }

      .logo{
        font-size:1.5vw;
        letter-spacing:0.01em;
        font-weight:400;
      }

      .h3{
        font-family:'DM Mono', monospace;
        font-weight:300;
        letter-spacing:-0.05em;
        font-size : 2vw;
        opacity:0.7;
        margin:0;
      }

      .h2{
        letter-spacing:-0.05em;
        margin-top:0;
        font-size:5vw;
        margin:0;
      }

      .Button{
        font-family:'DM Mono', monospace;
        display:inline-block;
        background:#CCC;
        padding: ${settings.theme.buttons.spacing}vw;
        border-radius: ${settings.theme.buttons.roundness}vw;
      }
    `}
      </style>
      {children}
    </>
  );
}
