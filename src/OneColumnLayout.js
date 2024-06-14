import importedStyles from "./OneColumnLayout.module.css";

export default function OneColumnLayout(props) {
  const column1 = props.column1;
  const style = props.style;
  const styleColumn1 = props.styleColumn1;
  const styles = props.styles || importedStyles;

  return (
    <div className={styles.one_column_layout} style={style}>
      <div className={styles.column_1} style={styleColumn1}>
        {column1}
      </div>
    </div>
  );
}
