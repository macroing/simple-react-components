import importedStyles from "./Button.module.css";

export default function Button(props) {
  let { children, styles, theme, ...rest } = props;

  //If no styles property has been assigned, the imported CSS module will be used for styling.
  if (styles === null || styles === undefined) {
    styles = importedStyles;
  }

  return (
    <button className={styles.button + (theme === "primary" ? " " + styles.button_primary : "") + (theme === "secondary" ? " " + styles.button_secondary : "")} {...rest}>
      {children}
    </button>
  );
}
