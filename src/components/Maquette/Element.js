import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Element(props) {
  let tag = props.component || "div";

  let Out = motion[tag];

  let isHidden = props.hidden;
  /*if (["homepage", "aboutpage"].indexOf(props.id) != -1)
    console.log("element", props.id, isHidden, props);*/

  return (
    <AnimatePresence>
      {!isHidden && (
        <Out
          {...props}
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
