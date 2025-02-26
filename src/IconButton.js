"use client";

import { motion } from "framer-motion";

import importedStyles from "./IconButton.module.css";

export default function IconButton(props) {
  let { className, isLarge, isUnbordered, onClick, styles, ...rest } = props;

  //If no styles property has been assigned, the imported CSS module will be used for styling.
  if (styles === null || styles === undefined) {
    styles = importedStyles;
  }

  return (
    <motion.button className={styles.icon_button + (isLarge ? " " + styles.icon_button_large : "") + (isUnbordered ? " " + styles.icon_button_unbordered : "")} onClick={onClick} transition={{ type: "spring", stiffness: 500 }} whileHover={{ scale: 1.2 }} {...rest}>
      <span aria-hidden className={className}></span>
    </motion.button>
  );
}
