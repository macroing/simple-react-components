import importedStyles from "./Background.module.css";

export default function Background(props) {
  const children = props.children;
  const style = props.style;
  const styles = props.styles || importedStyles;
  const url = props.url;

  return (
    <div className={styles.background} style={style ? { "--src-background-url": `url("${url}")`, ...style } : { "--src-background-url": `url("${url}")` }}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
