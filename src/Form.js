import importedStyles from "./Form.module.css";

export default function Form(props) {
  let { children, styles, ...rest } = props;

  //If no styles property has been assigned, the imported CSS module will be used for styling.
  if (styles === null || styles === undefined) {
    styles = importedStyles;
  }

  return (
    <form className={styles.form} {...rest}>
      {children}
    </form>
  );
}
