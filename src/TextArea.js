"use client";

import importedStyles from "./TextArea.module.css";

export default function TextArea(props) {
  let { styles, ...rest } = props;

  //If no styles property has been assigned, the imported CSS module will be used for styling.
  if (styles === null || styles === undefined) {
    styles = importedStyles;
  }

  return <textarea className={styles.textarea} {...rest} />;
}
