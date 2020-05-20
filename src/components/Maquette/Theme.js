import React from "react";
import { Helmet } from "react-helmet";

export default function Theme({ settings, children }) {
  return (
    <>
      <Helmet>
        {settings.fonts.map(f => (
          <link key={f.href} href={f.href} rel="stylesheet" />
        ))}
      </Helmet>
      <style>
        {`
      .hero{
        font-family:'Nimbus Sans L',sans-serif;
        letter-spacing:-0.05em;
        font-size : 10vw;
        text-align:center;
        margin:0;
      }

      .h2{
        margin-top:0;
        font-size:5vw;
      }
    `}
      </style>
      {children}
    </>
  );
}
