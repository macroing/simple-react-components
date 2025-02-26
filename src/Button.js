"use client";

import { motion } from "framer-motion";

import importedStyles from "./Button.module.css";

export default function Button(props) {
  let { children, disabled, styles, theme, ...rest } = props;

  //If no styles property has been assigned, the imported CSS module will be used for styling.
  if (styles === null || styles === undefined) {
    styles = importedStyles;
  }

  return (
    <motion.button className={styles.button + (theme === "failure" ? " " + styles.button_failure : "") + (theme === "primary" ? " " + styles.button_primary : "") + (theme === "secondary" ? " " + styles.button_secondary : "")} disabled={disabled} transition={disabled ? undefined : { type: "spring", stiffness: 500 }} whileHover={disabled ? undefined : { scale: 1.03 }} {...rest}>
      {children}
    </motion.button>
  );
}
