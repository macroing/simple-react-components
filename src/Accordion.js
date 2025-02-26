"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import importedStyles from "./Accordion.module.css";

export default function Accordion(props) {
  const items = props.items;
  const style = props.style;
  const styles = props.styles || importedStyles;

  const [currentItem, setCurrentItem] = useState(null);

  function onClickItem(e, item) {
    if (currentItem === item) {
      setCurrentItem(null);
    } else {
      setCurrentItem(item);
    }
  }

  return (
    <div className={styles.accordion} style={style}>
      {items.map((item, itemIndex) => (
        <div className={styles.item} key={item.key ? item.key : "item-" + itemIndex}>
          <div className={styles.title} onClick={(e) => onClickItem(e, item)}>
            <span>{item.title}</span>
            <span aria-hidden className={"fa fa-chevron-" + (currentItem === item ? "up" : "down")}></span>
          </div>
          <AnimatePresence>
            {item === currentItem && (
              <motion.div animate={{ height: "auto" }} className={styles.content} exit={{ height: "0px" }} initial={{ height: "0px" }}>
                <div className={styles.children}>{item.children}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
