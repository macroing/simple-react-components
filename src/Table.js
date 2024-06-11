import importedStyles from "./Table.module.css";

export default function Table(props) {
  let { children, styles, ...rest } = props;

  //If no styles property has been assigned, the imported CSS module will be used for styling.
  if (styles === null || styles === undefined) {
    styles = importedStyles;
  }

  return (
    <table className={styles.table} {...rest}>
      {children}
    </table>
  );
}
