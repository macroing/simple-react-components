import Button from "./Button";

import importedStyles from "./Dialog.module.css";

export default function Dialog(props) {
  const children = props.children;
  const isVisible = props.isVisible;
  const onClickCancel = props.onClickCancel;
  const onClickOK = props.onClickOK;
  const setIsVisible = props.setIsVisible;
  const styles = props.styles || importedStyles;
  const textCancel = props.textCancel || "Cancel";
  const textOK = props.textOK || "OK";
  const title = props.title || "";

  function doOnClickCancel(e) {
    if (onClickCancel) {
      onClickCancel(e);
    }

    setIsVisible(false);
  }

  function doOnClickOK(e) {
    if (onClickOK) {
      onClickOK(e);
    }

    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.dialog_container}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <h3>{title}</h3>
        </div>
        <div className={styles.content}>{children}</div>
        <div className={styles.buttons}>
          <Button onClick={doOnClickCancel}>{textCancel}</Button>
          <Button theme="primary" onClick={doOnClickOK}>
            {textOK}
          </Button>
        </div>
      </div>
    </div>
  );
}
