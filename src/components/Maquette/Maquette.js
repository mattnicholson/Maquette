import React from "react";

function Element(props) {
  //console.log("Element", props);

  switch (props.type) {
    case "viewport":
      return (
        <div
          style={{
            position: "relative",
            width: `100%`,
            height: `100vh`,
            background: props.background,
            color: props.color
          }}
          data-layout={props.layout}
        >
          {props.children}
        </div>
      );
    case "box":
      return (
        <div
          style={{
            display: "block",
            position: props.fixed ? "fixed" : "absolute",
            width: `${props.w * 100}%`,
            height: `${props.h * 100}%`,
            top: `${props.y * 100}%`,
            left: `${props.x * 100}%`,
            background: props.background,
            color: props.color
          }}
          data-layout={props.layout}
        >
          {props.children}
        </div>
      );
    case "text":
      return (
        <p className={props.style} data-layout={props.layout}>
          {props.content}
        </p>
      );
    case "image":
      return (
        <img
          data-layout={props.layout}
          src={props.src}
          alt={props.alt || `Image of ${props.src}`}
        />
      );
    case "button":
      return <button data-layout={props.layout}>{props.content}</button>;
    default:
      return props.children;
  }
}

export default function Maquette({ settings, root }) {
  // ["type",{props:value},[child,child]]

  let rootType = root[0];
  let rootProps = root[1];
  let children = root[2] || [];

  return (
    <Element type={rootType} {...rootProps}>
      {children.map((e, ix) => (
        <Maquette key={ix} settings={settings} root={e} />
      ))}
    </Element>
  );
}
