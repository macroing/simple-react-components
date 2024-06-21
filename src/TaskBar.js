"use client";

import importedStyles from "./TaskBar.module.css";

export default function TaskBar(props) {
  const collapseText = props.collapseText || "Collapse";
  const isAccountingForMenuBar = props.isAccountingForMenuBar;
  const isExpanded = props.isExpanded;
  const items = props.items;
  const setIsExpanded = props.setIsExpanded;
  const style = props.style;
  const styles = props.styles || importedStyles;

  return (
    <div className={styles.task_bar + (isAccountingForMenuBar ? " " + styles.task_bar_menu_bar : "")} style={style}>
      <button className={styles.item} onClick={(e) => setIsExpanded(!isExpanded)}>
        <div className={styles.icon}>
          <span aria-hidden className={isExpanded ? "fa fa-chevron-left" : "fa fa-bars"}></span>
        </div>
        {isExpanded && <div className={styles.text}>{collapseText}</div>}
      </button>
      {items.map((item, itemIndex) => (
        <button className={styles.item} key={"item-" + itemIndex} onClick={item.onClick}>
          <div className={styles.icon}>
            <span aria-hidden className={item.icon}></span>
          </div>
          {isExpanded && <div className={styles.text}>{item.text}</div>}
        </button>
      ))}
    </div>
  );
}
