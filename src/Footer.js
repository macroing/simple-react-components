import importedStyles from "./Footer.module.css";

export default function Footer(props) {
  const copyrightHolder = props.copyrightHolder;
  const items = props.items;
  const linkFactory = props.linkFactory || defaultLinkFactory;
  const styles = props.styles || importedStyles;
  const title = props.title;

  const year = new Date().getFullYear();

  function defaultLinkFactory(href, target, children) {
    return (
      <a href={href} target={target}>
        {children}
      </a>
    );
  }

  return (
    <footer className={styles.footer} style={{ "--src-footer-columns": items.length || 1 }}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.content}>
        {items.map((item, itemIndex) => (
          <ul key={"item-" + itemIndex}>
            {item.items.map((subItem, subItemIndex) => (
              <li key={"item-" + itemIndex + "-sub-item-" + subItemIndex}>{subItem.href ? linkFactory(subItem.href, subItem.target, subItem.text) : subItem.text}</li>
            ))}
          </ul>
        ))}
      </div>
      <div className={styles.copyright}>
        &copy; {copyrightHolder} {year}
      </div>
    </footer>
  );
}
