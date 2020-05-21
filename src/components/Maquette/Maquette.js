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

function findElement(id, array) {
  let found = 0;

  for (let i = 0; i < array.length; i++) {
    let el = array[i];
    if (el[1].id === id) {
      found = el;
      break;
    }
    let children = el[2] || [];
    if (!children.length) {
      found = null;
      continue;
    }
    found = findElement(id, el[2]);
    if (found) break;
  }

  return found;
}

function overwriteProperties(el, changes) {
  let orig = el[1];
  let updated = false;
  // Is this element being overwritten at all?
  Object.keys(changes).forEach(k => {
    if (orig.id === k) {
      updated = { ...orig, ...changes[k] };
    }
  });

  let children = el[2] || [];
  let overwriteChildren = [];
  if (children.length) {
    overwriteChildren = children.map(child => {
      return overwriteProperties(child, changes);
    });
  }

  let overwroteProps = updated ? updated : orig;
  let overwrote = [el[0], overwroteProps];
  if (children.length) overwrote.push(overwriteChildren);

  return overwrote;
}

function cloneAlias(props) {
  let elements = props.settings.elements;

  let find = props.alias;
  let element = findElement(find, elements);

  if (!element) return null;
  let clone = [...element];

  return overwriteProperties(element, props);
}

function Element(props) {
  // Is it an alias?
  if (props.type === "alias") {
    let alias = cloneAlias(props);

    if (!alias) return null;
    return <Maquette settings={props.settings} root={alias} />;
  }

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
        color: props.color,
        padding: props.spacing
          ? `${props.spacing * props.settings.theme.spacing}px`
          : null
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
        color: props.color,
        textAlign: props.textAlign,
        padding: props.spacing
          ? `${props.spacing * props.settings.theme.spacing}px`
          : null
      };
      renderProps["children"] = props.children;
      break;
    case "text":
      renderProps["component"] = props.component || "p";
      renderProps["className"] = props.style;
      renderProps["children"] = props.content;

      break;
    case "image":
      renderProps["component"] = "img";
      renderProps["src"] = props.src;
      renderProps["alt"] = props.alt || `Image of ${props.src}`;

      break;
    case "button":
      renderProps["style"] = {
        background: props.background,
        color: props.color,
        textAlign: props.textAlign,
        padding: props.spacing
          ? `${props.spacing * props.settings.theme.spacing}px`
          : null
      };
      renderProps["component"] = props.component || "button";
      renderProps["className"] = `Button ${props.style || ""}`;
      renderProps["children"] = props.content;
      renderProps["role"] = "button";
      if (renderProps["component"] !== "button") renderProps["href"] = "#";
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
    <Element type={rootType} {...rootProps} settings={settings}>
      {children.map((e, ix) => (
        <Maquette key={ix} settings={settings} root={e} />
      ))}
    </Element>
  );
}
