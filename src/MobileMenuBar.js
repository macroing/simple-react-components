"use client";

import { useRef, useState } from "react";

import importedStyles from "./MobileMenuBar.module.css";

export default function MobileMenuBar(props) {
  const items = props.items;
  const linkFactory = props.linkFactory || defaultLinkFactory;
  const logo = props.logo;
  const style = props.style;
  const styles = props.styles || importedStyles;
  const theme = props.theme;

  const mobileMenuBarIconRef = useRef();
  const mobileMenuContentRef = useRef();

  const [selectedItem, setSelectedItem] = useState(null);

  function defaultLinkFactory(className, href, onClick, children) {
    return (
      <a className={className} href={href} onClick={onClick}>
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
    <nav className={styles.mobile_menu_bar + (theme === "danger" ? " " + styles.mobile_menu_bar_danger : "") + (theme === "dark" ? " " + styles.mobile_menu_bar_dark : "") + (theme === "primary" ? " " + styles.mobile_menu_bar_primary : "") + (theme === "secondary" ? " " + styles.mobile_menu_bar_secondary : "") + (theme === "success" ? " " + styles.mobile_menu_bar_success : "")} style={style}>
      {logo && linkFactory(styles.a, logo.href, undefined, <img alt={logo.alt} className={styles.img} src={logo.src} />)}
      <div className={styles.icon} onClick={onMobileMenuToggle} ref={mobileMenuBarIconRef}>
        <div className={styles.middle}></div>
      </div>
      <div className={styles.content} ref={mobileMenuContentRef}>
        <ul className={styles.ul}>
          {items.map((item, itemIndex) => (
            <li className={styles.li + (selectedItem && selectedItem.id === item.id ? " " + styles.active : "")} key={"item-" + itemIndex}>
              {item.href ? (
                linkFactory(
                  styles.a,
                  item.href,
                  (e) => {
                    onMobileMenuToggle();
                    setSelectedItem(null);
                  },
                  <div className={styles.div}>
                    {item.icon && <span aria-hidden className={item.icon}></span>} <span>{item.text}</span> {item.badge && <span className={styles.badge}>{item.badge}</span>}
                  </div>
                )
              ) : item.onClick ? (
                <button className={styles.button} onClick={item.onClick}>
                  <div className={styles.div}>
                    {item.icon && <span aria-hidden className={item.icon}></span>} <span>{item.text}</span> {item.badge && <span className={styles.badge}>{item.badge}</span>}
                  </div>
                </button>
              ) : (
                <>
                  <button className={styles.button} onClick={(e) => onClick(item)}>
                    <div className={styles.div}>
                      {item.icon && <span aria-hidden className={item.icon}></span>} <span>{item.text}</span> {item.badge && <span className={styles.badge}>{item.badge}</span>}
                    </div>{" "}
                    <span aria-hidden className={"fa fa-chevron-" + (selectedItem && selectedItem.id === item.id ? "up" : "down")}></span>
                  </button>
                  {selectedItem && selectedItem.id === item.id && (
                    <div className={styles.menu}>
                      {selectedItem.items &&
                        selectedItem.items.map((a, aIndex) => (
                          <div className={styles.sub_menu} key={"a-" + aIndex}>
                            <ul className={styles.ul}>
                              {a.items.map((b, bIndex) => (
                                <li className={styles.li + (b.heading ? " " + styles.li_heading : "") + (b.indented ? " " + styles.li_indented : "")} key={"b-" + bIndex}>
                                  {b.href ? (
                                    linkFactory(
                                      styles.a,
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
                                    <button className={styles.button} onClick={b.onClick}>
                                      {b.icon && <span aria-hidden className={b.icon + " " + styles.icon}></span>} <span>{b.text}</span> {b.badge && <span className={styles.badge}>{b.badge}</span>}
                                    </button>
                                  ) : (
                                    <div className={styles.div}>
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
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
