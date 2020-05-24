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

let VISIBLE = false;

const buildThresholdArray = () => Array.from(Array(100).keys(), i => i / 100);

export default function Element(props) {
  const [ref, entry] = useIntersect({
    threshold: buildThresholdArray()
  });

  let tag = props.component || "div";

  let Out = motion[tag];

  let isHidden = props.hidden;
  /*if (["homepage", "aboutpage"].indexOf(props.id) != -1)
    console.log("element", props.id, isHidden, props);*/

  //if (props.id == "section3") {
  //console.log(props.id, entry.intersectionRatio);
  //if(props.type == 'viewport'){
  if (!VISIBLE && entry.intersectionRatio > 0) {
    console.log(props.id, "visible", entry.intersectionRatio);
    VISIBLE = true;
  }

  if (VISIBLE && !entry.intersectionRatio) {
    console.log(props.id, "invisible", entry.intersectionRatio);
    VISIBLE = false;
    //}
    //}
  }

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
          ref={ref}
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
