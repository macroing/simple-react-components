"use client";

import importedStyles from "./LinkButton.module.css";

export default function LinkButton(props) {
  let { children, styles, ...rest } = props;

  //If no styles property has been assigned, the imported CSS module will be used for styling.
  if (styles === null || styles === undefined) {
    styles = importedStyles;
  }

  return (
    <button className={styles.link_button} {...rest}>
      {children}
    </button>
  );
}
