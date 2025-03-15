"use client";

import importedStyles from "./Label.module.css";

export default function Label(props) {
  let { children, styles, theme, ...rest } = props;

  //If no styles property has been assigned, the imported CSS module will be used for styling.
  if (styles === null || styles === undefined) {
    styles = importedStyles;
  }

  return (
    <label className={styles.label + (theme === "failure" ? " " + styles.label_failure : "") + (theme === "success" ? " " + styles.label_success : "")} {...rest}>
      {children}
    </label>
  );
}
