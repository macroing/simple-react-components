import importedStyles from "./Jumbotron.module.css";

export default function Jumbotron(props) {
  const children = props.children;
  const description = props.description;
  const styles = props.styles || importedStyles;
  const title = props.title;

  return (
    <div className={styles.jumbotron}>
      <div className={styles.content}>
        {title && <h1>{title}</h1>}
        {description && <p>{description}</p>}
        {children && <hr />}
        {children && <div className={styles.children}>{children}</div>}
      </div>
    </div>
  );
}
