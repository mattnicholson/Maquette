import React from "react";
import { motion } from "framer-motion";

export default function Element(props) {
  let tag = props.component || "div";

  let Out = motion[tag];

  return <Out {...props} />;
}
