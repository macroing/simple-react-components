"use client";

import { useState } from "react";

import importedStyles from "./Carousel.module.css";

export default function Carousel(props) {
  const items = props.items;
  const style = props.style;
  const styles = props.styles || importedStyles;

  const [index, setIndex] = useState(0);

  function onClickNext(e) {
    setIndex(items.length === 0 ? 0 : (index + 1) % items.length);
  }

  function onClickPrevious(e) {
    setIndex(items.length === 0 ? 0 : index - 1 < 0 ? items.length - 1 : index - 1);
  }

  return (
    <div className={styles.carousel} style={style}>
      <div className={styles.previous} onClick={onClickPrevious}>
        <span aria-hidden className="fa fa-chevron-left fa-2x"></span>
      </div>
      <div className={styles.content}>{index >= 0 && index < items.length && items[index]}</div>
      <div className={styles.next} onClick={onClickNext}>
        <span aria-hidden className="fa fa-chevron-right fa-2x"></span>
      </div>
    </div>
  );
}
