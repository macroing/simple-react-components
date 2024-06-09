"use client";

import importedStyles from "./Select.module.css";

export default function Select(props) {
  let { children, styles, ...rest } = props;

  //If no styles property has been assigned, the imported CSS module will be used for styling.
  if (styles === null || styles === undefined) {
    styles = importedStyles;
  }

  return (
    <select className={styles.select} {...rest}>
      {children}
    </select>
  );
}
