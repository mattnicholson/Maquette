import React, { useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useViewportScroll,
  useTransform
} from "framer-motion";
import TrackVisibility from "react-on-screen";
import { maquetteUtils } from "./store";
import useIntersect from "./useIntersect";

const DEBUG = false;

// 1Make array of 00 callbacks from 0 to 1
const buildThresholdArray = () => Array.from(Array(100).keys(), i => i / 100);

function BasicElement(props) {
  // Mutable object to access between renders
  const val = React.useRef();

  // Effect that runs when props change
  React.useEffect(() => {
    val.current = props;
  }, [props]);

  // Effect that runs once on mount and cleansup on unmount
  React.useEffect(() => {
    //console.log("MOUNT", props.id);
    return () => {
      //console.log("UNMOUNT", props.id);
    };
  }, []);

  let tag = props.component || "div";
  let Out = tag;
  let isHidden = props.hidden;

  // Allow basic props only on output component
  let allowedProps = [
    "id",
    "className",
    "style",
    "children",
    "src",
    "alt",
    "data-layout",
    "onClick"
  ].reduce((obj, key, i) => ({ ...obj, [key]: props[key] || null }), {});

  return isHidden ? null : (
    <Out {...allowedProps} ref={props.refCallback ? props.refCallback : null} />
  );
}

let VISIBLE = false;

function VisibilityElement(props) {
  // Mutable object to access between renders
  const visibility = React.useRef();
  const observer = React.useRef(
    new window.IntersectionObserver(([entry]) => updateIntersection(entry), {
      root: null,
      threshold: [0, 0.5, 1]
    })
  );
  const ref = el => {
    const { current: currentObserver } = observer;

    if (el) currentObserver.observe(el);
    //console.log("observe ref", props.id, el);
  };

  function updateIntersection(data) {
    let isVisible = data.intersectionRatio > 0;
    if (isVisible != visibility.current) {
      console.log(
        `visbility changed ${props.id}. Was: ${
          visibility.current
        } Now: ${isVisible}`
      );
      visibility.current = isVisible;
      if (isVisible) {
        onVisible();
      } else {
        onInvisible();
      }
    }
    //console.log(`update intersection ${props.id}`, data.intersectionRatio);
  }

  function onMount() {
    //console.log("observe", ref);
  }

  function onUnmount() {
    onInvisible();
    const { current: currentObserver } = observer;
    console.log(`disconnect observer for ${props.id}`);
    currentObserver.disconnect();
  }
  function onVisible() {
    visibility.current = true;
    // Run callback
    maquetteUtils.addState("visible", props.id);
  }

  function onInvisible() {
    visibility.current = false;
    // Run callback
    maquetteUtils.removeState("visible", props.id);
  }

  // Effect that runs when props change
  React.useEffect(() => {
    if (props.hidden) {
      // Disconnect intersection, run onInvisible callback...
    } else {
    }
  }, [props.hidden]);

  // Effect that runs once on mount and cleansup on unmount
  React.useEffect(() => {
    onMount();
    return () => {
      onUnmount();
    };
  }, []);

  function unused() {
    const [ref, entry] = useIntersect({
      threshold: buildThresholdArray(),
      //threshold: 0
      onDisconnect: () => {
        console.log("disconnected for " + props.id);
      }
    });

    /*const ref = () => {};
      const entry = {};*/

    useEffect(() => {
      //alert(`${props.id} is ${props.hidden}`);
      // Cleanup
      return () => {
        //alert(`cleanup ${props.id}`)
      };
    }, [props.hidden]); // Only re-subscribe if hidden changes

    //console.log(props.id, VISIBLE);

    if (!VISIBLE && entry.intersectionRatio > 0) {
      //console.log(props.id, "visible", entry.intersectionRatio);
      VISIBLE = true;
    }

    if (VISIBLE && !entry.intersectionRatio) {
      //console.log(props.id, "invisible", entry.intersectionRatio);
      VISIBLE = false;
    }
  }
  // End unsused

  // Animate setting
  if (props.useMotion) {
    return <MotionElement {...props} refCallback={ref} />;
  }

  // No other special cases...pass on to the element chooser
  return <BasicElement {...props} refCallback={ref} />;
}

function DebugElement(props) {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid",
        padding: "10px",
        marginBottom: "2px"
      }}
    >
      {props.type}:{props.id}
      <div>{props.children}</div>
    </div>
  );
}

function MotionElement(props) {
  let tag = props.component || "div";

  let Out = motion[tag];

  let isHidden = props.hidden;

  /*return (
    <div
      style={{ background: "white", border: "1px solid", padding: "10px" }}
      ref={ref}
    >
      {props.type}:{props.id}
      <div>{props.children}</div>
    </div>
  );*/

  return (
    <AnimatePresence>
      {!isHidden && (
        <Out
          {...props}
          ref={props.refCallback ? props.refCallback : null}
          exit={{ opacity: 0 }}
          /*
          exit={{
            opacity: 0,
            height: 0,
            scale: 0.95,
            transition: {
              delay: 0,
              duration: 0.2,

              height: {
                delay: 0.4
              }
            }
          }}
          */
        />
      )}
    </AnimatePresence>
  );
}

export default function Element(props) {
  // Just render the tree as basic boxes
  if (DEBUG) {
    return <DebugElement {...props} />;
  }

  // Return an element with an intersection observer
  if (props.id && props.useVisibility) {
    return <VisibilityElement {...props} />;
  }

  // Animate setting
  if (props.useMotion) {
    //console.log("animate", props.animate);
    return <MotionElement {...props} />;
  }

  //console.log("static", props.id);
  // No other special cases...basic element
  return <BasicElement {...props} />;
}
