import importedStyles from "./HoverContainer.module.css";

export default function HoverContainer(props) {
  let { children, hoverComponent, styleHoverComponent, styles, ...rest } = props;

  //If no styles property has been assigned, the imported CSS module will be used for styling.
  if (styles === null || styles === undefined) {
    styles = importedStyles;
  }

  return (
    <div className={styles.hover_container} {...rest}>
      {children}
      <div className={styles.hover_component} style={styleHoverComponent}>
        {hoverComponent}
      </div>
    </div>
  );
}
