import importedStyles from "./ThreeColumnLayout.module.css";

export default function ThreeColumnLayout(props) {
  const column1 = props.column1;
  const column2 = props.column2;
  const column3 = props.column3;
  const style = props.style;
  const styleColumn1 = props.styleColumn1;
  const styleColumn2 = props.styleColumn2;
  const styleColumn3 = props.styleColumn3;
  const styles = props.styles || importedStyles;

  return (
    <div className={styles.three_column_layout} style={style}>
      <div className={styles.column_1} style={styleColumn1}>
        {column1}
      </div>
      <div className={styles.column_2} style={styleColumn2}>
        {column2}
      </div>
      <div className={styles.column_3} style={styleColumn3}>
        {column3}
      </div>
    </div>
  );
}
