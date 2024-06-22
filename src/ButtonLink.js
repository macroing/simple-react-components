"use client";

import { motion } from "framer-motion";

import importedStyles from "./ButtonLink.module.css";

export default function ButtonLink(props) {
  let { children, disabled, linkFactory, styles, theme, ...rest } = props;

  //If no linkFactory property has been assigned, the default function will be used.
  if (linkFactory === null || linkFactory === undefined) {
    linkFactory = defaultLinkFactory;
  }

  //If no styles property has been assigned, the imported CSS module will be used for styling.
  if (styles === null || styles === undefined) {
    styles = importedStyles;
  }

  function defaultLinkFactory(className, disabled, rest, children) {
    return (
      <motion.a className={className} disabled={disabled} transition={disabled ? undefined : { type: "spring", stiffness: 500 }} whileHover={disabled ? undefined : { scale: 1.03 }} {...rest}>
        {children}
      </motion.a>
    );
  }

  return linkFactory(styles.button_link + (theme === "primary" ? " " + styles.button_link_primary : "") + (theme === "secondary" ? " " + styles.button_link_secondary : ""), disabled, rest, children);
}
