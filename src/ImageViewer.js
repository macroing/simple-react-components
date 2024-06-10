"use client";

import { motion } from "framer-motion";

import importedStyles from "./ImageViewer.module.css";

export default function ImageViewer(props) {
  const alt = props.alt || "";
  const isVisible = props.isVisible;
  const setIsVisible = props.setIsVisible;
  const src = props.src;
  const style = props.style;
  const styles = props.styles || importedStyles;

  function onClickClose(e) {
    e.stopPropagation();

    setIsVisible(false);
  }

  function onClickImageViewer(e) {
    e.stopPropagation();
  }

  function onClickImageViewerContainer(e) {
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.image_viewer_container} onClick={onClickImageViewerContainer}>
      <div className={styles.image_viewer} onClick={onClickImageViewer} style={style}>
        <img alt={alt} src={src} />
        <motion.button className={styles.close} onClick={onClickClose} transition={{ type: "spring", stiffness: 700 }} whileHover={{ scale: 1.2 }}>
          <span aria-hidden className="fa fa-close"></span>
        </motion.button>
      </div>
    </div>
  );
}
