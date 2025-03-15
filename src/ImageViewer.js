"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import importedStyles from "./ImageViewer.module.css";

export default function ImageViewer(props) {
  const isVisible = props.isVisible;
  const setIsVisible = props.setIsVisible;
  const style = props.style;
  const styles = props.styles || importedStyles;

  const [alts, setAlts] = useState(generateAlts(props.alts, props.srcs, props.alt, props.src));
  const [index, setIndex] = useState(generateIndex(props.alts, props.srcs, props.alt, props.src));
  const [srcs, setSrcs] = useState(generateSrcs(props.alts, props.srcs, props.alt, props.src));

  function generateAlts(currentAlts, currentSrcs, currentAlt, currentSrc) {
    if (Array.isArray(currentAlts) && Array.isArray(currentSrcs)) {
      const length = Math.max(currentAlts.length + (currentAlt && !currentAlts.includes(currentAlt) ? 1 : 0), currentSrcs.length + (currentSrc && !currentSrcs.includes(currentSrc) ? 1 : 0));

      if (currentAlts.length !== length) {
        const alts = new Array(length).fill("");

        for (let i = 0; i < currentAlts.length; i++) {
          alts[i] = currentAlts[i];
        }

        return alts;
      }

      return currentAlts;
    } else if (Array.isArray(currentAlts)) {
      return generateAlts(currentAlts, new Array(currentAlts.length).fill(currentSrc || ""), currentAlt, currentSrc);
    } else if (Array.isArray(currentSrcs)) {
      return generateAlts(new Array(currentSrcs.length).fill(currentAlt || ""), currentSrcs, currentAlt, currentSrc);
    } else if (currentAlt && currentSrc) {
      return [currentAlt];
    } else if (currentAlt) {
      return [currentAlt];
    } else if (currentSrc) {
      return [""];
    } else {
      return [];
    }
  }

  function generateIndex(currentAlts, currentSrcs, currentAlt, currentSrc) {
    currentAlt = currentAlt || "";
    currentSrc = currentSrc || "";

    const alts = generateAlts(currentAlts, currentSrcs, currentAlt, currentSrc);
    const srcs = generateSrcs(currentAlts, currentSrcs, currentAlt, currentSrc);

    for (let i = 0; i < alts.length; i++) {
      const alt = alts[i];
      const src = srcs[i];

      if (alt === currentAlt && src === currentSrc) {
        return i;
      }
    }

    return 0;
  }

  function generateSrcs(currentAlts, currentSrcs, currentAlt, currentSrc) {
    if (Array.isArray(currentAlts) && Array.isArray(currentSrcs)) {
      const length = Math.max(currentAlts.length + (currentAlt && !currentAlts.includes(currentAlt) ? 1 : 0), currentSrcs.length + (currentSrc && !currentSrcs.includes(currentSrc) ? 1 : 0));

      if (currentSrcs.length !== length) {
        const srcs = new Array(length).fill(currentSrc || "");

        for (let i = 0; i < currentSrcs.length; i++) {
          srcs[i] = currentSrcs[i];
        }

        return srcs;
      }

      return currentSrcs;
    } else if (Array.isArray(currentAlts)) {
      return generateSrcs(currentAlts, new Array(currentAlts.length).fill(currentSrc || ""), currentAlt, currentSrc);
    } else if (Array.isArray(currentSrcs)) {
      return generateSrcs(new Array(currentSrcs.length).fill(currentAlt || ""), currentSrcs, currentAlt, currentSrc);
    } else if (currentAlt && currentSrc) {
      return [currentSrc];
    } else if (currentAlt) {
      return [""];
    } else if (currentSrc) {
      return [currentSrc];
    } else {
      return [];
    }
  }

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

  function onClickNext(e) {
    if (index + 1 < alts.length && index + 1 < srcs.length) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  function onClickPrevious(e) {
    if (index - 1 >= 0) {
      setIndex(index - 1);
    } else {
      setIndex(Math.min(alts.length, srcs.length) - 1);
    }
  }

  useEffect(() => {
    setAlts(generateAlts(props.alts, props.srcs, props.alt, props.src));
    setIndex(generateIndex(props.alts, props.srcs, props.alt, props.src));
    setSrcs(generateSrcs(props.alts, props.srcs, props.alt, props.src));
  }, [props.alt, props.alts, props.src, props.srcs]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.image_viewer_container} onClick={onClickImageViewerContainer}>
      <div className={styles.image_viewer} onClick={onClickImageViewer} style={style}>
        {alts.length > 1 && srcs.length > 1 && (
          <div className={styles.previous}>
            <motion.button className={styles.previous_button} onClick={onClickPrevious} transition={{ type: "spring", stiffness: 500 }} whileHover={{ scale: 1.1 }}>
              <span aria-hidden className="fa fa-chevron-left fa-3x"></span>
            </motion.button>
          </div>
        )}
        {index >= 0 && index < alts.length && index < srcs.length && <img alt={alts[index]} src={srcs[index]} />}
        {alts.length > 1 && srcs.length > 1 && (
          <div className={styles.next}>
            <motion.button className={styles.next_button} onClick={onClickNext} transition={{ type: "spring", stiffness: 500 }} whileHover={{ scale: 1.1 }}>
              <span aria-hidden className="fa fa-chevron-right fa-3x"></span>
            </motion.button>
          </div>
        )}
        {alts.length > 1 && srcs.length > 1 && (
          <div className={styles.images_container}>
            <div className={styles.images}>
              {srcs.map((currentSrc, currentSrcIndex) => (
                <motion.div className={styles.image + (index === currentSrcIndex ? " " + styles.image_selected : "")} key={"image-" + currentSrcIndex} onClick={(e) => setIndex(currentSrcIndex)} transition={{ type: "spring", stiffness: 500 }} whileHover={{ scale: 1.03 }}>
                  <img alt={alts[currentSrcIndex]} src={currentSrc} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
        {index >= 0 && index < alts.length && index < srcs.length && (
          <motion.button className={styles.close} onClick={onClickClose} transition={{ type: "spring", stiffness: 700 }} whileHover={{ scale: 1.2 }}>
            <span aria-hidden className="fa fa-times-circle"></span>
          </motion.button>
        )}
      </div>
    </div>
  );
}
