"use client";

import { motion } from "framer-motion";

import importedStyles from "./Header.module.css";

export default function Header(props) {
  const backgroundImage = props.backgroundImage;
  const children = props.children;
  const image = props.image;
  const style = props.style;
  const styles = props.styles || importedStyles;

  return (
    <div className={styles.header} style={style}>
      {backgroundImage && (
        <div className={styles.background_image}>
          <img alt={backgroundImage.alt} src={backgroundImage.src} />
          {backgroundImage.onClickEdit && (
            <motion.button onClick={backgroundImage.onClickEdit} transition={{ type: "spring", stiffness: 500 }} whileHover={{ scale: 1.03 }}>
              <span aria-hidden className="fa fa-edit"></span>
            </motion.button>
          )}
        </div>
      )}
      <div className={styles.content}>
        {image && (
          <motion.div className={styles.image} onClick={image.onClick} transition={image.onClick ? { type: "spring", stiffness: 500 } : undefined} whileHover={image.onClick ? { scale: 1.03 } : undefined}>
            <img alt={image.alt} src={image.src} />
            {image.onClickEdit && (
              <motion.button onClick={image.onClickEdit} transition={{ type: "spring", stiffness: 500 }} whileHover={{ scale: 1.03 }}>
                <span aria-hidden className="fa fa-edit"></span>
              </motion.button>
            )}
          </motion.div>
        )}
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
}
