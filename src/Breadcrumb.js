"use client";

import { useState } from "react";

import importedStyles from "./Breadcrumb.module.css";

export default function Breadcrumb(props) {
  const items = props.items;
  const styles = props.styles || importedStyles;

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <nav className={styles.breadcrumb_container}>
      <ul className={styles.breadcrumb_desktop}>
        {items.map((item, itemIndex) => (
          <li className={styles.item} key={"item-" + itemIndex}>
            {itemIndex > 0 && <span>/</span>}
            {item.href ? <a href={item.href}>{item.text}</a> : <span>{item.text}</span>}
          </li>
        ))}
      </ul>
      <ul className={styles.breadcrumb_mobile}>
        {items.length > 0 && <li className={styles.item}>{items[0].href ? <a href={items[0].href}>{items[0].text}</a> : <span>{items[0].text}</span>}</li>}
        {items.length > 3 && (
          <li className={styles.item + " " + styles.item_button} onClick={(e) => setIsMenuVisible(!isMenuVisible)}>
            <span aria-hidden className="fa fa-ellipsis-h"></span>
            <ul className={styles.menu + (isMenuVisible ? " " + styles.menu_visible : "")}>
              {items
                .filter((item, itemIndex) => itemIndex > 0 && itemIndex < items.length - 2)
                .map((item, itemIndex) => (
                  <li className={styles.item} key={"item-" + itemIndex}>
                    {item.href ? <a href={item.href}>{item.text}</a> : <span>{item.text}</span>}
                  </li>
                ))}
            </ul>
          </li>
        )}
        {items.length > 1 && <li className={styles.item}>{items[items.length - 2].href ? <a href={items[items.length - 2].href}>{items[items.length - 2].text}</a> : <span>{items[items.length - 2].text}</span>}</li>}
        {items.length > 2 && <li className={styles.item}>{items[items.length - 1].href ? <a href={items[items.length - 1].href}>{items[items.length - 1].text}</a> : <span>{items[items.length - 1].text}</span>}</li>}
      </ul>
    </nav>
  );
}
