import importedStyles from "./Panel.module.css";

export default function Panel(props) {
  let { children, styles, ...rest } = props;

  //If no styles property has been assigned, the imported CSS module will be used for styling.
  if (styles === null || styles === undefined) {
    styles = importedStyles;
  }

  return (
    <div className={styles.panel} {...rest}>
      {children}
    </div>
  );
}
