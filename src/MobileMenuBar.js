import { useRef, useState } from "react";

import importedStyles from "./MobileMenuBar.module.css";

export default function MobileMenuBar(props) {
  const items = props.items;
  const linkFactory = props.linkFactory || defaultLinkFactory;
  const logo = props.logo;
  const styles = props.styles || importedStyles;

  const mobileMenuBarIconRef = useRef();
  const mobileMenuContentRef = useRef();

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

  function onMobileMenuToggle() {
    mobileMenuBarIconRef.current.classList.toggle(styles.icon_close);
    mobileMenuContentRef.current.classList.toggle(styles.content_visible);
  }

  return (
    <nav className={styles.mobile_menu_bar}>
      {logo && linkFactory(logo.href, undefined, <img alt={logo.alt} src={logo.src} />)}
      <div className={styles.icon} onClick={onMobileMenuToggle} ref={mobileMenuBarIconRef}>
        <div className={styles.middle}></div>
      </div>
      <div className={styles.content} ref={mobileMenuContentRef}>
        <ul>
          {items.map((item, itemIndex) => (
            <li className={selectedItem && selectedItem.id === item.id ? styles.active : undefined} key={"item-" + itemIndex}>
              {item.href ? (
                linkFactory(
                  item.href,
                  (e) => {
                    onMobileMenuToggle();
                    setSelectedItem(null);
                  },
                  <div>
                    {item.icon && <span aria-hidden className={item.icon}></span>} <span>{item.text}</span> {item.badge && <span className={styles.badge}>{item.badge}</span>}
                  </div>
                )
              ) : item.onClick ? (
                <button onClick={item.onClick}>
                  <div>
                    {item.icon && <span aria-hidden className={item.icon}></span>} <span>{item.text}</span> {item.badge && <span className={styles.badge}>{item.badge}</span>}
                  </div>
                </button>
              ) : (
                <>
                  <button onClick={(e) => onClick(item)}>
                    <div>
                      {item.icon && <span aria-hidden className={item.icon}></span>} <span>{item.text}</span> {item.badge && <span className={styles.badge}>{item.badge}</span>}
                    </div>{" "}
                    <span aria-hidden className={"fa fa-chevron-" + (selectedItem && selectedItem.id === item.id ? "up" : "down")}></span>
                  </button>
                  {selectedItem && selectedItem.id === item.id && (
                    <div className={styles.menu}>
                      {selectedItem.items.map((a, aIndex) => (
                        <div className={styles.sub_menu} key={"a-" + aIndex}>
                          <ul>
                            {a.items.map((b, bIndex) => (
                              <li key={"b-" + bIndex}>
                                {b.href ? (
                                  linkFactory(
                                    b.href,
                                    (e) => {
                                      onMobileMenuToggle();
                                      setSelectedItem(null);
                                    },
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
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
