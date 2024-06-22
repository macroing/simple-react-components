"use client";

import importedStyles from "./Menu.module.css";

export default function Menu(props) {
  const isExpanded = props.isExpanded;
  const items = props.items;
  const linkFactory = props.linkFactory || defaultLinkFactory;
  const setIsExpanded = props.setIsExpanded;
  const style = props.style;
  const styles = props.styles || importedStyles;
  const title = props.title;

  function defaultLinkFactory(className, href, onClick, children) {
    return (
      <a className={className} href={href} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <div className={styles.menu} style={style}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <button className={styles.toggle} onClick={(e) => setIsExpanded(!isExpanded)}>
          <span aria-hidden className={isExpanded ? "fa fa-chevron-up" : "fa fa-chevron-down"}></span>
        </button>
      </div>
      {isExpanded && (
        <div className={styles.content}>
          <ul className={styles.ul}>
            {items.map((item, itemIndex) => (
              <li className={styles.li + (item.heading ? " " + styles.li_heading : "") + (item.indented ? " " + styles.li_indented : "")} key={"item-" + itemIndex}>
                {item.href ? (
                  linkFactory(
                    styles.a,
                    item.href,
                    (e) => setIsVisible(false),
                    <>
                      {item.icon && <span aria-hidden className={item.icon + " " + styles.icon}></span>} <span>{item.text}</span> {item.badge && <span className={styles.badge}>{item.badge}</span>}
                    </>
                  )
                ) : item.onClick ? (
                  <button className={styles.button} onClick={item.onClick}>
                    {item.icon && <span aria-hidden className={item.icon + " " + styles.icon}></span>} <span>{item.text}</span> {item.badge && <span className={styles.badge}>{item.badge}</span>}
                  </button>
                ) : (
                  <div className={styles.div}>
                    {item.icon && <span aria-hidden className={item.icon + " " + styles.icon}></span>} <span>{item.text}</span> {item.badge && <span className={styles.badge}>{item.badge}</span>}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
