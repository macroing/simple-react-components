"use client";

import { useEffect, useRef, useState } from "react";

import importedStyles from "./TooltipContainer.module.css";

export default function TooltipContainer(props) {
  const children = props.children;
  const style = props.style;
  const styles = props.styles || importedStyles;
  const tooltip = props.tooltip;

  const timerRef = useRef();

  const [isVisible, setIsVisible] = useState(false);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  function onMouseEnter(e) {
    const boundingClientRect = e.target.getBoundingClientRect();

    setLeft(boundingClientRect.left);
    setTop(boundingClientRect.top);

    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
  }

  function onMouseLeave(e) {
    clearTimeout(timerRef.current);

    setIsVisible(false);
  }

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className={styles.tooltip_container} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={style}>
      {children}
      {isVisible && tooltip && tooltip.length > 0 && (
        <div className={styles.tooltip} onMouseLeave={onMouseLeave} style={{ left, top }}>
          {tooltip}
        </div>
      )}
    </div>
  );
}
