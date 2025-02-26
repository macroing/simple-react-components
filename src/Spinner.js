import importedStyles from "./Spinner.module.css";

export default function Spinner(props) {
  const styles = props.styles || importedStyles;

  return (
    <div className={styles.spinner_container}>
      <div className={styles.spinner}></div>
    </div>
  );
}
