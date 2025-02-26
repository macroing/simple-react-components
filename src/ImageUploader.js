"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import FileInputButtonLabel from "./FileInputButtonLabel";

import importedStyles from "./ImageUploader.module.css";

export default function ImageUploader(props) {
  const errorMessageImageTooBig = props.errorMessageImageTooBig || "The image is too big.";
  const isVisible = props.isVisible;
  const maximumImageSize = props.maximumImageSize || 1024 * 1024 * 5;
  const onClickUpload = props.onClickUpload;
  const setIsVisible = props.setIsVisible;
  const styles = props.styles || importedStyles;
  const text = props.text || "Select Image";

  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState(null);
  const [src, setSrc] = useState("");

  function onChangeFileInputButtonLabel(e) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        if (e.target.files[0].size > maximumImageSize) {
          setErrorMessage(errorMessageImageTooBig);
        } else {
          setErrorMessage("");
          setFile(e.target.files[0]);
          setSrc(reader.result?.toString() || "");
        }
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onClickClose(e) {
    e.stopPropagation();

    setErrorMessage("");
    setIsVisible(false);
  }

  function onClickUploadImpl(e) {
    e.stopPropagation();

    if (onClickUpload) {
      onClickUpload(e, file);
    }

    setFile(null);
    setSrc("");
    setIsVisible(false);
  }

  function onClickImageUploader(e) {
    e.stopPropagation();
  }

  function onClickImageUploaderContainer(e) {
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.image_uploader_container} onClick={onClickImageUploaderContainer}>
      <div className={styles.image_uploader} onClick={onClickImageUploader}>
        {src && <img alt="" src={src} />}
        {src && (
          <motion.div className={styles.upload} onClick={onClickUploadImpl} transition={{ type: "spring", stiffness: 700 }} whileHover={{ scale: 1.2 }}>
            <span aria-hidden className="fa fa-upload"></span>
          </motion.div>
        )}
        {src && (
          <motion.div className={styles.close} onClick={(e) => setSrc("")} transition={{ type: "spring", stiffness: 700 }} whileHover={{ scale: 1.2 }}>
            <span aria-hidden className="fa fa-close"></span>
          </motion.div>
        )}
        {errorMessage && <div className={styles.error_message}>{errorMessage}</div>}
        {!src && (
          <FileInputButtonLabel accept="image/*" onChange={onChangeFileInputButtonLabel}>
            <span aria-hidden className="fa fa-image"></span>
            <span>{text}</span>
          </FileInputButtonLabel>
        )}
        {!src && (
          <motion.div className={styles.close} onClick={onClickClose} transition={{ type: "spring", stiffness: 700 }} whileHover={{ scale: 1.2 }}>
            <span aria-hidden className="fa fa-close"></span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
