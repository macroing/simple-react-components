import { useState } from "react";

import importedStyles from "./DesktopMenuBar.module.css";

export default function DesktopMenuBar(props) {
  const columns = props.columns;
  const items = props.items;
  const linkFactory = props.linkFactory || defaultLinkFactory;
  const logo = props.logo;
  const styles = props.styles || importedStyles;

  const [selectedItem, setSelectedItem] = useState(null);

  function defaultLinkFactory(href, onClick, children) {
    return (
      <a href={href} onClick={onClick}>
        {children}
      </a>
    );
  }

  function onClick(item) {
    if (selectedItem && selectedItem.id === item.id) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  }

  return (
    <nav className={styles.desktop_menu_bar} style={{ "--src-desktop-menu-bar-columns": columns }}>
      {logo && linkFactory(logo.href, undefined, <img alt={logo.alt} src={logo.src} />)}
      <ul>
        {items.map((item, itemIndex) => (
          <li className={selectedItem && selectedItem.id === item.id ? styles.active : undefined} key={"item-" + itemIndex}>
            {item.href ? (
              linkFactory(
                item.href,
                undefined,
                <>
                  {item.icon && <span aria-hidden className={item.icon}></span>}
                  <span>{item.text}</span>
                  {item.badge && <span className={styles.badge}>{item.badge}</span>}
                </>
              )
            ) : item.onClick ? (
              <button onClick={item.onClick}>
                {item.icon && <span aria-hidden className={item.icon}></span>}
                <span>{item.text}</span>
                {item.badge && <span className={styles.badge}>{item.badge}</span>}
              </button>
            ) : (
              <button onClick={(e) => onClick(item)}>
                {item.icon && <span aria-hidden className={item.icon}></span>}
                <span>{item.text}</span>
                {item.badge && <span className={styles.badge}>{item.badge}</span>}
                <span aria-hidden className={"fa fa-chevron-" + (selectedItem && selectedItem.id === item.id ? "up" : "down")}></span>
              </button>
            )}
            {selectedItem && selectedItem.id === item.id && (
              <div className={styles.menu} style={selectedItem.columns ? { "--src-desktop-menu-bar-columns": selectedItem.columns } : undefined}>
                {selectedItem.items &&
                  selectedItem.items.map((a, aIndex) => (
                    <div className={styles.sub_menu} key={"a-" + aIndex}>
                      <ul>
                        {a.items.map((b, bIndex) => (
                          <li key={"b-" + bIndex}>
                            {b.href ? (
                              linkFactory(
                                b.href,
                                (e) => setSelectedItem(null),
                                <>
                                  {b.icon && <span aria-hidden className={b.icon + " " + styles.icon}></span>} <span>{b.text}</span> {b.badge && <span className={styles.badge}>{b.badge}</span>}
                                </>
                              )
                            ) : b.onClick ? (
                              <button onClick={b.onClick}>
                                {b.icon && <span aria-hidden className={b.icon + " " + styles.icon}></span>} <span>{b.text}</span> {b.badge && <span className={styles.badge}>{b.badge}</span>}
                              </button>
                            ) : (
                              <div>
                                {b.icon && <span aria-hidden className={b.icon + " " + styles.icon}></span>} <span>{b.text}</span> {b.badge && <span className={styles.badge}>{b.badge}</span>}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                {selectedItem.component && <div className={styles.component}>{selectedItem.component}</div>}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
