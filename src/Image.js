"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import ImageViewer from "./ImageViewer";

import importedStyles from "./Image.module.css";

export default function Image(props) {
  let { alt, src, styles, ...rest } = props;

  const [isVisible, setIsVisible] = useState(false);

  //If no styles property has been assigned, the imported CSS module will be used for styling.
  if (styles === null || styles === undefined) {
    styles = importedStyles;
  }

  return (
    <>
      <motion.img alt={alt} className={styles.image} onClick={(e) => setIsVisible(true)} src={src} transition={{ type: "spring", stiffness: 500 }} whileHover={{ scale: 1.03 }} {...rest} />
      <ImageViewer alt={alt} isVisible={isVisible} setIsVisible={setIsVisible} src={src} />
    </>
  );
}
