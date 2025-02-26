import importedStyles from "./Icon.module.css";

export default function Icon(props) {
  const className = props.className;
  const styles = props.styles || importedStyles;

  return (
    <div className={styles.icon}>
      <span className={className}></span>
    </div>
  );
}
