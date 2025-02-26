"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";

import importedStyles from "./Card.module.css";

export default function Card(props) {
  let { buttons, children, image, onClick, paragraph, styles, title, ...rest } = props;

  //If no styles property has been assigned, the imported CSS module will be used for styling.
  if (styles === null || styles === undefined) {
    styles = importedStyles;
  }

  return (
    <motion.div className={styles.card + (onClick ? " " + styles.card_clickable : "")} onClick={onClick} whileHover={onClick ? { scale: 1.03 } : undefined} {...rest}>
      {image && <img alt={image.alt} className={styles.image} src={image.src} />}
      <div className={styles.content}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {paragraph && <p className={styles.paragraph}>{paragraph}</p>}
        <div className={styles.separator}></div>
        {children}
        {buttons && buttons.length > 0 && (
          <div className={styles.buttons}>
            {buttons.map((button, buttonIndex) => (
              <Fragment key={"button-" + buttonIndex}>{button}</Fragment>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
