"use client";

import { motion } from "framer-motion";

import importedStyles from "./Chip.module.css";

export default function Chip(props) {
  const children = props.children;
  const onClick = props.onClick;
  const styles = props.styles || importedStyles;
  const theme = props.theme;

  return (
    <motion.div className={styles.chip + (onClick ? " " + styles.chip_clickable : "") + (theme === "primary" ? " " + styles.chip_primary : "") + (theme === "secondary" ? " " + styles.chip_secondary : "")} onClick={onClick} transition={onClick ? { type: "spring", stiffness: 500 } : undefined} whileHover={onClick ? { scale: 1.03 } : undefined}>
      {children}
    </motion.div>
  );
}
