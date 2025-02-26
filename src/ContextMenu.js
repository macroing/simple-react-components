"use client";

import { useEffect, useRef, useState } from "react";

import importedStyles from "./ContextMenu.module.css";

export default function ContextMenu(props) {
  const isVisible = props.isVisible;
  const items = props.items;
  const setIsVisible = props.setIsVisible;
  const styles = props.styles || importedStyles;
  const x = props.x;
  const y = props.y;

  const refs = useRef({});

  const [key, setKey] = useState("");

  useEffect(() => {
    setKey("");

    refs.current = {};
  }, [items]);

  function renderItems(items, keyPrefix = "") {
    return items.map((item, itemIndex) => (
      <li key={keyPrefix + itemIndex}>
        {item.items && item.items.length > 0 && (
          <>
            <button className={key.startsWith(keyPrefix + itemIndex) ? styles.button_selected : undefined} onClick={(e) => setKey(key.startsWith(keyPrefix + itemIndex) ? keyPrefix : keyPrefix + itemIndex)}>
              <span>{item.text}</span>
              <span aria-hidden className="fa fa-chevron-right"></span>
            </button>
            <ul className={styles.context_menu} ref={(element) => (refs.current[keyPrefix + itemIndex] = element)} style={{ display: key.startsWith(keyPrefix + itemIndex) ? "flex" : "none", left: refs.current[keyPrefix] ? Math.ceil(refs.current[keyPrefix].getBoundingClientRect().right - refs.current[keyPrefix].getBoundingClientRect().left) - 11 + "px" : "0px", top: "-10px" }}>
              {renderItems(item.items, keyPrefix + itemIndex)}
            </ul>
          </>
        )}
        {(!item.items || item.items.length === 0) && item.href && (
          <a href={item.href}>
            <span>{item.text}</span>
            {item.icon && <span className={item.icon}></span>}
          </a>
        )}
        {(!item.items || item.items.length === 0) && !item.href && (
          <button>
            <span>{item.text}</span>
            {item.icon && <span className={item.icon}></span>}
          </button>
        )}
      </li>
    ));
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={styles.context_menu_container}
      onClick={(e) => {
        setIsVisible(false);
        setKey("");
      }}
    >
      <ul className={styles.context_menu} onClick={(e) => e.stopPropagation()} ref={(element) => (refs.current[""] = element)} style={{ left: x + "px", top: y + "px" }}>
        {renderItems(items)}
      </ul>
    </div>
  );
}
