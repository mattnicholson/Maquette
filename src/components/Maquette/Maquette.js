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

  if (changes.id) overwrote[1].id = changes.id;

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
function mergeStateProps(props, stateMap) {
  if (!props.hasOwnProperty("variants")) return props;
  let mergedProps = Object.keys(stateMap).reduce(
    (curProps, k) => {
      let merge = Object.keys(props.variants).find(pk => {
        let splitKey = pk.split(".");
        let search = splitKey.length > 1 ? splitKey[1] : splitKey[0];

        let matchId = k == props.id || splitKey[0] == k;
        let matchState = stateMap[k].indexOf(search) != -1;
        return matchId && matchState;
      });
      if (merge) {
        let copy = { ...curProps };
        let key;

        // Work out which type of state listener we matched
        if (k == props.id) key = "self";
        else if (k.match("global.")) key = "global";
        else key = "other";
        copy[key] = { ...curProps[key], ...props.variants[merge] };
        copy["activeStates"] = [...curProps.activeStates, merge];
        return { ...copy };
      }

      // Key matches
      return { ...curProps };
    },
    { global: {}, self: {}, other: {}, activeStates: [] }
  );

  let propsForCurrentState = {
    ...props,
    ...mergedProps.global,
    ...mergedProps.other,
    ...mergedProps.self
  };
  let transition = propsForCurrentState.transition || {
    delay: 0.1,
    default: { duration: 0.5 }
  };

  if (1) {
    // Allowed animatable props
    let base = { background: "rgba(0,0,0,0)", color: "#FFF" };
    let __default = Object.keys(base).reduce((curProps, k) => {
      let copy = { ...curProps };
      copy[k] = props.hasOwnProperty(k) ? props[k] : base[k];
      return copy;
    }, {});

    let variants = { ...props.variants };
    if (!variants.hasOwnProperty("initial")) variants["initial"] = __default;
    let animateStates = mergedProps.activeStates.length
      ? mergedProps.activeStates
      : ["initial"];
    let transitionProps = {
      ...props,
      variants: {
        ...variants,
        __default: { ...__default }
      },
      animate: animateStates,
      transition: transition
    };

    return transitionProps;
  }
  // Return the expanded object, overwriting in order of global > other > self
  // Element level states should override inherited states
  return {
    ...props,
    ...mergedProps.global,
    ...mergedProps.other,
    ...mergedProps.self
  };
}
function Element(properties) {
  // Is it an alias?
  if (properties.type === "alias") {
    let alias = cloneAlias(properties);

    if (!alias) return null;
    return <Maquette settings={properties.settings} root={alias} />;
  }

  let props = mergeStateProps(properties, properties.settings.stateMap);
  let output = null;
  let effects = props.effects ? loadEffects({ effects: props.effects }) : {};

  // Copy all props & effects
  let renderProps = { ...effects, ...props };

  // Delete props that might cause problems with void tags
  delete renderProps["children"];
  delete renderProps["style"];

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
