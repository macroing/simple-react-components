"use client";

import { motion } from "framer-motion";

import importedStyles from "./Stars.module.css";

export default function Stars(props) {
  const disabled = props.disabled;
  const selectedStars = props.selectedStars;
  const setSelectedStars = props.setSelectedStars;
  const starCount = props.starCount;
  const style = props.style;
  const styles = props.styles || importedStyles;

  return (
    <div className={styles.stars + (disabled ? " " + styles.stars_disabled : "")} style={style}>
      {new Array(starCount).fill(false).map((star, starIndex) => (
        <motion.span aria-hidden className={"fa fa-star fa-2x " + styles.star + (starIndex < selectedStars ? " " + styles.star_selected : "")} key={"star-" + starIndex} onClick={disabled ? undefined : (e) => setSelectedStars(starIndex + 1)} transition={disabled ? undefined : { type: "spring", stiffness: 500 }} whileHover={disabled ? undefined : { scale: 1.2 }}></motion.span>
      ))}
    </div>
  );
}
