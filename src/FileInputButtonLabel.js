"use client";

import { motion } from "framer-motion";

import importedStyles from "./FileInputButtonLabel.module.css";

export default function FileInputButtonLabel(props) {
  const accept = props.accept;
  const children = props.children;
  const inputRef = props.inputRef;
  const onChange = props.onChange;
  const style = props.style;
  const styles = props.styles || importedStyles;
  const theme = props.theme;

  return (
    <motion.label className={styles.file_input_button_label + (theme === "primary" ? " " + styles.file_input_button_label_primary : "") + (theme === "secondary" ? " " + styles.file_input_button_label_secondary : "")} style={style} transition={{ type: "spring", stiffness: 500 }} whileHover={{ scale: 1.03 }}>
      {children}
      <input accept={accept} onChange={onChange} ref={inputRef} type="file" />
    </motion.label>
  );
}
