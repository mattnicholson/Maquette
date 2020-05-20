import React from "react";
import MaquetteElement from "./Element";
import { motion } from "framer-motion";

function effectToProps(effect) {
  let effectType = effect[0];
  let effectSettings = effect[1];

  switch (effectType) {
    case "fadeIn":
      return {
        variants: {
          visible: { opacity: 1 },
          hidden: { opacity: 0 }
        },
        transition: {
          delay: 1,
          default: { duration: 2 }
        },
        initial: "hidden",
        animate: "visible"
      };
      return { initial: { opacity: 0 }, animate: { opacity: 1 } };
    case "scaleHover":
      return {
        whileHover: { scale: 1.1 }
      };
    default:
      return {};
  }

  return { style: { border: "1px solid red" } };
}

function loadEffects({ effects }) {
  let effectProps = effects.reduce((effects, effect) => {
    let thisEffect = effectToProps(effect);

    return { ...effects, ...thisEffect };
  }, {});

  return effectProps;
}

function Element(props) {
  //console.log("Element", props);

  let output = null;
  let effects = props.effects ? loadEffects({ effects: props.effects }) : {};

  let renderProps = { ...effects };

  renderProps["data-layout"] = props.layout;

  switch (props.type) {
    case "viewport":
      renderProps["style"] = {
        position: "relative",
        width: `100%`,
        height: `100vh`,
        background: props.background,
        color: props.color
      };
      renderProps["children"] = props.children;
      break;
    case "box":
      renderProps["style"] = {
        display: "block",
        position: props.fixed ? "fixed" : "absolute",
        width: `${props.w * 100}%`,
        height: `${props.h * 100}%`,
        top: `${props.y * 100}%`,
        left: `${props.x * 100}%`,
        background: props.background,
        color: props.color
      };
      renderProps["children"] = props.children;
      break;
    case "text":
      renderProps["component"] = props.component || "p";
      renderProps["className"] = props.style;
      renderProps["children"] = props.content;

      break;
    case "image":
      console.log("effects", effects);
      renderProps["component"] = "img";
      renderProps["src"] = props.src;
      renderProps["alt"] = props.alt || `Image of ${props.src}`;

      break;
    case "button":
      renderProps["component"] = props.component || "button";
      renderProps["className"] = `Button ${props.style || ""}`;
      renderProps["children"] = props.content;

      break;
    default:
      renderProps["children"] = props.children;
  }

  return <MaquetteElement {...renderProps} />;
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
