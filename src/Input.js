"use client";

import importedStyles from "./Input.module.css";

export default function Input(props) {
  let { styles, theme, ...rest } = props;

  //If no styles property has been assigned, the imported CSS module will be used for styling.
  if (styles === null || styles === undefined) {
    styles = importedStyles;
  }

  return <input className={styles.input + (theme === "failure" ? " " + styles.input_failure : "") + (theme === "success" ? " " + styles.input_success : "")} {...rest} />;
}
