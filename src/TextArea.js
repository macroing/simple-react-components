"use client";

import importedStyles from "./TextArea.module.css";

export default function TextArea(props) {
  let { resize, styles, theme, ...rest } = props;

  if (resize === null || resize === undefined) {
    resize = true;
  }

  //If no styles property has been assigned, the imported CSS module will be used for styling.
  if (styles === null || styles === undefined) {
    styles = importedStyles;
  }

  return <textarea className={styles.textarea + (resize ? "" : " " + styles.textarea_no_resize) + (theme === "failure" ? " " + styles.textarea_failure : "") + (theme === "success" ? " " + styles.textarea_success : "")} {...rest} />;
}
