import importedStyles from "./ProgressBar.module.css";

export default function ProgressBar(props) {
  const percent = props.percent;
  const style = props.style;
  const styles = props.styles || importedStyles;

  const percentRounded = Math.round(percent);

  return (
    <div className={styles.progress_bar} style={style}>
      <div className={styles.progress} style={{ width: percentRounded + "%" }}>
        {percentRounded}%
      </div>
    </div>
  );
}
